/**
 * Site background: a plexus net drifting in deep water, after Anastasia's Blender plexus renders.
 *
 * Glowing nodes float in a 3D volume and link to their neighbours with thin threads. A focal plane
 * sits in the middle of the volume: nodes in front of it and behind it grow into soft bokeh discs,
 * the ones on it burn white-hot inside a coloured halo.
 *
 * Three kinds of node carry the studio: pale teal is the net itself, ice is Sergey, amber is
 * Anastasia. The canvas survives page navigation (transition:persist) and each page names its owner
 * on <html data-owner>, so moving into an area brightens its owner's nodes, retints the threads,
 * and nudges the camera into the net.
 *
 * Performance notes
 *  - Two draw calls: one Points object for nodes and dust, one LineSegments for the links
 *  - Link search is a plain O(n^2) pass over ~150 nodes, about 11k distance checks per frame
 *  - No antialiasing, no depth buffer, pixel ratio capped at 1.5
 *  - Drops to pixel ratio 1, then to half the dust, if the device can't keep up
 *  - Stops rendering while the tab is hidden
 *  - prefers-reduced-motion: draws a single still frame, never starts the loop
 */
import {
    AdditiveBlending,
    BufferAttribute,
    BufferGeometry,
    Color,
    DynamicDrawUsage,
    Group,
    LineSegments,
    PerspectiveCamera,
    Points,
    Scene,
    ShaderMaterial,
    Vector3,
    WebGLRenderer,
} from 'three'
import nodeVertex from '../shaders/node.vert.glsl?raw'
import nodeFragment from '../shaders/node.frag.glsl?raw'
import linkVertex from '../shaders/link.vert.glsl?raw'
import linkFragment from '../shaders/link.frag.glsl?raw'

const small = window.matchMedia('(max-width: 720px)').matches
const NODES = small ? 80 : 150
const DUST = small ? 200 : 420
const TOTAL = NODES + DUST

const SPREAD = new Vector3(small ? 26 : 46, small ? 34 : 24, 22)
const DEPTH_SHIFT = -8      // the volume sits a little behind the focal plane
const LINK_DISTANCE = small ? 13 : 15
const MAX_LINKS = NODES * 8

const CAMERA_Z = 36
const INTRO_Z = 70           // first load: the camera dives into the net from far out
const HOP_Z = 6              // moving between pages: a small push forward that eases back

// pale teal (the net), ice (Sergey), amber (Anastasia). Repeated entries weight the pick
const KINDS = [0, 0, 0, 0, 0, 1, 1, 1, 2, 2]
const COLORS = ['#b8f1ea', '#8fd3ff', '#ffc46b'].map((hex) => new Color(hex))

type Owner = 'studio' | 'sergey' | 'anastasia'

const LOOKS: Record<Owner, { weights: Vector3; link: Color }> = {
    studio: { weights: new Vector3(1, 0.95, 0.85), link: new Color('#4cc4d6') },
    sergey: { weights: new Vector3(0.7, 1.35, 0.1), link: new Color('#5aaeef') },
    anastasia: { weights: new Vector3(0.7, 0.18, 1.4), link: new Color('#c99b5c') },
}

const ownerOf = (): Owner =>
{
    const owner = document.documentElement.dataset.owner
    return owner === 'sergey' || owner === 'anastasia' ? owner : 'studio'
}

