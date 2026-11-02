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
 *  - All motion runs on the GPU. Every node sways on its own sine path (shaders/drift.glsl) and both
 *    ends of every link follow the same formula, so no buffer is touched after the first upload.
 *    A frame only sets a handful of uniforms: no per-frame allocations, no garbage collection,
 *    no CPU work that grows with the number of nodes.
 *  - Links are the pairs of nodes that can ever come within reach of each other, found once at
 *    start-up; the vertex shader fades each thread by the live distance and culls it when too far.
 *  - Two draw calls, no antialiasing, no depth buffer, pixel ratio capped at 1.25.
 *  - Asks for the high-performance GPU: on dual-GPU laptops the integrated one can't present
 *    a full-screen WebGL canvas under a Retina page smoothly.
 *  - If the first second of the dive runs slow, drops to pixel ratio 1, then to half the dust.
 *    Decided early, while the camera is still moving, so the change never shows as a hitch.
 *  - Stops rendering while the tab is hidden; prefers-reduced-motion draws one still frame.
 */
import {
    AdditiveBlending,
    BufferAttribute,
    BufferGeometry,
    Color,
    Group,
    LineSegments,
    PerspectiveCamera,
    Points,
    Scene,
    ShaderChunk,
    ShaderMaterial,
    Vector3,
    WebGLRenderer,
} from 'three'
import driftChunk from '../shaders/drift.glsl?raw'
import nodeVertex from '../shaders/node.vert.glsl?raw'
import nodeFragment from '../shaders/node.frag.glsl?raw'
import linkVertex from '../shaders/link.vert.glsl?raw'
import linkFragment from '../shaders/link.frag.glsl?raw'

// Lets both vertex shaders share the drift function with `#include <drift>`
;(ShaderChunk as Record<string, string>).drift = driftChunk

const small = window.matchMedia('(max-width: 720px)').matches
const NODES = small ? 80 : 150
const DUST = small ? 200 : 420
const TOTAL = NODES + DUST

const SPREAD = new Vector3(small ? 26 : 46, small ? 34 : 24, 22)
const DEPTH_SHIFT = -8      // the volume sits a little behind the focal plane
const LINK_DISTANCE = small ? 13 : 15

// Sway per axis: nodes move a little less than dust
const NODE_AMPLITUDE = [2.5, 5.5]
const DUST_AMPLITUDE = [4, 7]
const FREQUENCY = [0.04, 0.14]

// Two nodes whose resting points are further apart than this can never meet, even swaying towards each other
const MAX_REACH = LINK_DISTANCE + 2 * Math.sqrt(3) * NODE_AMPLITUDE[1]

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

