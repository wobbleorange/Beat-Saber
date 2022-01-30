## Into the Abyss
Script is configured for Billie. Should be easy to change for the others. See Enviro folder for more explanation.

- must export dae from blender after running model origin function (import beatsaber.py into blender)
- any animations should be created AFTER running origin function, otherwise models will have incorrect offset in game and be misaligned

The script has two functions. The first is the main one to use for all models whether they contain an animation or not.

The second is to add a second animation track. (must have used main first) Add _fly to the trackname in SW, but not in the  script. (this is simply to differentiate the models, but keep the same trackname for animation)
