uniform float uFocus;
uniform float uAperture;

attribute float aAlpha;

varying float vAlpha;

void main()
{
    vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * viewPosition;

    // Links blur with the nodes they join: far and near threads fade instead of going soft
    float blur = clamp(abs(-viewPosition.z - uFocus) * uAperture, 0.0, 1.0);
    vAlpha = aAlpha * mix(1.0, 0.18, blur);
}
