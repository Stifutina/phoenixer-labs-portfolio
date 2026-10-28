uniform float uPixelRatio;
uniform float uScale;
uniform float uFocus;
uniform float uAperture;
uniform float uTime;
uniform vec3 uColors[3];
uniform vec3 uWeights;

attribute float aSize;
attribute float aKind;
attribute float aSeed;

varying vec3 vColor;
varying float vBlur;
varying float vAlpha;

void main()
{
    vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * viewPosition;

    // Depth of field: anything off the focal plane grows into a soft, faint disc
    float distance = -viewPosition.z;
    float blur = clamp(abs(distance - uFocus) * uAperture, 0.0, 1.0);
    vBlur = blur;

    gl_PointSize = min(aSize * (1.0 + blur * 3.5) * uScale / distance, 120.0) * uPixelRatio;

    float weight = aKind < 0.5 ? uWeights.x : (aKind < 1.5 ? uWeights.y : uWeights.z);
    vColor = aKind < 0.5 ? uColors[0] : (aKind < 1.5 ? uColors[1] : uColors[2]);

    float twinkle = 0.82 + 0.18 * sin(uTime * (0.6 + aSeed * 1.4) + aSeed * 40.0);
    vAlpha = mix(1.0, 0.16, blur) * twinkle * weight;
}
