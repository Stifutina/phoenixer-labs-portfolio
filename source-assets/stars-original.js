/**
 * Index page background: a field of stars flying towards the viewer.
 *
 * Performance notes
 *  - One draw call: a single Points object, all motion is computed in the vertex shader (no per-star JS)
 *  - No antialiasing, no depth buffer, pixel ratio capped at 1.5
 *  - Resizes through ResizeObserver, so mobile address-bar changes don't reallocate the buffer
 *  - Drops to pixel ratio 1, then to half the stars, if the device can't keep up
 *  - prefers-reduced-motion: draws a single still frame and never starts the loop
 */
import {
    AdditiveBlending,
    BufferAttribute,
    BufferGeometry,
    Color,
    PerspectiveCamera,
    Points,
    Scene,
    ShaderMaterial,
    WebGLRenderer,
} from 'three'
import vertexShader from '../../shaders/stars/vertex.glsl'
import fragmentShader from '../../shaders/stars/fragment.glsl'

const COUNT = 1800
const DEPTH = 80
const SPREAD_X = 64
const SPREAD_Y = 40

const CRUISE_SPEED = 2.2    // calm flying speed
const INTRO_SPEED = 55      // page-load "warp" that eases down to cruise speed

// Mostly cool white, with a few ice, amber and violet stars. Repeated entries weight the pick
const PALETTE = [
    '#dfe6ff', '#dfe6ff', '#dfe6ff', '#dfe6ff', '#dfe6ff',
    '#8fd3ff', '#8fd3ff',
    '#ffc46b', '#ffc46b',
    '#a99bff',
].map((hex) => new Color(hex))

export function startStars(canvas)
{
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let renderer
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
        // No WebGL: the CSS background is still there, nothing else to do
        return
    }

    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))

    const scene = new Scene()
    const camera = new PerspectiveCamera(60, 1, 0.1, DEPTH + 10)

    /**
     * Stars
     */
    const positions = new Float32Array(COUNT * 3)
    const seeds = new Float32Array(COUNT)
    const colors = new Float32Array(COUNT * 3)

    for(let i = 0; i < COUNT; i++)
    {
        positions[i * 3 + 0] = (Math.random() - 0.5) * 2 * SPREAD_X
        positions[i * 3 + 1] = (Math.random() - 0.5) * 2 * SPREAD_Y
        positions[i * 3 + 2] = Math.random() * DEPTH

        seeds[i] = Math.random()

        const color = PALETTE[Math.floor(Math.random() * PALETTE.length)]
        colors[i * 3 + 0] = color.r
        colors[i * 3 + 1] = color.g
        colors[i * 3 + 2] = color.b
    }

    const geometry = new BufferGeometry()
    geometry.setAttribute('position', new BufferAttribute(positions, 3))
    geometry.setAttribute('aSeed', new BufferAttribute(seeds, 1))
    geometry.setAttribute('aColor', new BufferAttribute(colors, 3))

    const material = new ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        depthTest: false,
        depthWrite: false,
        blending: AdditiveBlending,
        uniforms: {
            uTime: { value: 0 },
            uTravel: { value: 0 },
            uSize: { value: 90 },
            uPixelRatio: { value: renderer.getPixelRatio() },
            uDepth: { value: DEPTH },
        },
    })

    const stars = new Points(geometry, material)
    stars.frustumCulled = false // positions are moved in the shader, the CPU-side bounds are meaningless
    scene.add(stars)

    /**
     * Size
     */
    const resize = (width, height) =>
    {
        renderer.setSize(width, height, false) // false: the canvas size is controlled by CSS
        camera.aspect = width / height
        camera.updateProjectionMatrix()
        material.uniforms.uPixelRatio.value = renderer.getPixelRatio()
        if(reducedMotion) renderer.render(scene, camera)
    }

    new ResizeObserver(([entry]) =>
    {
        const { width, height } = entry.contentRect
        if(width && height) resize(width, height)
    }).observe(canvas)

    resize(canvas.clientWidth || window.innerWidth, canvas.clientHeight || window.innerHeight)

    /**
     * Pointer parallax (fine pointers only, touch screens have no hover)
     */
    const pointer = { x: 0, y: 0 }
    if(window.matchMedia('(hover: hover)').matches && !reducedMotion)
    {
        window.addEventListener('pointermove', (event) =>
        {
            pointer.x = event.clientX / window.innerWidth - 0.5
            pointer.y = event.clientY / window.innerHeight - 0.5
        }, { passive: true })
    }

    /**
     * Animation
     */
    if(reducedMotion)
    {
        material.uniforms.uTravel.value = 20
        renderer.render(scene, camera)
        return
    }

    let speed = INTRO_SPEED
    let previous = performance.now()

    // Adaptive quality: check the average frame time twice, skip the first frames (shader compile)
    let frames = 0
    let measured = 0
    let quality = 2

    const tick = (now) =>
    {
        const delta = Math.min((now - previous) / 1000, 0.05)
        previous = now

        // Ease from warp speed down to cruise speed (frame-rate independent)
        speed += (CRUISE_SPEED - speed) * (1 - Math.exp(-delta * 1.4))

        material.uniforms.uTravel.value += speed * delta
        material.uniforms.uTime.value += delta

        const follow = 1 - Math.exp(-delta * 2)
        camera.position.x += (pointer.x * 2.4 - camera.position.x) * follow
        camera.position.y += (-pointer.y * 1.6 - camera.position.y) * follow

        stars.rotation.z += delta * 0.004

        renderer.render(scene, camera)

        frames++
        if(frames > 30)
        {
            measured += delta
            if(frames === 150 || frames === 300)
            {
                const average = measured / (frames - 30)
                if(average > 0.024 && quality > 0)
                {
                    quality--
                    if(quality === 1)
                    {
                        renderer.setPixelRatio(1)
                        renderer.setSize(canvas.clientWidth, canvas.clientHeight, false)
                        material.uniforms.uPixelRatio.value = 1
                    }
                    else
                    {
                        geometry.setDrawRange(0, COUNT / 2)
                    }
                }
                measured = 0
                frames = 30
            }
        }
    }

    renderer.setAnimationLoop(tick)
}
