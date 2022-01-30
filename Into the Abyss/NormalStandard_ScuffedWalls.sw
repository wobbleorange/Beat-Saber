
Workspace:Default

0: Import
   Path:NormalStandard_Old.dat

#
# -- Into the Abyss --
#

1:Environment
    id:Waterfall$
    lookupmethod:Regex
    active:false

	
1:Environment
    id:DayAndNight
    lookupmethod:Regex
    active:true
	scale:[0.5,0.5,0.5]
	position:[0,2,-60]

1:Environment
    id:DayAndNight\.\[0\]Day$
    lookupmethod:Regex
    active:false
	#scale:[0.5,0.5,0.5]
	#position:[0,2,60]

1:Environment
	id:Night$
	lookupmethod:Regex
	active:true

1:Environment
    id:Moon$
    lookupmethod:Regex
    active:true
	duplicate:1
	position:[0,16,110]
	scale:[6,6,6]
	track:moon

1:Environment
    id:Sun$
    lookupmethod:Regex
    active:false
	#duplicate:1
	#position:[0,30,20]
	#scale:[6,6,6]
	track:sun

# -- weather -----

1:Environment
    id:Mountains$
    lookupmethod:Regex
    active:false

1:Environment
    id:Clouds$
    lookupmethod:Regex
    active:false

1:Environment
    id:Rain$
    lookupmethod:Regex
    active:false

1:Environment
    id:WaterRainRipples$
    lookupmethod:Regex
    active:false

# -- master rail keep -----

1:Environment
    id:LeftFarRail1$
    lookupmethod:Regex
    active:true
	position:[0,-300,0]
	track:rail
1:Environment
    id:LeftFarRail2$
    lookupmethod:Regex
    active:true
	position:[0,-300,0]
	track:rail


# -- railings -----

1:Environment
    id:LastRailingCurve$
    lookupmethod:Regex
    active:false
1:Environment
    id:RailingFullFront$
    lookupmethod:Regex
    active:false
1:Environment
    id:RailingFullBack$
    lookupmethod:Regex
    active:false
1:Environment
    id:RightFarRail1$
    lookupmethod:Regex
    active:false
1:Environment
    id:RightFarRail2$
    lookupmethod:Regex
    active:false
1:Environment
    id:LeftRail$
    lookupmethod:Regex
    active:false
1:Environment
    id:RightRail$
    lookupmethod:Regex
    active:false
1:Environment
    id:RailingCurveF$
    lookupmethod:Regex
    active:false

1:Environment
    id:RectangleFakeGlow$
    lookupmethod:Regex
    active:false

# -- energy panels -----

1:Environment
    id:LeftPanel$
    lookupmethod:Regex
    active:true
	position:[-14,1,5]
	rotation:[0,-90,0]
	scale:[1.6,1.6,1.6]
1:Environment
    id:RightPanel$
    lookupmethod:Regex
    active:true
	position:[14,1,5]
	rotation:[0,90,0]
	scale:[1.6,1.6,1.6]
1:Environment
    id:EnergyPanel$
    lookupmethod:Regex
    active:true
	position:[0,-0.25,6]

# -- lasers -----

1:Environment
	id:BottomPairLasers\.\[0\]PillarL$
	lookupmethod:Regex
	active:true
	localrotation:[0,120,0]
	scale:[2,2,2]
	track:laserL0

1:Environment
	id:BottomPairLasers\.\[1\]PillarR$
	lookupmethod:Regex
	active:true
	localrotation:[0,-120,0]
	scale:[2,2,2]
	track:laserR0


1:Environment
	id:BottomPairLasers \(1\)\.\[0\]PillarL$
	lookupmethod:Regex
	active:true
	localrotation:[0,120,0]
	scale:[2,2,2]
	track:laserL1

1:Environment
	id:BottomPairLasers \(1\)\.\[1\]PillarR$
	lookupmethod:Regex
	active:true
	localrotation:[0,-120,0]
	scale:[2,2,2]
	track:laserR1


1:Environment
	id:BottomPairLasers \(2\)\.\[0\]PillarL$
	lookupmethod:Regex
	active:true
	localrotation:[0,120,0]
	scale:[2,2,2]
	track:laserL2

1:Environment
	id:BottomPairLasers \(2\)\.\[1\]PillarR$
	lookupmethod:Regex
	active:true
	localrotation:[0,-120,0]
	scale:[2,2,2]
	track:laserR2


