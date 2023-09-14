const fs = require('fs');

const INPUT = "ExpertStandardV3_Old.dat"
const OUTPUT = "ExpertStandardV3.dat"

let map = JSON.parse(fs.readFileSync(INPUT));

if (!map.customData) {map.customData = {}}
if (!map.customData.fakeColorNotes) {map.customData.fakeColorNotes = []}
if (!map.customData.customEvents) {map.customData.customEvents = []}
if (!map.customData.environment) {map.customData.environment = []}
if (!map.customData.pointDefinitions) {map.customData.pointDefinitions = {}}

const customData = map.customData;
const obstacles = map.obstacles;
const notes = map.colorNotes;
const environment = customData.environment;
const customEvents = customData.customEvents;
const fakeColorNotes = customData.fakeColorNotes;
const pointDefinitions = customData.pointDefinitions;

let cube = 0;	// continuous counter for all


obstacles.forEach(wall => {
    if (!wall.customData) {
        wall.customData = {}
    }
})

notes.forEach(note => {
    if (!note.customData) {
        note.customData = {}
    }
})


function Random(min, max) {
	max++;
	return Math.random() * (max - min) + min;
  }

function RInt(min, max) {
	max++;
	return Math.floor(Math.random() * (max - min) + min);
  }

function RandEx (min, max, rad) {	// radius around player to exclude
	uppr = min+((max-min)/2) + rad - 1;
	lwwr = min+((max-min)/2) - rad + 1;
	max++
	
	if (min >= lwwr && min <= uppr && max >= lwwr && max <= uppr ) {cl("min max less than exclustion"); return min} // if min max less than exclusion, return minimum
	 do {x = Math.floor(Math.random() * (max - min) + min);
		//cl(x);
		}
	  while (x >= lwwr && x <= uppr);
	return x
}


function hsl2rgb(h,s,l,alpha,time) {
  let a = s*Math.min(l,1-l);
  let f = (n,k=(n+h/30)%12) => l - a*Math.max(Math.min(k-3,9-k,1),-1);
  if (!time) return [f(0),f(8),f(4),alpha];
  else return [f(0),f(8),f(4),alpha,time];
}

function cl (what) {console.log(what)};

function copy(obj) {
    if (typeof obj != 'object') return obj;

    var newObj = Array.isArray(obj) ? [] : {};

    for (const key in obj) {
        newObj[key] = copy(obj[key]);
    }
    return newObj
}


function shuffle(what) {
	array = copy(what)

	var ll = array.length,
		j = 0,
		temp;

	while (ll--) {

		j = Math.floor(Math.random() * (ll+1));

		// swap randomly chosen element with current element
		temp = array[ll];
		array[ll] = array[j];
		array[j] = temp;

	}
	return array;
}


// -- env ------------------------------------------------------------------------------------------------------------------------------

const env2Yeet = ["Mirror$","Feet$"];

env2Yeet.forEach (env => {
	environment.push({
        "id" : env,
        "lookupMethod" : "Regex",
        "active" : false})
});



// -- func ------------------------------------------------------------------------------------------------------------------------------

const somebeats = [1,2,3,4];

function doAtSomebeats (){
somebeats.forEach (beat => {

// enter stuff here

})
};


function enterNameHere (beat, endBeat) {
  filterednotes = notes.filter(n=> n.b >= beat && n.b < endBeat)
  filterednotes.forEach(note => {

// enter stuff here

  });
}


function arrowDissolveIn (beat, endBeat, NJS, NJSOffset) {
  filterednotes = notes.filter(n=> n.b >= beat && n.b < endBeat)
  filterednotes.forEach(note => {
    note.customData.noteJumpMovementSpeed = NJS;
    note.customData.noteJumpStartBeatOffset = NJSOffset;
    note.customData.animation = {};
    note.customData.animation.dissolveArrow = [[0,0.10],[1,0.15]];
  });
}