export function startPlexus(canvas: HTMLCanvasElement)
{
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let renderer: WebGLRenderer
    try
    {
        renderer = new WebGLRenderer({
            canvas,
            antialias: false,
            alpha: true,
            depth: false,
            stencil: false,
            powerPreference: 'low-power',
        })
    }
    catch
    {
        return // no WebGL: the CSS sky is still there
    }

    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))

    const scene = new Scene()
    const camera = new PerspectiveCamera(50, 1, 0.1, 200)
    camera.position.z = reducedMotion ? CAMERA_Z : INTRO_Z

    const net = new Group()
    scene.add(net)

    /**
     * Nodes and dust
     */
    const base = new Float32Array(TOTAL * 3)
    const drift = new Float32Array(TOTAL * 6)  // amplitude and frequency per axis
    const positions = new Float32Array(TOTAL * 3)
    const sizes = new Float32Array(TOTAL)
    const kinds = new Float32Array(TOTAL)
    const seeds = new Float32Array(TOTAL)

    for(let i = 0; i < TOTAL; i++)
    {
        const node = i < NODES
        base[i * 3 + 0] = (Math.random() - 0.5) * 2 * SPREAD.x
        base[i * 3 + 1] = (Math.random() - 0.5) * 2 * SPREAD.y
        base[i * 3 + 2] = (Math.random() - 0.5) * 2 * SPREAD.z + DEPTH_SHIFT

        for(let axis = 0; axis < 3; axis++)
        {
            drift[i * 6 + axis] = (node ? 2.5 : 4) + Math.random() * 3
            drift[i * 6 + 3 + axis] = 0.04 + Math.random() * 0.1
        }

        sizes[i] = node ? 15 + Math.random() * 16 : 4 + Math.random() * 5
        kinds[i] = KINDS[Math.floor(Math.random() * KINDS.length)]
        seeds[i] = Math.random()
    }
    positions.set(base)

    const pointGeometry = new BufferGeometry()
    const positionAttribute = new BufferAttribute(positions, 3).setUsage(DynamicDrawUsage)
    pointGeometry.setAttribute('position', positionAttribute)
    pointGeometry.setAttribute('aSize', new BufferAttribute(sizes, 1))
    pointGeometry.setAttribute('aKind', new BufferAttribute(kinds, 1))
    pointGeometry.setAttribute('aSeed', new BufferAttribute(seeds, 1))

    const look = LOOKS[ownerOf()]
    const weights = look.weights.clone()
    const linkColor = look.link.clone()

    const focus = { uFocus: { value: CAMERA_Z }, uAperture: { value: 0.032 } }

    const pointMaterial = new ShaderMaterial({
        vertexShader: nodeVertex,
        fragmentShader: nodeFragment,
        transparent: true,
        depthTest: false,
        depthWrite: false,
        blending: AdditiveBlending,
        uniforms: {
            ...focus,
            uTime: { value: 0 },
            uScale: { value: 36 },
            uPixelRatio: { value: renderer.getPixelRatio() },
            uColors: { value: COLORS },
            uWeights: { value: weights },
        },
    })

    const points = new Points(pointGeometry, pointMaterial)
    points.frustumCulled = false

    /**
     * Links
     */
    const linkPositions = new Float32Array(MAX_LINKS * 6)
    const linkAlphas = new Float32Array(MAX_LINKS * 2)
    const linkGeometry = new BufferGeometry()
    const linkPositionAttribute = new BufferAttribute(linkPositions, 3).setUsage(DynamicDrawUsage)
    const linkAlphaAttribute = new BufferAttribute(linkAlphas, 1).setUsage(DynamicDrawUsage)
    linkGeometry.setAttribute('position', linkPositionAttribute)
    linkGeometry.setAttribute('aAlpha', linkAlphaAttribute)

    const linkMaterial = new ShaderMaterial({
        vertexShader: linkVertex,
        fragmentShader: linkFragment,
        transparent: true,
        depthTest: false,
        depthWrite: false,
        blending: AdditiveBlending,
        uniforms: {
            ...focus,
            uColor: { value: linkColor },
            uOpacity: { value: reducedMotion ? 1 : 0 },
        },
    })

    const links = new LineSegments(linkGeometry, linkMaterial)
    links.frustumCulled = false

    net.add(links, points)

    let dustCount = DUST

    const update = (time: number) =>
    {
        for(let i = 0; i < NODES + dustCount; i++)
        {
            for(let axis = 0; axis < 3; axis++)
            {
                const amplitude = drift[i * 6 + axis]
                const frequency = drift[i * 6 + 3 + axis]
                positions[i * 3 + axis] = base[i * 3 + axis] + Math.sin(time * frequency + seeds[i] * 50 + axis * 2.1) * amplitude
            }
        }
        positionAttribute.needsUpdate = true

        let count = 0
        const limit = LINK_DISTANCE * LINK_DISTANCE
        for(let a = 0; a < NODES && count < MAX_LINKS; a++)
        {
            const ax = positions[a * 3], ay = positions[a * 3 + 1], az = positions[a * 3 + 2]
            for(let b = a + 1; b < NODES && count < MAX_LINKS; b++)
            {
                const dx = positions[b * 3] - ax
                const dy = positions[b * 3 + 1] - ay
                const dz = positions[b * 3 + 2] - az
                const squared = dx * dx + dy * dy + dz * dz
                if(squared > limit) continue

                const strength = Math.pow(1 - Math.sqrt(squared) / LINK_DISTANCE, 1.15)
                linkPositions.set([ax, ay, az, positions[b * 3], positions[b * 3 + 1], positions[b * 3 + 2]], count * 6)
                linkAlphas[count * 2] = strength
                linkAlphas[count * 2 + 1] = strength
                count++
            }
        }
        linkGeometry.setDrawRange(0, count * 2)
        linkPositionAttribute.needsUpdate = true
        linkAlphaAttribute.needsUpdate = true
    }

    const resize = (width: number, height: number) =>
    {
        renderer.setSize(width, height, false)
        camera.aspect = width / height
        camera.updateProjectionMatrix()
        pointMaterial.uniforms.uPixelRatio.value = renderer.getPixelRatio()
        // Keep node sizes steady relative to the viewport height
        pointMaterial.uniforms.uScale.value = 36 * Math.min(Math.max(height / 900, 0.7), 1.3)
        if(reducedMotion) renderer.render(scene, camera)
    }

    new ResizeObserver(([entry]) =>
    {
        const { width, height } = entry.contentRect
        if(width && height) resize(width, height)
    }).observe(canvas)

    resize(canvas.clientWidth || window.innerWidth, canvas.clientHeight || window.innerHeight)

    if(reducedMotion)
    {
        update(40)
        camera.lookAt(0, 0, 0)
        renderer.render(scene, camera)
        const redraw = () =>
        {
            const next = LOOKS[ownerOf()]
            weights.copy(next.weights)
            linkColor.copy(next.link)
            renderer.render(scene, camera)
        }
        document.addEventListener('astro:after-swap', redraw)
        document.addEventListener('owner-change', redraw)
        return
    }

    const pointer = { x: 0, y: 0 }
    if(window.matchMedia('(hover: hover)').matches)
    {
        window.addEventListener('pointermove', (event) =>
        {
            pointer.x = event.clientX / window.innerWidth - 0.5
            pointer.y = event.clientY / window.innerHeight - 0.5
        }, { passive: true })
    }

    let target = LOOKS[ownerOf()]
    const retarget = () =>
    {
        const next = LOOKS[ownerOf()]
        if(next !== target) camera.position.z = Math.min(camera.position.z, CAMERA_Z) - HOP_Z
        target = next
    }
    document.addEventListener('astro:after-swap', retarget)
    document.addEventListener('owner-change', retarget) // the contact form retints the net as you pick a person

    let previous = performance.now()
    let time = Math.random() * 100
    let frames = 0
    let measured = 0
    let quality = 2

    const tick = (now: number) =>
    {
        const delta = Math.min((now - previous) / 1000, 0.05)
        previous = now
        time += delta

        update(time)

        const opacity = linkMaterial.uniforms.uOpacity
        opacity.value += (1 - opacity.value) * (1 - Math.exp(-delta * 0.9))
        pointMaterial.uniforms.uTime.value = time

        weights.lerp(target.weights, 1 - Math.exp(-delta * 2.2))
        linkColor.lerp(target.link, 1 - Math.exp(-delta * 2.2))

        // Dive in on first load, then hold; the cursor tilts the view a little
        camera.position.z += (CAMERA_Z - camera.position.z) * (1 - Math.exp(-delta * 1.1))
        const follow = 1 - Math.exp(-delta * 1.8)
        camera.position.x += (pointer.x * 6 + Math.sin(time * 0.07) * 2 - camera.position.x) * follow
        camera.position.y += (-pointer.y * 4 + Math.cos(time * 0.05) * 1.5 - camera.position.y) * follow
        camera.lookAt(0, 0, DEPTH_SHIFT * 0.5)
        focus.uFocus.value = camera.position.length() - DEPTH_SHIFT * 0.3

        net.rotation.y = Math.sin(time * 0.03) * 0.18
        net.rotation.z = time * 0.006

        renderer.render(scene, camera)

        frames++
        if(frames > 30)
        {
            measured += delta
            if(frames === 150 || frames === 300)
            {
                if(measured / (frames - 30) > 0.024 && quality > 0)
                {
                    quality--
                    if(quality === 1)
                    {
                        renderer.setPixelRatio(1)
                        renderer.setSize(canvas.clientWidth, canvas.clientHeight, false)
                        pointMaterial.uniforms.uPixelRatio.value = 1
                    }
                    else
                    {
                        dustCount = Math.floor(DUST / 2)
                        pointGeometry.setDrawRange(0, NODES + dustCount)
                    }
                }
                measured = 0
                frames = 30
            }
        }
    }

    const play = () =>
    {
        previous = performance.now()
        renderer.setAnimationLoop(document.hidden ? null : tick)
    }
    document.addEventListener('visibilitychange', play)
    play()
}
