
Workspace:Default

0: Import
   Path:HardStandard_Old.dat

#
# --  BTS -- TFR ORIGINS
#




# -- panels -----
1:Environment
    id:EnergyPanel$
    lookupmethod:Regex
	position:[0,-0.02,5]
	rotation:[20,0,0]

1:Environment
    id:LeftPanel$$
    lookupmethod:Regex
	localRotation:[0,0,0]
	position:[-5,0.6666,15]

1:Environment
    id:RightPanel$$
    lookupmethod:Regex
	localRotation:[0,0,0]
	position:[5,0.6666,15]


# -- small pillar -----
#--0-
1:Environment
    id:SmallPillarPair\.\[\d+\]PillarL$
    lookupmethod:Regex
    active:true
	localRotation:[0,0,0]
	position:[-150,12,200]

1:Environment
    id:SmallPillarPair\.\[\d+\]PillarR$
    lookupmethod:Regex
    active:true
	localRotation:[0,0,0]
	position:[150,12,200]

#--1-
1:Environment
    id:SmallPillarPair \(1\)\.\[\d+\]PillarL$
    lookupmethod:Regex
    active:true
	localRotation:[0,0,0]
	position:[-126,12,208]

1:Environment
    id:SmallPillarPair \(1\)\.\[\d+\]PillarR$
    lookupmethod:Regex
    active:true
	localRotation:[0,0,0]
	position:[126,12,208]

#--2-
1:Environment
    id:SmallPillarPair \(2\)\.\[\d+\]PillarL$
    lookupmethod:Regex
    active:true
	localRotation:[0,0,0]
	position:[-100,12,213]

1:Environment
    id:SmallPillarPair \(2\)\.\[\d+\]PillarR$
    lookupmethod:Regex
    active:true
	localRotation:[0,0,0]
	position:[100,12,213]

#--3-
1:Environment
    id:SmallPillarPair \(3\)\.\[\d+\]PillarL$
    lookupmethod:Regex
    active:true
	localRotation:[0,0,0]
	position:[-77,12,220]

1:Environment
    id:SmallPillarPair \(3\)\.\[\d+\]PillarR$
    lookupmethod:Regex
    active:true
	localRotation:[0,0,0]
	position:[77,12,220]


# -- Pillar yeet -----
1:Environment
	id:\]PillarPair\.\[\d+\]PillarL$
	lookupmethod:Regex
	active:true
	position:[0,-9999,0]
1:Environment
	id:\]PillarPair\.\[\d+\]PillarR$
	lookupmethod:Regex
	active:true
	position:[0,-9999,0]

1:Environment
	id:\]PillarPair \(\d+\)\.\[\d+\]PillarL$
	lookupmethod:Regex
	active:false
1:Environment
	id:\]PillarPair \(\d+\)\.\[\d+\]PillarR$
	lookupmethod:Regex
	active:false




# -- model -----


0:ModelToWall
  path:windows.dae
  track:windows
  #type:3
  duration:300
  alpha:-1
  #thicc:12
  interactable:false
  fake:true

0:ModelToWall
  path:chimneys.dae
  track:chimneys
  #type:3
  duration:300
  alpha:-10
  thicc:12
  interactable:false
  fake:true


0:ModelToWall
  path:houselessAnim.dae
  track:houses
  #type:3
  duration:300
  alpha:-1
  thicc:12
  interactable:false
  fake:true


0:ModelToWall
  path:stonepathcastle.dae
  track:environment
  type:3
  #duration:300
  interactable:false
  fake:true


0:ModelToWall
  path:trees.dae
  track:noteTree
  type:3
  duration:300
  interactable:false
  fake:true
  disableNoteLook:true
  disableNoteGravity:true
  animateDissolveArrow:[0,0]


0:ModelToWall
  path:flower.dae
  track:model2noteL
  type:3


0:ModelToWall
  path:flowerzz.dae
  track:flowerzz
  type:3
  duration:300
  interactable:false
  fake:true
  disableNoteLook:true
  disableNoteGravity:true
  animateDissolveArrow:[0,0]
  deltaposition:[0,0,10]

# -- spider
55:ModelToWall
  path:spiderDance.dae
  track:spider
  type:3
  duration:59
  interactable:false
  fake:true
  disableNoteLook:true
  disableNoteGravity:true
  animateDissolve:[0,0.09],[1,0.1],[0,0.98,"easeStep"]
  animateDissolveArrow:[0,0]

55:ModelToWall
  path:silk.dae
  track:silk
  #type:3
  duration:50
  interactable:false
  fake:true
  animateDissolve:[0,0.09],[1,0.1],[1,0.95],[0,1]

115:ModelToWall
  path:lute.dae
  track:lute
  type:3
  duration:50
  interactable:false
  fake:true
  disableNoteLook:true
  disableNoteGravity:true
  animateDissolve:[1,0.9],[0,0.95]
  animateDissolveArrow:[0,0]

115:ModelToWall
  path:spiderStrum.dae
  track:spiderStrum
  type:3
  duration:50
  interactable:false
  fake:true
  disableNoteLook:true
  disableNoteGravity:true
  animateDissolve:[0,0],[1,0.01,"easeStep"],[1,0.9],[0,0.94]
  animateDissolveArrow:[0,0]

210.25:ModelToWall
  path:lute.dae
  track:lute2
  type:3
  duration:50
  interactable:false
  fake:true
  disableNoteLook:true
  disableNoteGravity:true
  animateDissolve:[1,0.9],[0,0.95]
  animateDissolveArrow:[0,0]

210.25:ModelToWall
  path:spiderStrum.dae
  track:spiderStrum2
  type:3
  duration:50
  interactable:false
  fake:true
  disableNoteLook:true
  disableNoteGravity:true
  animateDissolve:[0,0],[1,0.04],[1,0.01,"easeStep"],[1,0.9],[0,0.94]
  animateDissolveArrow:[0,0]




# -- js
0:Run
  script:enviroOrigins.js
  RunBefore: false
  refreshonsave:true



# -- fin
#	
#	
#	