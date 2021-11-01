
Workspace:Default

0: Import
   Path:NormalStandard_Old.dat

# -- underwater
0:Wall
duration:100
position:[0,0]
scale:[30,30,5]
animatedefiniteposition:[-15,-10.1,-2.3,0]
color:[0,0,0,-1]
interactable:false
fake:true


3:ModeltoWall
path:shark.dae
duration:100
interactable:false
normal:false
hasanimation:true
thicc:12
alpha:0.3
position:[0,6]
animateposition:[-4,6,30,0],[4,6,30,1]
animatedissolve:[0,0],[1,0.05],[1,0.9],[0,1]
#animaterotation:[0,-40,0,0],[0,40,0,1]
deltarotation:[0,10,0,0]

5:ModeltoWall
path:shark.dae
duration:100
interactable:false
normal:false
hasanimation:true
thicc:12
alpha:0.3
position:[0,3]
animateposition:[0,3,20,0]
animatedissolve:[0,0],[1,0.05],[1,0.9],[0,1]
animaterotation:[0,-40,-5,0],[0,40,-5,1]
#deltarotation:[0,180,0,0]



10:ModeltoWall
path:jaws3D.dae
duration:20
interactable:false
normal:false
thicc:12
alpha:0.05
position:[-2,0]
animateposition:[0,-5,0,0],[0,-0.15,0,0.2,"easeOutCubic"]
animatedissolve:[0,0],[1,0.05,"easeStep"]
#animaterotation:[0,0,0,0],[-10,0,0,0.2,"easeOutCubic"]
#deltarotation:[0,180,0,0]