1:Environment
	id:BottomPairLasers \(3\)\.\[0\]PillarL$
	lookupmethod:Regex
	active:true
	localrotation:[0,120,0]
	scale:[2,2,2]
	track:laserL3

1:Environment
	id:BottomPairLasers \(3\)\.\[1\]PillarR$
	lookupmethod:Regex
	active:true
	localrotation:[0,-120,0]
	scale:[2,2,2]
	track:laserR3


1:Environment
	id:BottomPairLasers \(4\)\.\[0\]PillarL$
	lookupmethod:Regex
	active:true
	localrotation:[0,120,0]
	scale:[2,2,2]
	track:laserL4

1:Environment
	id:BottomPairLasers \(4\)\.\[1\]PillarR$
	lookupmethod:Regex
	active:true
	localrotation:[0,-120,0]
	scale:[2,2,2]
	track:laserR4


1:Environment
	id:BottomPairLasers \(5\)\.\[0\]PillarL$
	lookupmethod:Regex
	active:true
	localrotation:[0,120,0]
	scale:[2,2,2]
	track:laserL5

1:Environment
	id:BottomPairLasers \(5\)\.\[1\]PillarR$
	lookupmethod:Regex
	active:true
	localrotation:[0,-120,0]
	scale:[2,2,2]
	track:laserR5


1:Environment
	id:BottomPairLasers \(6\)\.\[0\]PillarL$
	lookupmethod:Regex
	active:true
	localrotation:[0,120,0]
	scale:[2,2,2]
	track:laserL6

1:Environment
	id:BottomPairLasers \(6\)\.\[1\]PillarR$
	lookupmethod:Regex
	active:true
	localrotation:[0,-120,0]
	scale:[2,2,2]
	track:laserR6


1:Environment
	id:BottomPairLasers \(7\)\.\[0\]PillarL$
	lookupmethod:Regex
	active:true
	localrotation:[0,120,0]
	scale:[2,2,2]
	track:laserL7

1:Environment
	id:BottomPairLasers \(7\)\.\[1\]PillarR$
	lookupmethod:Regex
	active:true
	localrotation:[0,-120,0]
	scale:[2,2,2]
	track:laserR7


1:Environment
	id:BottomPairLasers \(8\)\.\[0\]PillarL$
	lookupmethod:Regex
	active:true
	localrotation:[0,120,0]
	scale:[2,2,2]
	track:laserL8

1:Environment
	id:BottomPairLasers \(8\)\.\[1\]PillarR$
	lookupmethod:Regex
	active:true
	localrotation:[0,-120,0]
	scale:[2,2,2]
	track:laserR8


# -- laser swap -----
163:animateTrack
duration:1
	animateposition:[-4,0,15,0]
	animatelocalrotation:[20,130,0,0]
	animatescale:[1,1,1,0]
	track:laserL0

163:animateTrack
duration:1
	animateposition:[4,0,15,0]
	animatelocalrotation:[20,-130,0,0]
	animatescale:[1,1,1,0]
	track:laserR0

163:animateTrack
duration:1
	animateposition:[-4,0,25,0]
	animatelocalrotation:[20,130,0,0]
	animatescale:[1,1,1,0]
	track:laserL1

163:animateTrack
duration:1
	animateposition:[4,0,25,0]
	animatelocalrotation:[20,-130,0,0]
	animatescale:[1,1,1,0]
	track:laserR1

163:animateTrack
duration:1
	animateposition:[-4,0,35,0]
	animatelocalrotation:[20,130,0,0]
	animatescale:[1,1,1,0]
	track:laserL2

163:animateTrack
duration:1
	animateposition:[4,0,35,0]
	animatelocalrotation:[20,-130,0,0]
	animatescale:[1,1,1,0]
	track:laserR2

163:animateTrack
duration:1
	animateposition:[-4,0,45,0]
	animatelocalrotation:[20,130,0,0]
	animatescale:[1,1,1,0]
	track:laserL3

163:animateTrack
duration:1
	animateposition:[4,0,45,0]
	animatelocalrotation:[20,-130,0,0]
	animatescale:[1,1,1,0]
	track:laserR3

163:animateTrack
duration:1
	animateposition:[-4,0,55,0]
	animatelocalrotation:[20,130,0,0]
	animatescale:[1,1,1,0]
	track:laserL4

