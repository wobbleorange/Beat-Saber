
Workspace:Default

0: Import
   Path:NormalStandard_Old.dat

#
# -- Candyland --
#



# -- grass and sky -----
1:Environment
	id:AuroraMain$
	lookupmethod:Regex
	position:[9333,2366,2333]
	scale:[10,140.5,0]
	rotation:[90,90,0]

1:Environment
	id:AuroraSecondary$
	lookupmethod:Regex
	position:[2667,-700,2333]
	scale:[10,40.5,0]
	rotation:[90,90,0]

# -- panels -----
1:Environment
	id:EnergyPanel$
	lookupmethod:Regex
	position:[0,-1.6667,10.8333]
	scale:[0.025,0.025,0.025]

1:Environment
	id:LeftPanel$
	lookupmethod:Regex
	position:[-4.167,0.8333,11.337]
	scale:[0.9,0.9,0.9]

1:Environment
	id:RightPanel$
	lookupmethod:Regex
	position:[4.167,0.8333,11.337]
	scale:[0.9,0.9,0.9]




# -- other -----



0:ModelToWall
  path:icecream.dae
  duration:419
  track:icecream
  type:3
  normal:false
  fake:true
  interactable:false
  animateDissolveArrow:[0,0]
  disableNoteLook:true
  disableNoteGravity:true
  disableSpawnEffect:true


0:ModelToWall
  path:poles2.dae
  duration:419
  track:poles
  type:3
  normal:false
  fake:true
  interactable:false
  animateDissolveArrow:[0,0]
  disableNoteLook:true
  disableNoteGravity:true
  disableSpawnEffect:true


0:ModelToWall
  path:tobu378.dae
  track:environment
  type:3
  normal:false
  fake:true
  interactable:false

0:ModelToWall
  path:bonbonRed.dae
  track:model2noteL
  type:3
  normal:false
  fake:true
  interactable:false

0:ModelToWall
  path:bonbonBlue.dae
  track:model2noteR
  type:3
  normal:false
  fake:true
  interactable:false

0:Run
  script:enviroCandy.js
  RunBefore: false
  refreshonsave:true





# -- fin