function sideSpawn (beat, endBeat, amountX, amountY, NJS, NJSOffset) {
  filterednotes = notes.filter(n=> n.b >= beat && n.b < endBeat)
  filterednotes.forEach(note => {

	  note.customData = {} // this will clear ALL custom data
	  note.customData.track = "sideSpawn"
	  note.customData.spawnEffect = false;
	  note.customData.animation = {}
	  note.customData.animation.offsetPosition = [[amountX,amountY,0,0],[0,0,0,0.2,"easeInOutSine","splineCatmullRom"]];
	  note.customData.animation.dissolve = [[0,0],[1,0.05]]
	  note.customData.animation.dissolveArrow = [[0,0],[1,0.05]]
	  note.customData.noteJumpMovementSpeed = NJS;
	  note.customData.noteJumpStartBeatOffset = NJSOffset;

  });
}


// note dissolve color change
function ndcc (beat, endBeat, NJS, NJSOffset) {
  filterednotes = notes.filter(n=> n.b >= beat && n.b < endBeat)
  filterednotes.forEach(note => {
	var noof = copy(note);
  //if (note.customData.track == "modelNote") {
   note.customData = {}
   note.customData.noteJumpMovementSpeed = NJS;
   note.customData.noteJumpStartBeatOffset = NJSOffset;
   note.customData.spawnEffect = false;
   note.customData.disableNoteLook = true;
   note.customData.disableNoteGravity = true;
   note.customData.track = "arrow"
   note.customData.animation = {}
   note.customData.animation.dissolve = [[1,0]];
   note.customData.animation.dissolveArrow = [[0,0]];
   note.customData.animation.scale = [[0.98,0.98,0.98,0]];
	//note.customData.animation.dissolveArrow = [[0,0]];

	noof.b = note.b;
	noof.x = note.x;
	noof.y = note.y;
	noof.c = note.c;
	noof.d = note.d;
	noof.customData.track = "noodz";
    noof.customData.animation = {}
	noof.customData.animation.color = [[0,0,0,1,0]];
	noof.customData.animation.dissolve = [[1,0.2],[0,0.35,"easeInOutSine"]];
	 //noof.customData.animation.dissolveArrow = [[0,0]];
	noof.customData.noteJumpMovementSpeed = NJS;
	noof.customData.noteJumpStartBeatOffset = NJSOffset;
	noof.customData.spawnEffect = false;
	noof.customData.disableNoteLook = true;
	noof.customData.disableNoteGravity = true;
	notes.push(noof);
   
 // }
  });
}

// note dissolve color change with pause
function ndccP (beat, endBeat, NJS, NJSOffset) {
  filterednotes = notes.filter(n=> n.b >= beat && n.b < endBeat)
  filterednotes.forEach(note => {
   note.customData = {}
   note.customData.noteJumpMovementSpeed = NJS;
   note.customData.noteJumpStartBeatOffset = NJSOffset;
   note.customData.spawnEffect = false;
   note.customData.disableNoteLook = true;
   note.customData.disableNoteGravity = true;
   note.customData.track = "arrow"
   note.customData.animation = {}
   note.customData.animation.dissolve = [[1,0]];
   note.customData.animation.dissolveArrow = [[0,0]];
   note.customData.animation.offsetPosition = [[0,0,0,0],[0,0,9,0.2],[0,0,0,0.45,"easeOutQuart"]];
   note.customData.animation.scale = [[0.98,0.98,0.98,0]];
	let noof = copy(note);
	noof.customData.track = "blacknote";
    noof.customData.uninteractable = true;
	//noof.customData._fake = true;	// needs to be under fakeColorNotes
    noof.customData.animation = {}
	noof.customData.animation.color = [[0,0,0,1,0]];
	noof.customData.animation.dissolve = [[1,0.15],[0,0.25,"easeInOutSine"]];
	noof.customData.animation.offsetPosition = [[0,0,0,0],[0,0,9,0.2],[0,0,0,0.45,"easeOutQuart"]];
	 //noof.customData.animation.dissolveArrow = [[0,0]];
	fakeColorNotes.push(noof);
   

  });
}


function sexySwerve (beat, endBeat) {
  filterednotes = notes.filter(n=> n.b >= beat && n.b < endBeat)
  filterednotes.forEach(note => {
   note.customData = {}
   note.customData.noteJumpMovementSpeed = 10;
   note.customData.noteJumpStartBeatOffset = 4;
   note.customData.spawnEffect = false;
   note.customData.disableNoteLook = true;
   note.customData.disableNoteGravity = true;
   note.customData.track = "sexySwerve"
   note.customData.animation = {}
   note.customData.animation.offsetPosition = [[0,0,0,0],[-5,2,0,0.09,"splineCatmullRom"],[2.5,5,0,0.18,"splineCatmullRom"],[-1.5,0,0,0.27,"splineCatmullRom"],[0,0,0,0.36,"splineCatmullRom"]];
  });
}


