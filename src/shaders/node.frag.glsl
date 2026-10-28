varying vec3 vColor;
varying float vBlur;
varying float vAlpha;

void main()
{
    float d = length(gl_PointCoord - 0.5) * 2.0;
    if(d > 1.0) discard;

    // In focus: a white-hot core inside a coloured halo. Out of focus: a flat bokeh disc
    float core = exp(-d * d * 30.0) * (1.0 - vBlur);
    float halo = exp(-d * d * 7.0) * 0.6 * (1.0 - vBlur);
    float disc = (1.0 - smoothstep(0.55, 1.0, d)) * vBlur * 0.55;

    vec3 color = mix(vColor, vec3(1.0), core * 0.85);
    gl_FragColor = vec4(color, (core + halo + disc) * vAlpha);
}