163:animateTrack
duration:1
	animateposition:[4,0,55,0]
	animatelocalrotation:[20,-130,0,0]
	animatescale:[1,1,1,0]
	track:laserR4

163:animateTrack
duration:1
	animateposition:[-4,0,65,0]
	animatelocalrotation:[20,130,0,0]
	animatescale:[1,1,1,0]
	track:laserL5

163:animateTrack
duration:1
	animateposition:[4,0,65,0]
	animatelocalrotation:[20,-130,0,0]
	animatescale:[1,1,1,0]
	track:laserR5

163:animateTrack
duration:1
	animateposition:[-4,0,75,0]
	animatelocalrotation:[20,130,0,0]
	animatescale:[1,1,1,0]
	track:laserL6

163:animateTrack
duration:1
	animateposition:[4,0,75,0]
	animatelocalrotation:[20,-130,0,0]
	animatescale:[1,1,1,0]
	track:laserR6

163:animateTrack
duration:1
	animateposition:[-4,0,85,0]
	animatelocalrotation:[20,130,0,0]
	animatescale:[1,1,1,0]
	track:laserL7

163:animateTrack
duration:1
	animateposition:[4,0,85,0]
	animatelocalrotation:[20,-130,0,0]
	animatescale:[1,1,1,0]
	track:laserR7

163:animateTrack
duration:1
	animateposition:[-4,0,95,0]
	animatelocalrotation:[20,130,0,0]
	animatescale:[1,1,1,0]
	track:laserL8

163:animateTrack
duration:1
	animateposition:[4,0,95,0]
	animatelocalrotation:[20,-130,0,0]
	animatescale:[1,1,1,0]
	track:laserR8



# -- lighting -----

1:Environment
    id:LightRailingSegment\.\[1]NeonTubeDirectionalL$
    lookupmethod:Regex
    active:true
	position:[-10,-0.8,48]
	localRotation:[90,90,0]
	scale:[0.5,1,0.5]
	track:tube1L

1:Environment
    id:LightRailingSegment \(1\)\.\[1]NeonTubeDirectionalL$
    lookupmethod:Regex
    active:true
	position:[-16.5,4,22.5]
	localRotation:[0,0,0]
	track:tube2L

1:Environment
    id:LightRailingSegment \(2\)\.\[1]NeonTubeDirectionalL$
    lookupmethod:Regex
    active:true
	position:[-16.5,4,34.5]
	localRotation:[0,0,0]
	track:tube3L

1:Environment
    id:LightRailingSegment \(3\)\.\[1]NeonTubeDirectionalL$
    lookupmethod:Regex
    active:true
	position:[-5,-2,76]
	#localRotation:[90,90,0]
	scale:[0.5,0.5,0.5]
	track:tube4L


1:Environment
    id:LightRailingSegment\.\[2]NeonTubeDirectionalR$
    lookupmethod:Regex
    active:true
	position:[10,-0.8,48]
	localRotation:[90,-90,0]
	scale:[0.5,1,0.5]
	track:tube1R

1:Environment
    id:LightRailingSegment \(1\)\.\[2]NeonTubeDirectionalR$
    lookupmethod:Regex
    active:true
	position:[16.5,4,22.5]
	localRotation:[0,0,0]
	track:tube2R

1:Environment
    id:LightRailingSegment \(2\)\.\[2]NeonTubeDirectionalR$
    lookupmethod:Regex
    active:true
	position:[16.5,4,34.5]
	localRotation:[0,0,0]
	track:tube3R

1:Environment
    id:LightRailingSegment \(3\)\.\[2]NeonTubeDirectionalR$
    lookupmethod:Regex
    active:true
	position:[5,-2,76]
	#localRotation:[90,-90,0]
	scale:[0.5,0.5,0.5]
	track:tube4R
	
# -- too much glow -----

1:Environment
    id:BakedBloom$
	lookupmethod:Regex
	active:false



# -- warning lights ----- type [1] key [5],[6]
1:Environment
    id:\[31]LightRailingSegment\.\[1]NeonTubeDirectionalL$
    lookupmethod:Regex
    active:true
	duplicate:1
	track:warning
	position:[-16,9,48]
	rotation:[0,90,0]
	scale:[1.2,0.08,1.2]