function hollowNote (beat, endBeat, NJS, NJSOffset) {
  filterednotes = notes.filter(n=> n.b >= beat && n.b < endBeat)
  filterednotes.forEach(note => {

   note.customData.noteJumpMovementSpeed = NJS;
   note.customData.noteJumpStartBeatOffset = NJSOffset;
   note.customData.spawnEffect = false;
   note.customData.disableNoteLook = true;
   note.customData.disableNoteGravity = true;
   note.customData.animation = {}
   note.customData.animation.dissolve = [[0,0]]
  	// 1
    let notef1 = copy(note);
    //notef1.customData._fake = true;
    notef1.customData.uninteractable = true;
    notef1.customData.animation = {}
    notef1.customData.animation.scale = [[1,0.05,1,0.4],[1,1,1,0.48]];
    notef1.customData.animation.offsetPosition = [[0,0.4,0,0.4],[0,0,0,0.48]];
    notef1.customData.animation.dissolve = [[1,0]]
    notef1.customData.animation.dissolveArrow = [[0,0]]
    fakeColorNotes.push(notef1);
	// 2
    let notef2 = copy(note);
    //notef2.customData._fake = true;
    notef2.customData.uninteractable = true;
    notef2.customData.animation = {}
    notef2.customData.animation.scale = [[1,0.05,1,0.4],[1,1,1,0.48]];
    notef2.customData.animation.offsetPosition = [[0,-0.4,0,0.4],[0,0,0,0.48]];
    notef2.customData.animation.dissolve = [[1,0]]
    notef2.customData.animation.dissolveArrow = [[0,0]]
    fakeColorNotes.push(notef2);
	// 3
    let notef3 = copy(note);
    //notef3.customData._fake = true;
    notef3.customData.uninteractable = true;
    notef3.customData.animation = {}
    notef3.customData.animation.scale = [[0.05,1,1,0.4],[1,1,1,0.48]];
    notef3.customData.animation.offsetPosition = [[-0.4,0,0,0.4],[0,0,0,0.48]];
    notef3.customData.animation.dissolve = [[1,0]]
    notef3.customData.animation.dissolveArrow = [[0,0]]
    fakeColorNotes.push(notef3);
	// 4
    let notef4 = copy(note);
    //notef4.customData._fake = true;
    notef4.customData.uninteractable = true;
    notef4.customData.animation = {}
    notef4.customData.animation.scale = [[0.05,1,1,0.4],[1,1,1,0.48]];
    notef4.customData.animation.offsetPosition = [[0.4,0,0,0.4],[0,0,0,0.48]];
    notef4.customData.animation.dissolve = [[1,0]]
    notef4.customData.animation.dissolveArrow = [[0,0]]
    fakeColorNotes.push(notef4);

  });
}


// BTS env -- random small pillar with laser
function randoDots(beat, dur) {
	for (let i = 0; i <= 15; i++) {

    let x = RandEx(-40, 40, 8);
    let y = RInt(-20, 20);
    let z = RInt(20, 100);
	 let xx = RInt(-20, 20);
	 let yy = RInt(-20, 20);
	 let zz = RInt(20, 40);
    let a = Random(0, 140);
    let b = Random(0, 140);
    let c = Random(0, 140);
	let time = Random(0,10);
	
    environment.push({
    id: "\\[17\\]SmallPillarPair\\.\\[0\\]PillarL$", // small pillar with laser
    lookupMethod: "Regex",
    duplicate: 1,
    localRotation: [-70, 0, 40],
    position: [x, y, 300],
	scale: [0.08,0.08,0.08], // cute pillar
	track: "rando" + i
    });

	customEvents.push({
	b: beat + time,
	t: "AnimateTrack",
	d: {
		track: "rando"	+ i,
		duration: dur - time,
		position: [[x,y,z,0],[x,y,z-60,0.2],[x,y,z,0.201,"easeStep"],[x,y,z-60,0.4],[x,y,z,0.401,"easeStep"],[x,y,z-60,0.6],[x,y,z,0.601,"easeStep"],[x,y,z-60,0.8],[x,y,z,0.801,"easeStep"],[x,y,z-60,0.98,"easeOutQuart"],[0,-5000,0,1]],
		localRotation: [[a,b,c,0],[a+b,b+c,c+a,1]]
		}
	})
	}
}


