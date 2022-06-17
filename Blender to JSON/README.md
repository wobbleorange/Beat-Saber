## Blender to JSON
Blender plugin to export animation data direct to JSON. (blend must be saved at least once, file cube.Locations.json will be in blend path)

SW conversion not required, may be imported directly in js script. (example script blend2env)

- v0.04 added color detection, minor fixes
- v0.05 complete redo of vector method (from front end to back end, ~8x faster)
- v0.06 added note export, wall thickness and alpha override
- v0.07 added environment materials. specific env's (BTS/gaga/billie) replaced with Environment. Will defaul to BTS pillar, or read entered material in second material slot.
- blend2env updated to work with material read from blender: bts (pillar, laser, pillarwithlaser), gaga (backcube), billie (leftfarrail)

(note, script may be either pasted into scripting window for session use, or imported)

![](menu.png)
