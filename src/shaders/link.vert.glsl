uniform float uFocus;
uniform float uAperture;
uniform float uTime;
uniform float uLinkDistance;

// This end of the thread (its resting point is `position`) and the node at the other end
attribute vec3 aAmplitude;
attribute vec3 aFrequency;
attribute float aSeed;
attribute vec3 aOtherBase;
attribute vec3 aOtherAmplitude;
attribute vec3 aOtherFrequency;
attribute float aOtherSeed;

varying float vAlpha;

#include <drift>

void main()
{
    // Both ends move exactly like their nodes; the thread fades out as they drift apart
    vec3 self = drift(position, aAmplitude, aFrequency, aSeed, uTime);
    vec3 other = drift(aOtherBase, aOtherAmplitude, aOtherFrequency, aOtherSeed, uTime);
    float strength = pow(max(1.0 - distance(self, other) / uLinkDistance, 0.0), 1.15);

    if(strength <= 0.0)
    {
        // Out of reach: park both vertices outside the clip volume so the GPU skips the line
        gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
        vAlpha = 0.0;
        return;
    }

    vec4 viewPosition = modelViewMatrix * vec4(self, 1.0);
    gl_Position = projectionMatrix * viewPosition;

    // Links blur with the nodes they join: far and near threads fade instead of going soft
    float blur = clamp(abs(-viewPosition.z - uFocus) * uAperture, 0.0, 1.0);
    vAlpha = strength * mix(1.0, 0.18, blur);
}