function amountPerBeat (beat, endBeat, amount) {
	beats = endBeat - beat
	total = beats * amount
	addT = 1 / amount

	for (c = 0; c < total; c++) {
	// notes, walls etc............
	   obstacles.push({
		b:beat + c*addT,
		uninteractable:true,
		customData:{
			color:[Random(0.1,0.9),Random(0.1,0.9),Random(0.1,0.9)],
			coordinates:[RandEx(-10,10,4),Random(-2,6)],
			size:[1,1,1],
			rotation:[0,0,RInt(-90,90)],
			localRotation:[RInt(-90,90),RInt(-90,90),RInt(-90,90)]
		}
	})
	}
}


function noteCloud (beat, amount, addT, sz) {		// needs to be under fakeColorNotes

	for (c = 0; c < amount; c++) {
	//grey
	fakeColorNotes.push ({
		b: beat + c*addT,

		customData: {
			uninteractable:true,
			noteJumpMovementSpeed:19,
			noteJumpStartBeatOffset:1,
			track:"noteCloud",
			disableNoteLook:true,
			localRotation:[0,0,Random(-45,45)],
			animation:{
				offsetPosition:[RandEx(-20,20,6),Random(-4,12),0],
				dissolveArrow:[[0,0]],
				color:[[0.8,0.8,0.8,1,0]],
				scale:[[sz,sz,sz,0]]}}
		})
	//gray
	fakeColorNotes.push ({
		b: beat + c*addT,

		customData: {
			uninteractable:true,
			noteJumpMovementSpeed:19,
			noteJumpStartBeatOffset:1,
			track:"noteCloud",
			disableNoteLook:true,
			localRotation:[0,0,Random(-45,45)],
			animation:{
				offsetPosition:[RandEx(-20,20,6),Random(-4,12),0],
				dissolveArrow:[[0,0]],
				color:[[0.5,0.5,0.5,1,0]],
				scale:[[sz,sz,sz,0]]}}
		})

	}
}


//set base fog
function setFog() {
	environment.push({
	id: "BTSEnvironment.[0]Environment",
	lookupMethod: "Exact",
	track: "ffog",
	components: {
    BloomFogEnvironment: {
		startY: -200,
		height: 2,
		attenuation: 0.00008,
		offset: -10000
		}
	}
})
};

function animateFog(beat){
	customEvents.push({
	b: beat,
	t: "AnimateComponent",
	d: {
		track: "ffog",
		duration: 2,
		easing: "easeLinear",
		BloomFogEnvironment: {
			//height: [[2,0],[-2,1]],
			attenuation: [[0.00008,0],[-0.00012,1]]
		}
	  }
	})
}



function sparks (beat, dur, speed, locX, locZ, Ymin, Ymax) {

 for (n = 0; n < 60*dur; n++) {

	addT=0.020;
	obstacles.push({
	b: beat + n*addT,
	x:0,
	h:0,
	d:speed,
	w:0,
	uninteractable:true,
	customData:{
		size:[0.5,0.5,0.5],
		position:[0,0],
		noteJumpMovementSpeed:20,
		disableSpawnEffect:true,
		animation:{
			scale:[[1,1,1,0],[0.2,0.2,0.2,1]],
			definitePosition:[[locX,Ymin,locZ,0],[locX+Random(-2,2),(Ymax-Ymin)/2,locZ+Random(-2,2),0.5,"splineCatmullRom"],[locX+Random(-4,4),Ymax+Random(-4,4),locZ,1,"splineCatmullRom"]],
			localRotation:[[0,0,0,0],[90,90,90,0.05],[180,180,180,0.1],[270,270,270,0.15],[360,360,360,0.2],[450,450,450,0.25],[540,540,540,0.3],[630,630,630,0.35],[720,720,720,0.4],[810,810,810,0.45],[900,900,900,0.5],[990,990,990,0.55],[1080,1080,1080,0.6],[1170,1170,1170,0.65],[1260,1260,1260,0.7],[1350,1350,1350,0.75],[1440,1440,1440,0.8],[1530,1530,1530,0.85],[1620,1620,1620,0.9],[1710,1710,1710,0.95],[1710,1710,1710,0.95],[1800,1800,1800,1]],
			color:[[1,0.3,0.3,1,0],[0.1,0.1,0.1,0.4,1]],
			dissolve:[[0,0],[1,0.2],[1,Random(0.75,0.95)],[0,1]]
		}
	}
	})
 
 }
}


