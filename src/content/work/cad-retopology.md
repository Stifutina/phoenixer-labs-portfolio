---
title: "3D retopology and optimization of mechanical parts"
owner: anastasia
summary: "Bicycle components delivered as heavy CAD assemblies, rebuilt by hand into clean, light meshes ready for texturing and rendering."
when: 2026
role: "3D designer"
area: 3d
stack: [Blender, STEP, OBJ, Manual retopology, Mesh optimization]
cover: ../../assets/work/cad-retopology/01.jpg
coverAlt: "Before and after of a jockey wheel: the dense STEP model on the left, the clean optimized mesh on the right"
layout: compare
glow: "#7fe0a0"
featured: 7
gallery:
  - src: ../../assets/work/cad-retopology/01.jpg
    alt: "Jockey wheel: the complex STEP model next to the clean optimized mesh"
    caption: "Jockey wheel"
    detail: "2,416 triangles. One clean object, ready to texture and render."
  - src: ../../assets/work/cad-retopology/02.jpg
    alt: "Rear derailleur: a CAD assembly of dozens of parts on the left, the retopologized model on the right"
    caption: "Rear derailleur"
    detail: "14,204 triangles across 15 objects, rebuilt from an assembly of dozens of CAD parts."
  - src: ../../assets/work/cad-retopology/03.jpg
    alt: "Brake rotor: the CAD model on the left, the low-poly rotor with its spokes and cut-outs on the right"
    caption: "Brake rotor"
    detail: "9,436 triangles in 3 objects. Every cut-out kept, nothing wasted on flat faces."
  - src: ../../assets/work/cad-retopology/04.jpg
    alt: "Derailleur mechanism: the CAD assembly on the left, the clean model on the right"
    caption: "Derailleur mechanism"
    detail: "7,836 triangles in 13 objects, with the springs and pivots still readable."
order: 13
---

The client sent bicycle components as STEP files straight out of CAD. CAD meshes look fine in an engineering viewer and fall apart everywhere else: dense, uneven triangles that are hard to texture, heavy to load and slow to render.

I converted the STEP files to OBJ and rebuilt every component by hand. Each part got clean, efficient topology that keeps the original shapes and details: the teeth on the wheel, the cut-outs in the rotor, the pivots and springs of the derailleur. The result is a set of models ready for texturing, high-quality rendering, or a real-time viewer in the browser.