const between = ([low, high]: number[]) => low + Math.random() * (high - low)

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
            // On dual-GPU Macs anything else lands on the integrated GPU, where WebGL composited
            // under a Retina page stutters at 15-20 fps even with an empty scene
            powerPreference: 'high-performance',
        })
    }
    catch
    {
        return // no WebGL: the CSS sky is still there
    }

    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25))

    const scene = new Scene()
    const camera = new PerspectiveCamera(50, 1, 0.1, 200)
    camera.position.z = reducedMotion ? CAMERA_Z : INTRO_Z

    const net = new Group()
    scene.add(net)

    /**
     * Nodes and dust: resting point, sway and look. Written once, never updated
     */
    const base = new Float32Array(TOTAL * 3)
    const amplitude = new Float32Array(TOTAL * 3)
    const frequency = new Float32Array(TOTAL * 3)
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
            amplitude[i * 3 + axis] = between(node ? NODE_AMPLITUDE : DUST_AMPLITUDE)
            frequency[i * 3 + axis] = between(FREQUENCY)
        }

        sizes[i] = node ? 15 + Math.random() * 16 : 4 + Math.random() * 5
        kinds[i] = KINDS[Math.floor(Math.random() * KINDS.length)]
        seeds[i] = Math.random()
    }

    const pointGeometry = new BufferGeometry()
    pointGeometry.setAttribute('position', new BufferAttribute(base, 3))
    pointGeometry.setAttribute('aAmplitude', new BufferAttribute(amplitude, 3))
    pointGeometry.setAttribute('aFrequency', new BufferAttribute(frequency, 3))
    pointGeometry.setAttribute('aSize', new BufferAttribute(sizes, 1))
    pointGeometry.setAttribute('aKind', new BufferAttribute(kinds, 1))
    pointGeometry.setAttribute('aSeed', new BufferAttribute(seeds, 1))

    const look = LOOKS[ownerOf()]
    const weights = look.weights.clone()
    const linkColor = look.link.clone()

    // Shared by both materials, so updating one object moves everything together
    const shared = {
        uTime: { value: Math.random() * 100 },
        uFocus: { value: CAMERA_Z },
        uAperture: { value: 0.032 },
    }

    const pointMaterial = new ShaderMaterial({
        vertexShader: nodeVertex,
        fragmentShader: nodeFragment,
        transparent: true,
        depthTest: false,
        depthWrite: false,
        blending: AdditiveBlending,
        uniforms: {
            ...shared,
            uScale: { value: 36 },
            uPixelRatio: { value: renderer.getPixelRatio() },
            uColors: { value: COLORS },
            uWeights: { value: weights },
        },
    })

    const points = new Points(pointGeometry, pointMaterial)
    points.frustumCulled = false

    /**
     * Links: every pair of nodes that can ever be within reach, each as one line whose two
     * vertices know about both ends. Built once
     */
    const pairs: number[] = []
    const reach = MAX_REACH * MAX_REACH
    for(let a = 0; a < NODES; a++)
    {
        for(let b = a + 1; b < NODES; b++)
        {
            const dx = base[a * 3] - base[b * 3]
            const dy = base[a * 3 + 1] - base[b * 3 + 1]
            const dz = base[a * 3 + 2] - base[b * 3 + 2]
            if(dx * dx + dy * dy + dz * dz <= reach) pairs.push(a, b)
        }
    }

    const vertices = pairs.length // two vertices per pair, one per end
    const linkAttributes = {
        position: new Float32Array(vertices * 3),
        aAmplitude: new Float32Array(vertices * 3),
        aFrequency: new Float32Array(vertices * 3),
        aSeed: new Float32Array(vertices),
        aOtherBase: new Float32Array(vertices * 3),
        aOtherAmplitude: new Float32Array(vertices * 3),
        aOtherFrequency: new Float32Array(vertices * 3),
        aOtherSeed: new Float32Array(vertices),
    }

    for(let v = 0; v < vertices; v++)
    {
        const self = pairs[v]
        const other = pairs[v % 2 === 0 ? v + 1 : v - 1]
        for(let axis = 0; axis < 3; axis++)
        {
            linkAttributes.position[v * 3 + axis] = base[self * 3 + axis]
            linkAttributes.aAmplitude[v * 3 + axis] = amplitude[self * 3 + axis]
            linkAttributes.aFrequency[v * 3 + axis] = frequency[self * 3 + axis]
            linkAttributes.aOtherBase[v * 3 + axis] = base[other * 3 + axis]
            linkAttributes.aOtherAmplitude[v * 3 + axis] = amplitude[other * 3 + axis]
            linkAttributes.aOtherFrequency[v * 3 + axis] = frequency[other * 3 + axis]
        }
        linkAttributes.aSeed[v] = seeds[self]
        linkAttributes.aOtherSeed[v] = seeds[other]
    }

    const linkGeometry = new BufferGeometry()
    for(const [name, array] of Object.entries(linkAttributes))
    {
        linkGeometry.setAttribute(name, new BufferAttribute(array, name.endsWith('Seed') ? 1 : 3))
    }

    const linkMaterial = new ShaderMaterial({
        vertexShader: linkVertex,
        fragmentShader: linkFragment,
        transparent: true,
        depthTest: false,
        depthWrite: false,
        blending: AdditiveBlending,
        uniforms: {
            ...shared,
            uLinkDistance: { value: LINK_DISTANCE },
            uColor: { value: linkColor },
            uOpacity: { value: reducedMotion ? 1 : 0 },
        },
    })

    const links = new LineSegments(linkGeometry, linkMaterial)
    links.frustumCulled = false

    net.add(links, points)

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
        camera.lookAt(0, 0, DEPTH_SHIFT * 0.5)
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

    // Quality is judged once, over the first second of the dive, while a change can't be seen
    let previous = performance.now()
    let frames = 0
    let slowSum = 0
    const judge = (delta: number) =>
    {
        frames++
        if(frames <= 10 || frames > 70) return
        slowSum += delta
        if(frames < 70) return
        const average = slowSum / 60
        if(average > 0.022)
        {
            renderer.setPixelRatio(1)
            renderer.setSize(canvas.clientWidth, canvas.clientHeight, false)
            pointMaterial.uniforms.uPixelRatio.value = 1
        }
        if(average > 0.03) pointGeometry.setDrawRange(0, NODES + Math.floor(DUST / 2))
    }

    const opacity = linkMaterial.uniforms.uOpacity
    const tick = (now: number) =>
    {
        // Clamped, so a stall or a return from another tab never makes the net jump
        const delta = Math.min((now - previous) / 1000, 1 / 20)
        previous = now
        judge(delta)

        const time = (shared.uTime.value += delta)
        opacity.value += (1 - opacity.value) * (1 - Math.exp(-delta * 0.9))

        const ease = 1 - Math.exp(-delta * 2.2)
        weights.lerp(target.weights, ease)
        linkColor.lerp(target.link, ease)

        // Dive in on first load, then hold; the cursor tilts the view a little
        camera.position.z += (CAMERA_Z - camera.position.z) * (1 - Math.exp(-delta * 1.1))
        const follow = 1 - Math.exp(-delta * 1.8)
        camera.position.x += (pointer.x * 6 + Math.sin(time * 0.07) * 2 - camera.position.x) * follow
        camera.position.y += (-pointer.y * 4 + Math.cos(time * 0.05) * 1.5 - camera.position.y) * follow
        camera.lookAt(0, 0, DEPTH_SHIFT * 0.5)
        shared.uFocus.value = camera.position.length() - DEPTH_SHIFT * 0.3

        net.rotation.y = Math.sin(time * 0.03) * 0.18
        net.rotation.z = time * 0.006

        renderer.render(scene, camera)
    }

    const play = () =>
    {
        previous = performance.now()
        renderer.setAnimationLoop(document.hidden ? null : tick)
    }
    document.addEventListener('visibilitychange', play)
    play()
}