function sparksRain (beat, amt, speed) {

Ymax=30;
Ymin=-4;
Xmax=30;
Xmin=-30;
Zmax=60;
Zmin=-5;

 for (n = 0; n < amt; n++) {

	addT=0.375;
	do {locX = Math.floor(Math.random() * (Xmax - Xmin) + Xmin); locZ = Math.floor(Math.random() * (Zmax - Zmin) + Zmin);}
	  while (locX >= -8 && locX <= 8 && locZ >= -2 && locZ <= 8);
	
	obstacles.push({
	b: beat + n*addT,
	x:0,
	h:0,
	d:speed,
	w:0,
	uninteractable:true,
	customData:{
		size:[0.5,0.5,0.5],
		position:[0,0],
		noteJumpMovementSpeed:10,
		disableSpawnEffect:true,
		animation:{
			scale:[[1,1,1,0],[0.4,0.4,0.4,1,"easeInCirc"]],
			definitePosition:[[locX,Ymax,locZ,0],[locX+Random(-2,2),(Ymax-Ymin)/2+Ymin,locZ+Random(-2,2),0.5,"splineCatmullRom"],[locX+Random(-4,4),Ymin,locZ+Random(-4,4),1,"splineCatmullRom"]],
			localRotation:[[0,0,0,0],[90,90,90,0.1],[180,180,180,0.2],[270,270,270,0.3],[360,360,360,0.4],[450,450,450,0.5],[540,540,540,0.6],[630,630,630,0.7],[720,720,720,0.8],[810,810,810,0.9]],
			color:[[1,0.3,0.3,1,0],[0.1,0.1,0.1,0.4,1]],
			dissolve:[[0,0],[1,0.2],[1,Random(0.75,0.95)],[0,1]]
		}
	}
	})
 
 }
}


function circlePoints (radius, amount) { // don't really need amount higher than 8

defPos = [];
amount += 1; //for full 360

for (i = 0; i < amount; i++) {
   xx = radius * Math.sin(((2 * Math.PI) / amount) * i)
   yy = radius * Math.cos(((2 * Math.PI) / amount) * i)
   zz = (i/amount)*-360 // for localRotation, if required
   
   defPos[i] = [xx, yy, 20, (i/amount), "splineCatmullRom"]
}
//cl(defPos);

pointDefinitions.defPosCircle = defPos

}
//circlePoints(20,8)

