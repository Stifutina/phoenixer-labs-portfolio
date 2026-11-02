// Where a node is at time t: its resting point plus a slow sine sway on each axis.
// Shared by the nodes and by both ends of every link, so threads stay pinned to their nodes.
vec3 drift(vec3 base, vec3 amplitude, vec3 frequency, float seed, float t)
{
    return base + sin(t * frequency + seed * 50.0 + vec3(0.0, 2.1, 4.2)) * amplitude;
}
