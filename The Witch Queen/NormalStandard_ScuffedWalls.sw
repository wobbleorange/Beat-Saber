
Workspace:Default

0: Import
Path:NormalStandard_Old.dat

#
# --  The Witch Queen --
#

# -- enviro -----

1:Environment
 id:Clouds
 lookupmethod:Contains
 active:false
1:Environment
 id:StarHemisphere$
 lookupmethod:Regex
 active:false
1:Environment
 id:StarEmitterPS$
 lookupmethod:Regex
 active:false
1:Environment
 id:BottomGlow$
 lookupmethod:Regex
 active:false

# -- contruction

1:Environment
 id:TrackMirror$
	lookupmethod:Regex
	#scale:[45,1,1]
	#position:[0,-2,-5]
	active:false

1:Environment
 id:Construction$
	lookupmethod:Regex
	#scale:[100,10,10]
	#position:[0,-20,-100]
	#localRotation:[0,0,180]
	active:false

1:Environment
 id:GlowLineC$
 lookupmethod:Regex
 active:true
 position:[0,-0.75,10]

1:Environment
 id:GlowLineL$
 lookupmethod:Regex
 active:true
 position:[-2.4,-0.5,17]
1:Environment
 id:GlowLineR$
 lookupmethod:Regex
 active:true
 position:[2.4,-0.5,17]


#--- pillar -----
#--0-
1:Environment
    id:PillarPair\.\[0\]PillarL$
    lookupmethod:Regex
    active:true
	localRotation:[20,0,0]
	position:[-46,6,110]

1:Environment
    id:PillarPair\.\[1\]PillarR$
    lookupmethod:Regex
    active:true
	localRotation:[20,0,0]
	position:[46,6,110]

1:Environment
    id:SmallPillarPair\.\[0\]PillarL$
    lookupmethod:Regex
    active:true
	localRotation:[20,0,0]
	position:[-45,12,110]

1:Environment
    id:SmallPillarPair\.\[1\]PillarR$
    lookupmethod:Regex
    active:true
	localRotation:[20,0,0]
	position:[45,12,110]
#--1-
1:Environment
    id:PillarPair \(1\)\.\[0\]PillarL$
    lookupmethod:Regex
    active:true
	localRotation:[20,0,0]
	position:[-54,4,100]

1:Environment
    id:PillarPair \(1\)\.\[1\]PillarR$
    lookupmethod:Regex
    active:true
	localRotation:[20,0,0]
	position:[54,4,100]

1:Environment
    id:SmallPillarPair \(1\)\.\[0\]PillarL$
    lookupmethod:Regex
    active:true
	localRotation:[20,0,0]
	position:[-53,10,100]

1:Environment
    id:SmallPillarPair \(1\)\.\[1\]PillarR$
    lookupmethod:Regex
    active:true
	localRotation:[20,0,0]
	position:[53,10,100]
#--2-
1:Environment
    id:PillarPair \(2\)\.\[0\]PillarL$
    lookupmethod:Regex
    active:true
	rotation:[20,0,0]
	position:[-62,2,90]

1:Environment
    id:PillarPair \(2\)\.\[1\]PillarR$
    lookupmethod:Regex
    active:true
	rotation:[20,0,0]
	position:[62,2,90]

1:Environment
    id:SmallPillarPair \(2\)\.\[0\]PillarL$
    lookupmethod:Regex
    active:true
	localRotation:[20,0,0]
	position:[-61,8,90]

1:Environment
    id:SmallPillarPair \(2\)\.\[1\]PillarR$
    lookupmethod:Regex
    active:true
	localRotation:[20,0,0]
	position:[61,8,90]
#--3-
1:Environment
    id:PillarPair \(3\)\.\[0\]PillarL$
    lookupmethod:Regex
    active:true
	localRotation:[20,0,0]
	position:[38,14,120]

1:Environment
    id:PillarPair \(3\)\.\[1\]PillarR$
    lookupmethod:Regex
    active:true
	localRotation:[20,0,0]
	position:[-38,14,120]
#--4-
1:Environment
    id:PillarPair \(4\)\.\[0\]PillarL$
    lookupmethod:Regex
    active:true
	rotation:[20,0,0]
	position:[30,16,130]

1:Environment
    id:PillarPair \(4\)\.\[1\]PillarR$
    lookupmethod:Regex
    active:true
	rotation:[20,0,0]
	position:[-30,16,130]



# -- logo

1:Environment
 id:EnergyPanel$
 lookupmethod:Regex
 active:true
 position:[0,-1.4,9.5]

1:Environment
 id:LeftPanel$
 lookupmethod:Regex
 active:false
1:Environment
 id:RightPanel$
 lookupmethod:Regex
 position:[0,0,-10000]

1:Environment
 id:SongProgressCanvas$
 lookupmethod:Regex
 position:[0,-2,9.5]
 

1:Environment
 id:BGCircle$
 lookupmethod:Regex
	active:true
	duplicate:1
	repeat:21
	position:[0.4,4,45]
	scale:[9,9,9]
	track:bgcirclerepeat

1:Environment
 id:EnergyIconFull$
 lookupmethod:Regex
	active:true
	duplicate:1
	repeat:20
	position:[1.5,6,45]
	scale:[60,60,60]
	localRotation:[0,0,45.5]
	track:EnergyIconFullrepeat

1:Environment
 id:EnergyIconFull$
 lookupmethod:Regex
	active:true
	duplicate:1
	repeat:20
	position:[-0.75,6,45]
	scale:[60,60,60]
	localRotation:[0,180,46]
	track:EnergyIconFullrepeat


# -- sprite glow
1:Environment
 id:MagicDoorSprite$
 lookupmethod:Regex
 #active:false
 scale:[1,10,1]
 rotation:[0,90,0]


# -- logo circle

0:AnimateTrack
 track:bgcircle0
 duration:1
 animatePosition:[0.4,-4000,45,0]


# -- twizzlers

1:Environment
	repeat:16
    id:RingsR\.\[repeat\]PillarTrackLaneRing\(Clone\)$
    lookupmethod:Regex
    active:true
	scale:[0.16,0.16,0.18]
	position:[25,{-6+repeat*2},35]
1:Environment
	repeat:16
    id:RingsR \(1\)\.\[repeat\]PillarTrackLaneRing\(Clone\)$
    lookupmethod:Regex
    active:true
	scale:[0.16,0.16,0.18]
	position:[-25,{-6+repeat*2},35]

#hide 17-29
1:Environment
	repeat:13
    id:RingsR\.\[{17+repeat}\]PillarTrackLaneRing\(Clone\)$
    lookupmethod:Regex
    active:false
1:Environment
	repeat:13
    id:RingsR \(1\)\.\[{17+repeat}\]PillarTrackLaneRing\(Clone\)$
    lookupmethod:Regex
    active:false


# -- other -----


0:ModelToWall
  path:witch_track.dae
  track:witchtrack
  type:3 



# -- js

0:Run
javascript:enviroBTSanim2.js
RunBefore: false
refreshonsave:true


0:Run
javascript:witch.js
RunBefore: false
refreshonsave:true


# -- fin