function noteSnow (beat, endBeat, amount) {
	beats = endBeat - beat
	addT = beats / amount

	for (c = 0; c < amount; c++) {

		xx = RInt(-12,12);
		zz = RInt(14,40);
		rotY = RInt(-40,40);
		rotZ = RInt(-20,20);
		randA = Random(-0.04,0.04);
		randB = Random(-0.04,0.04);

		fakeColorNotes.push ({
			b: beat + c*addT,
			x:0,
			y:0,
			c:0,
			d:0,
			customData: {
				noteJumpMovementSpeed:16,
				noteJumpStartBeatOffset:0,
				track:"noteSnow",
				uninteractable:true,
				//_fake:true,
				disableNoteLook:true,
				position:[0,0],
				localRotation:[0,rotY,rotZ],
				d:0.25,
				animation:{
					definitePosition:[[xx,20,zz,0],[xx,-8,zz,1]],
					dissolveArrow:[[0,0]],
					dissolve:[[0,0.04],[1,0.05],[1,0.9],[0.2,1]],
					color:[[1,1,1,1,0]],
					scale:[[Random(0.66,0.76),0.1,0.1,0]]}}
			});

			fakeColorNotes.push ({
			b: beat + c*addT,
			x:0,
			y:0,
			c:0,
			d:0,
			customData: {
				noteJumpMovementSpeed:16,
				noteJumpStartBeatOffset:0,
				track:"noteSnow",
				uninteractable:true,
				//_fake:true,
				disableNoteLook:true,
				position:[0,0],
				localRotation:[0,rotY,rotZ],
				d:0.25,
				animation:{
					definitePosition:[[xx,20,zz,0],[xx,-8,zz,1]],
					dissolveArrow:[[0,0]],
					dissolve:[[0,0.04],[1,0.05],[1,0.9],[0.2,1]],
					color:[[1,1,1,1,0]],
					scale:[[0.1,Random(0.66,0.76),0.1,0]]}}
			});

			fakeColorNotes.push ({
			b: beat + c*addT,
			x:0,
			y:0,
			c:0,
			d:0,
			customData: {
				noteJumpMovementSpeed:16,
				noteJumpStartBeatOffset:0,
				track:"noteSnow",
				uninteractable:true,
				//_fake:true,
				disableNoteLook:true,
				position:[0,0],
				localRotation:[0,rotY,rotZ+45],
				d:0.25,
				animation:{
					definitePosition:[[xx,20,zz,0],[xx,-8,zz,1]],
					dissolveArrow:[[0,0]],
					dissolve:[[0,0.04],[1,0.05],[1,0.9],[0.2,1]],
					color:[[1,1,1,1,0]],
					scale:[[0.1,Random(0.66,0.76),0.1,0]]}}
			});

			fakeColorNotes.push ({
			b: beat + c*addT,
			x:0,
			y:0,
			c:0,
			d:0,
			customData: {
				noteJumpMovementSpeed:16,
				noteJumpStartBeatOffset:0,
				track:"noteSnow",
				uninteractable:true,
				//_fake:true,
				disableNoteLook:true,
				position:[0,0],
				localRotation:[0,rotY,rotZ-45],
				d:0.25,
				animation:{
					definitePosition:[[xx,20,zz,0],[xx,-8,zz,1]],
					dissolveArrow:[[0,0]],
					dissolve:[[0,0.04],[1,0.05],[1,0.9],[0.2,1]],
					color:[[1,1,1,1,0]],
					scale:[[0.1,Random(0.66,0.76),0.1,0]]}}
			});

	}

}



// -- cube wall functions -----------------------------------------------------------------------------------------------------------------


function cubeSpiralMultiLCW (beat, diameter, zzMax, zzMin, spins, duration, repeats, delay, track) {

	zz = zzMax;
	zzz = ((zzMax - zzMin) / 8) / spins;
	
	d1 = diameter
	d2 = d1 * 0.707
	
	ss = 0.125 / spins
	tt = 0
	tt2 = 0
	rr = 0
	spiralSpins = [[-d1, 0, zz, 0, "splineCatmullRom"]];
	spiralRot = [[0, 0, rr, 0]];

	for (i = 0; i < spins; i++) {
		spiralSpins.push([-d2, d2, zz-=zzz, tt+=ss, "splineCatmullRom"],
						[0, d1, zz-=zzz, tt+=ss, "splineCatmullRom"],
						[d2, d2, zz-=zzz, tt+=ss, "splineCatmullRom"],
						[d1, 0, zz-=zzz, tt+=ss, "splineCatmullRom"],
						[d2, -d2, zz-=zzz, tt+=ss, "splineCatmullRom"],
						[0, -d1, zz-=zzz, tt+=ss, "splineCatmullRom"],
						[-d2, -d2, zz-=zzz, tt+=ss, "splineCatmullRom"],
						[-d1, 0, zz-=zzz, tt+=ss, "splineCatmullRom"]);
		
		spiralRot.push([0, 0, rr-=45, tt2+=ss],
						[0, 0, rr-=45, tt2+=ss],
						[0, 0, rr-=45, tt2+=ss],
						[0, 0, rr-=45, tt2+=ss],
						[0, 0, rr-=45, tt2+=ss],
						[0, 0, rr-=45, tt2+=ss],
						[0, 0, rr-=45, tt2+=ss],
						[0, 0, rr-=45, tt2+=ss]);
		}
		spiralSpins[spiralSpins.length-1][3] = 0.99;
		spiralSpins.push([0,-1000,0,1]);
	
	for (ii = 0; ii < repeats; ii++) {
		cube += 1;
		environment.push({
			geometry:{
			type:"Cube",
			material:{
				shader:"BTSPillar"
			}},
			position:[0,-1000,0],
			scale: [3,3,3],
			rotation: [0,0,0],
			track: track + cube
		});


		customEvents.push({
			b: beat + delay*ii,
			t: "AnimateTrack",
			d: {
				track: track + cube,
				duration: duration,
				position: spiralSpins
				//rotation: spiralRot
				//scale: [[1,1,1,0.05],[Xsc,1,1,0.30],[1.45,0.55,1.45,0.40],[1,1,1,0.5]]
			}
		});
	}
}