1:Environment
    id:\[31]LightRailingSegment\.\[2]NeonTubeDirectionalR$
    lookupmethod:Regex
    active:true
	duplicate:1
	track:warning
	position:[16,9,48]
	rotation:[0,90,0]
	scale:[1.2,0.08,1.2]




# -- swap enviro -----
163:AnimateTrack
track:moon
duration:1
animateposition:[0,-100,0,0]

163:AnimateTrack
track:warning
duration:1
animateposition:[0,-100,0,0]

163:AnimateTrack
track:tube1L
duration:1
animateposition:[-4,-1,25,0]
animatelocalrotation:[90,0,0,0]
animateScale:[0.8,0.8,0.8,0]

163:AnimateTrack
track:tube2L
duration:1
animateposition:[-4,-1,35,0]
animatelocalrotation:[90,0,0,0]
animateScale:[0.8,0.8,0.8,0]

163:AnimateTrack
track:tube3L
duration:1
animateposition:[-4,-1,46,0]
animatelocalrotation:[90,0,0,0]
animateScale:[0.8,0.8,0.8,0]

163:AnimateTrack
track:tube4L
duration:1
animateposition:[-4,-1,100,0]
animatelocalrotation:[90,0,0,0]
animateScale:[1,0.05,1,0]


163:AnimateTrack
track:tube1R
duration:1
animateposition:[4,-1,25,0]
animatelocalrotation:[90,0,0,0]
animateScale:[0.8,0.8,0.8,0]

163:AnimateTrack
track:tube2R
duration:1
animateposition:[4,-1,35,0]
animatelocalrotation:[90,0,0,0]
animateScale:[0.8,0.8,0.8,0]

163:AnimateTrack
track:tube3R
duration:1
animateposition:[4,-1,46,0]
animatelocalrotation:[90,0,0,0]
animateScale:[0.8,0.8,0.8,0]

163:AnimateTrack
track:tube4R
duration:1
animateposition:[4,-1,100,0]
animatelocalrotation:[90,0,0,0]
animateScale:[1,0.05,1,0]




# -- models -----

0:ModelToWall
  path:no_walls.dae
  track:walls
  type:3
  fake:true
  position:[0,0]
  animatedissolve:[0,0]
  animatedissolvearrow:[0,0]
  interactable:false

0:ModelToWall
  path:right_wall.dae
  track:right_wall
  type:3
  fake:true
  position:[0,0]
  animatedissolve:[0,0]
  animatedissolvearrow:[0,0]
  interactable:false

0:ModelToWall
  path:right_wall_fly.dae
  track:right_wall_fly
  type:3
  fake:true
  position:[0,0]
  animatedissolve:[0,0]
  animatedissolvearrow:[0,0]
  interactable:false

0:ModelToWall
  path:left_wall.dae
  track:left_wall
  type:3
  fake:true
  position:[0,0]
  animatedissolve:[0,0]
  animatedissolvearrow:[0,0]
  interactable:false

0:ModelToWall
  path:left_wall_fly.dae
  track:left_wall_fly
  type:3
  fake:true
  position:[0,0]
  animatedissolve:[0,0]
  animatedissolvearrow:[0,0]
  interactable:false

0:ModelToWall
  path:notrees.dae
  track:mountains
  type:3
  fake:true
  position:[0,0]
  animatedissolve:[0,0]
  animatedissolvearrow:[0,0]
  interactable:false

0:ModelToWall
  path:notrees_fly.dae
  track:mountains_fly
  type:3
  fake:true
  position:[0,0]
  animatedissolve:[0,0]
  animatedissolvearrow:[0,0]
  interactable:false


0:ModelToWall
  path:ground2.dae
  track:ground
  type:3
  fake:true
  position:[0,0]
  animatedissolve:[0,0]
  animatedissolvearrow:[0,0]
  interactable:false

0:ModelToWall
  path:ground_fly.dae
  track:ground_fly
  type:3
  fake:true
  position:[0,0]
  animatedissolve:[0,0]
  animatedissolvearrow:[0,0]
  interactable:false


0:ModelToWall
  path:intotheabyss_anim.dae
  track:abyss
  type:3
  fake:true
  position:[0,0]
  animatedissolve:[0,0]
  animatedissolvearrow:[0,0]
  interactable:false



0:Run
  Javascript:enviroZed.js
  RunBefore: false
  refreshonsave:true




# -- fin