function cubeSpiralMultiRCCW (beat, diameter, zzMax, zzMin, spins, duration, repeats, delay, track) {

	zz = zzMax;
	zzz = ((zzMax - zzMin) / 8) / spins;
	
	d1 = diameter
	d2 = d1 * 0.707
	
	ss = 0.125 / spins
	tt = 0
	tt2 = 0
	rr = 0
	spiralSpins = [[d1, 0, zz, 0, "splineCatmullRom"]];
	spiralRot = [[0, 0, rr, 0]];

	for (i = 0; i < spins; i++) {
		spiralSpins.push([d2, d2, zz-=zzz, tt+=ss, "splineCatmullRom"],
						[0, d1, zz-=zzz, tt+=ss, "splineCatmullRom"],
						[-d2, d2, zz-=zzz, tt+=ss, "splineCatmullRom"],
						[-d1, 0, zz-=zzz, tt+=ss, "splineCatmullRom"],
						[-d2, -d2, zz-=zzz, tt+=ss, "splineCatmullRom"],
						[0, -d1, zz-=zzz, tt+=ss, "splineCatmullRom"],
						[d2, -d2, zz-=zzz, tt+=ss, "splineCatmullRom"],
						[d1, 0, zz-=zzz, tt+=ss, "splineCatmullRom"]);
		
		spiralRot.push([0, 0, rr-=45, tt2+=ss],
						[0, 0, rr-=45, tt2+=ss],
						[0, 0, rr-=45, tt2+=ss],
						[0, 0, rr-=45, tt2+=ss],
						[0, 0, rr-=45, tt2+=ss],
						[0, 0, rr-=45, tt2+=ss],
						[0, 0, rr-=45, tt2+=ss],
						[0, 0, rr-=45, tt2+=ss]);
	}
		spiralSpins[spiralSpins.length-1][3] = 0.99;
		spiralSpins.push([0,-1000,0,1]);
	

	for (ii = 0; ii < repeats; ii++) {
		cube += 1;
		environment.push({
			geometry:{
			type:"Cube",
			material:{
				shader:"BTSPillar"
			}},
			position:[0,-1000,0],
			scale: [3,3,3],
			rotation: [0,0,0],
			track: track + cube
		});


		customEvents.push({
			b: beat + delay*ii,
			t: "AnimateTrack",
			d: {
				track: track + cube,
				duration: duration,
				position: spiralSpins
				//rotation: spiralRot
				//scale: [[1,1,1,0.05],[Xsc,1,1,0.30],[1.45,0.55,1.45,0.40],[1,1,1,0.5]]
			}
		});			
	}
}




// WRITE YOUR SCRIPT IN HERE ˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇˇ

setFog()
animateFog(45)

hollowNote(5,15,10,2)

//ndcc(4,12,10,2)
ndccP(15,40,10,2)

//sideSpawn(0,49,8,6,14,1.5)
sexySwerve(40,60,8,6,14,1.5)

noteSnow(60,70,50)

randoDots(20,20)

amountPerBeat(40,60,20) // example with blocks
//noteCloud(5,20,0.5,2)


//sparks(5, 52, 1, 6, 35, -3, 22)
sparksRain(0.5,100,0)



cubeSpiralMultiLCW(4, 20, 120, -20, 1, 4, 20, 0.125, "sprrr");
cubeSpiralMultiRCCW(8, 20, 120, -20, 1, 4, 20, 0.125, "sprrr");
cubeSpiralMultiLCW(12, 20, 120, -20, 1, 4, 20, 0.125, "sprrr");
cubeSpiralMultiRCCW(16, 20, 120, -20, 1, 4, 20, 0.125, "sprrr");
cubeSpiralMultiLCW(20, 20, 120, -20, 1, 4, 20, 0.125, "sprrr");
cubeSpiralMultiRCCW(24, 20, 120, -20, 1, 4, 20, 0.125, "sprrr");
cubeSpiralMultiLCW(28, 20, 120, -20, 1, 4, 20, 0.125, "sprrr");
cubeSpiralMultiRCCW(32, 20, 120, -20, 1, 4, 20, 0.125, "sprrr");




// WRITE YOUR SCRIPT UP THERE ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

const jsonP = Math.pow(10, 4)
const sortP = Math.pow(10, 2)
function roundNum(obj) {
	if (obj)
		for (const key in obj) {
			if (obj[key] == null) {
				delete obj[key]
			} else if (typeof obj[key] === 'object' || Array.isArray(obj[key])) {
				roundNum(obj[key])
			} else if (typeof obj[key] == 'number') {
				obj[key] = parseFloat(Math.round((obj[key] + Number.EPSILON) * jsonP) / jsonP)
			}
		}
}
roundNum(map)


map.colorNotes.sort(
	(a, b) =>
		parseFloat(Math.round((a.b + Number.EPSILON) * sortP) / sortP) - parseFloat(Math.round((b.b + Number.EPSILON) * sortP) / sortP) ||
		parseFloat(Math.round((a.x + Number.EPSILON) * sortP) / sortP) - parseFloat(Math.round((b.x + Number.EPSILON) * sortP) / sortP) ||
		parseFloat(Math.round((a.y + Number.EPSILON) * sortP) / sortP) - parseFloat(Math.round((b.y + Number.EPSILON) * sortP) / sortP)
)
map.obstacles.sort((a, b) => a.b - b.b)
map.basicBeatmapEvents.sort((a, b) => a.b - b.b)

map.colorNotes.forEach(note => {
  if (Object.keys(note.customData).length == 0) {
	  delete note.customData;
	  }
})

fs.writeFileSync(OUTPUT, JSON.stringify(map, null, 0).replaceAll('\}\,\{','},\r{').replaceAll('\"basicBeatmapEvents\":[','\r\"basicBeatmapEvents\":[\r').replaceAll('\"colorBoostBeatmapEvents\":[','\r\"colorBoostBeatmapEvents\":[\r').replaceAll('\"lightColorEventBoxGroups\":[','\r\"lightColorEventBoxGroups\":[\r').replaceAll('\"lightRotationEventBoxGroups\":[','\r\"lightRotationEventBoxGroups\":[\r').replaceAll('\"lightTranslationEventBoxGroups\":[','\r\"lightTranslationEventBoxGroups\":[\r').replaceAll('\"basicEventTypesWithKeywords\":[','\r\"basicEventTypesWithKeywords\":[\r').replaceAll('\"customEvents\":[','\r\"customEvents\":[\r').replaceAll('\"colorNotes\":[','\r\"colorNotes\":[\r').replaceAll('\"bombNotes\":[','\r\"bombNotes\":[\r').replaceAll('\"sliders\":[','\r\"sliders\":[\r').replaceAll('\"burstSliders\":[','\r\"burstSliders\":[\r').replaceAll('\"fakeBurstSliders\":[','\r\"fakeBurstSliders\":[\r').replaceAll('\"fakeObstacles\":[','\r\"fakeObstacles\":[\r').replaceAll('\"fakeBombNotes\":[','\r\"fakeBombNotes\":[\r').replaceAll('\"fakeColorNotes\":[','\r\"fakeColorNotes\":[\r').replaceAll('\"waypoints\":[','\r\"waypoints\":[\r').replaceAll('\"obstacles\":[','\r\"obstacles\":[\r').replaceAll('\"bpmEvents\":[','\r\"bpmEvents\":[\r').replaceAll('\"rotationEvents\":[','\r\"rotationEvents\":[\r').replaceAll('\"environment\":[','\r\"environment\":[\r').replaceAll('\"materials\":[','\r\"materials\":[\r').replaceAll('\"bookmarks\":[','\r\"bookmarks\":[\r').replaceAll('\"pointDefinitions\":[','\r\"pointDefinitions\":[\r').replaceAll(']\,\"basicEventTypesWithKeywords\"',']\,\r\"basicEventTypesWithKeywords\"'));
