const fs = require('fs');

const INPUT = "D:\\Games\\SteamLibrary\\steamapps\\common\\Beat Saber\\Beat Saber_Data\\CustomWIPLevels\\The Witch Queen\\ExpertStandard.dat"
const OUTPUT = "D:\\Games\\SteamLibrary\\steamapps\\common\\Beat Saber\\Beat Saber_Data\\CustomWIPLevels\\The Witch Queen\\EasyStandard.dat"

let map = JSON.parse(fs.readFileSync(INPUT));

//map._customData = { _environment: [], _customEvents: [] };		//disable if using SW

const _customData = map._customData;
const _obstacles = map._obstacles;
const _notes = map._notes;
const _environment = _customData._environment;
const _customEvents = _customData._customEvents;


_obstacles.forEach(wall => {
    if (!wall._customData) {
        wall._customData = {}
    }
})

_notes.forEach(note => {
    if (!note._customData) {
        note._customData = {}
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

function RandEx (min, max, rad) {
	max++
	if (min >= -rad && min <= rad && max >= -rad && max <= rad ) {return min} // if min max less than exclusion, return minimum
	 do {x = Math.floor(Math.random() * (max - min) + min);}
	  while (x >= -rad && x <= rad);
	return x
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


// --------------------------------------------------------------------------------------------------------------------------------

// default arrow dissolb
const disArrow = [[0,0.24],[1,0.30]];

function dissolbArrow (beat, endBeat, NJS, NJSOffset) {
  filterednotes = _notes.filter(n=> n._time >= beat && n._time < endBeat)
  filterednotes.forEach(note => {
    note._customData._noteJumpMovementSpeed = NJS;
    note._customData._noteJumpStartBeatOffset = NJSOffset;
    note._customData._animation = {};
    note._customData._animation._dissolveArrow = [[0,0.10],[1,0.15]];
  });
}


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
	
    _environment.push({
    _id: "\\[17\\]SmallPillarPair\\.\\[0\\]PillarL$", // small pillar with laser
    _lookupMethod: "Regex",
    _duplicate: 1,
    _localRotation: [-70, 0, 40],
    _position: [x, y, 300],
	_scale: [0.06,0.06,0.06], // cute pillar
	_track: "rando" + i,
	_lightID: 101
    });

	_customEvents.push({
	_time: beat + time,
	_type: "AnimateTrack",
	_data: {
		_track: "rando"	+ i,
		_duration: dur - time,
		_position: [[x,y,z,0],[x,y,z-60,0.2],[x,y,z,0.201,"easeStep"],[x,y,z-60,0.4],[x,y,z,0.401,"easeStep"],[x,y,z-60,0.6],[x,y,z,0.601,"easeStep"],[x,y,z-60,0.8],[x,y,z,0.801,"easeStep"],[x,y,z-60,0.98,"easeOutQuart"],[0,-5000,0,1]],
		_localRotation: [[a,b,c,0],[a+b,b+c,c+a,1]]
		}
	})

}
}


const somebeats = [12,14,18,32,33,36,42,46,50,64,92,98,102,106,106.656,107.312,112,118,136.812,138.812,140.844];

function addSomebeats (){
somebeats.forEach (beat => {
	_customEvents.push ({
	_time: beat,
	_type: "AnimateTrack",
	_data: {
		_track: "bgcircle0",
		_duration:2,
		_animatePosition:[[0.4,4,45,0],[0.4,4,-20,0.98],[0.4,-4000,45,1]]
		}
	})
})
};

addSomebeats();


//set base fog
	_customEvents.push({
	_time: 0,
	_type: "AssignFogTrack",
	_data: {_track: "gof"}})

	_customEvents.push({
	_time: 0,
	_type: "AnimateTrack",
	_data: {
		_track: "gof",
		_duration: 0,
		_startY: [[-10,0]],
		_height: [[4,0]],
		_attenuation: [[0.0012,0]],
		_offset: [[0,0]]
		}
	})

function no_foggy(beat) {
	_customEvents.push({
	_time: beat,
	_type: "AnimateTrack",
	_data: {
		_track: "gof",
		_duration: 10,
		_startY: [[-5000,0]],
		_height: [[4,0]],
		_attenuation: [[0,0],[-0.25,1]],
		_offset: [[92,0]]
		}
	})
}

function fog_fun(beat, dur) {
	_customEvents.push({
	_time: beat,
	_type: "AnimateTrack",
	_data: {
		_track: "gof",
		_duration: dur,
		//_startY: [[-50,0],[2,0.5]],
		//_height: [[400,0]],
		//_attenuation: [[-0.25,0],[0.75,1]],
		_offset: [[92,0],[0,0.4],[0,0.6],[90,1]]
		}
	})
}

function fog_reset(beat) {
	_customEvents.push({
	_time: beat,
	_type: "AnimateTrack",
	_data: {
		_track: "gof",
		_duration: 12,
		_startY: [[-10,0],[-10,1]],
		_height: [[4,0]],
		_attenuation: [[-0.125,0],[0.0012,1]],	// should be -0.25?
		_offset: [[92,0],[0,1]]
		}
	})
}


function noteCloud (beat, amount, addT, xx, sz) {
	//amount = amount/2;
	for (c = 0; c < amount; c++) {
	//orange
	_notes.push ({
		_time: beat + c*addT,
		_lineIndex:0,
		_lineLayer:0,
		_type:0,
		_cutDirection:0,
		_customData: {
			_interactable:false,
			_noteJumpMovementSpeed:19,
			_noteJumpStartBeatOffset:1,
			_track:"noteCloud",
			_fake:true,
			_disableNoteLook:true,
			_rotation:[0,0,Random(-45,45)],
			_position:[RandEx(-xx,xx,6),Random(-6,6)],
			_animation:{
				_dissolveArrow:[[0,0]],
				_color:[[0.914,0.486,0.333,1,0]],
				_scale:[[sz,sz,sz,0]]}}
		})
	//blue
	_notes.push ({
		_time: beat + c*addT,
		_lineIndex:0,
		_lineLayer:0,
		_type:0,
		_cutDirection:0,
		_customData: {
			_interactable:false,
			_noteJumpMovementSpeed:19,
			_noteJumpStartBeatOffset:1,
			_track:"noteCloud",
			_fake:true,
			_disableNoteLook:true,
			_rotation:[0,0,Random(-45,45)],
			_position:[RandEx(-xx,xx,6),Random(-6,6)],
			_animation:{
				_dissolveArrow:[[0,0]],
				_color:[[0.188,0.506,0.824,1,0]],
				_scale:[[sz,sz,sz,0]]}}
		})

	}
}


function mergeNote (beat, endBeat, NJS, NJSOffset) {
  filterednotes = _notes.filter(n=> n._time >= beat && n._time < endBeat)
  filterednotes.forEach(note => {
   note._customData._noteJumpMovementSpeed = NJS;
   note._customData._noteJumpStartBeatOffset = NJSOffset;
   note._customData._disableSpawnEffect = true;
   note._customData._disableNoteLook = true;
   note._customData._disableNoteGravity = true;
   note._customData._animation = {};
   note._customData._animation._position = [[0,0,-15,0.1],[0,0,-5,0.2,"splineCatmullRom"],[0,0,0,0.3,"easeOutCubic","splineCatmullRom"]];
   note._customData._animation._dissolve = [[0,0]];
   note._customData._animation._dissolveArrow = [[0,0.28],[1,0.32]];
  	// 1
    let notef1 = copy(note);
    notef1._customData._fake = true;
    notef1._customData._interactable = false;
    notef1._customData._animation = {}
    notef1._customData._animation._scale = [[0.4,0.4,0.4,0.25],[1,1,1,0.3]];
    notef1._customData._animation._position = [[Random(-3,3),Random(-2,3),-15,0.1],[Random(-1,1),Random(-1,1),-5,0.2,"splineCatmullRom"],[0,0,0,0.3,"easeOutSine","splineCatmullRom"]];
    notef1._customData._animation._dissolve = [[1,0]]
    notef1._customData._animation._dissolveArrow = [[0,0]]
    _notes.push(notef1);
	// 2
    let notef2 = copy(note);
    notef2._customData._fake = true;
    notef2._customData._interactable = false;
    notef2._customData._animation = {}
    notef2._customData._animation._scale = [[0.4,0.4,0.4,0.25],[1,1,1,0.3]];
    notef2._customData._animation._position = [[Random(-3,3),Random(-2,3),-15,0.1],[Random(-1,1),Random(-1,1),-5,0.2,"splineCatmullRom"],[0,0,0,0.3,"easeOutSine","splineCatmullRom"]];
    notef2._customData._animation._dissolve = [[1,0]]
    notef2._customData._animation._dissolveArrow = [[0,0]]
    _notes.push(notef2);
	// 3
    let notef3 = copy(note);
    notef3._customData._fake = true;
    notef3._customData._interactable = false;
    notef3._customData._animation = {}
    notef3._customData._animation._scale = [[0.4,0.4,1,0.25],[1,1,1,0.3]];
    notef3._customData._animation._position = [[Random(-3,3),Random(-2,3),-15,0.1],[Random(-1,1),Random(-1,1),-5,0.2,"splineCatmullRom"],[0,0,0,0.36,"easeOutSine","splineCatmullRom"]];
    notef3._customData._animation._dissolve = [[1,0]]
    notef3._customData._animation._dissolveArrow = [[0,0]]
    _notes.push(notef3);


  });
}


function effectRotY (beat, endBeat, NJS, NJSOffset, rotY) {
  filterednotes1 = _notes.filter(n=> n._time >= beat && n._time <= endBeat)
  filterednotes1.forEach(note => {
	if (note._type == 0) {
	note._customData._noteJumpMovementSpeed = NJS;
	note._customData._noteJumpStartBeatOffset = NJSOffset;
	note._customData._disableSpawnEffect = true;
	note._customData._disableNoteLook = true;
	note._customData._disableNoteGravity = true;
	note._customData._animation = {};
	note._customData._animation._dissolveArrow = [[0,0.24],[1,0.26]];
	note._customData._animation._rotation = [[0,-rotY,0,0],[0,0,0,0.28,"easeOutSine"]]
  }});
  filterednotes2 = _notes.filter(n=> n._time >= beat && n._time <= endBeat)
  filterednotes2.forEach(note => {
	if (note._type == 1) {
	note._customData._noteJumpMovementSpeed = NJS;
	note._customData._noteJumpStartBeatOffset = NJSOffset;
	note._customData._disableSpawnEffect = true;
	note._customData._disableNoteLook = true;
	note._customData._disableNoteGravity = true;
	note._customData._animation = {};
	note._customData._animation._dissolveArrow = [[0,0.24],[1,0.26]];
	note._customData._animation._rotation = [[0,rotY,0,0],[0,0,0,0.28,"easeOutSine"]]
  }});
}


function effectA (beat, endBeat, NJS, NJSOffset) {
  filterednotes = _notes.filter(n=> n._time >= beat && n._time < endBeat)
  filterednotes.forEach(note => {
   note._customData = {}
   note._customData._noteJumpMovementSpeed = NJS;
   note._customData._noteJumpStartBeatOffset = NJSOffset;
   note._customData._disableSpawnEffect = true;
   note._customData._disableNoteLook = true;
   note._customData._disableNoteGravity = true;
   note._customData._animation = {}
   note._customData._animation._dissolveArrow = disArrow;
   note._customData._animation._position = [[Random(-3,3),Random(-2,3),9,0],[0,0,0,0.20,"easeInCubic"]]

  });
}


function effectB (beat, endBeat, NJS, NJSOffset) {
  filterednotes = _notes.filter(n=> n._time >= beat && n._time < endBeat)
  filterednotes.forEach(note => {
    if (note._customData._track == "Lnote") {
		note._customData._noteJumpMovementSpeed = NJS;
		note._customData._noteJumpStartBeatOffset = NJSOffset;
		note._customData._disableSpawnEffect = true;
		note._customData._disableNoteLook = true;
		note._customData._disableNoteGravity = true;
		note._customData._animation = {};
		note._customData._animation._dissolveArrow = disArrow;
		note._customData._animation._position = [[0,0,-9,0],[-6,2,-12,0.1,"splineCatmullRom"],[-3,1,-14,0.28,"splineCatmullRom"],[-0.5,0,-2,0.38,"splineCatmullRom"],[0,0,0,0.45,"splineCatmullRom"]];
		note._customData._animation._scale = [[1,1,1,0],[0.95,0.95,0.95,0.38]]
	}
	if (note._customData._track == "Rnote") {
		note._customData._noteJumpMovementSpeed = NJS;
		note._customData._noteJumpStartBeatOffset = NJSOffset;
		note._customData._disableSpawnEffect = true;
		note._customData._disableNoteLook = true;
		note._customData._disableNoteGravity = true;
		note._customData._animation = {};
		note._customData._animation._dissolveArrow = disArrow;
		note._customData._animation._position = [[0,0,-9,0],[6,2,-12,0.1,"splineCatmullRom"],[3,1,-14,0.28,"splineCatmullRom"],[0.5,0,-2,0.38,"splineCatmullRom"],[0,0,0,0.45,"splineCatmullRom"]];
		note._customData._animation._scale = [[1,1,1,0],[0.95,0.95,0.95,0.38]]		
	}

  });
}


function effectC (beat, endBeat, NJS, NJSOffset) {
  filterednotes1 = _notes.filter(n=> n._time >= beat && n._time <= endBeat)
  filterednotes1.forEach(note => {
  if (note._customData._track == "Lnote") {
		note._customData._noteJumpMovementSpeed = NJS;
		note._customData._noteJumpStartBeatOffset = NJSOffset;
		note._customData._disableSpawnEffect = true;
		note._customData._disableNoteLook = true;
		note._customData._disableNoteGravity = true;
		note._customData._animation = {};
		note._customData._animation._dissolveArrow = disArrow;
		note._customData._animation._position = [[-5,0,0,0],[-2,1,0,0.1,"splineCatmullRom"],[0,0,0,0.2,"splineCatmullRom"]];
		note._customData._animation._scale = [[1,1,1,0],[0.95,0.95,0.95,0.38]]
  }
  });
  filterednotes2 = _notes.filter(n=> n._time >= beat && n._time < endBeat)
  filterednotes2.forEach(note => {
  if (note._customData._track == "Rnote") {
		note._customData._noteJumpMovementSpeed = NJS;
		note._customData._noteJumpStartBeatOffset = NJSOffset;
		note._customData._disableSpawnEffect = true;
		note._customData._disableNoteLook = true;
		note._customData._disableNoteGravity = true;
		note._customData._animation = {};
		note._customData._animation._dissolveArrow = disArrow;
		note._customData._animation._position = [[5,0,0,0],[2,1,0,0.1,"splineCatmullRom"],[0,0,0,0.2,"splineCatmullRom"]];
		note._customData._animation._scale = [[1,1,1,0],[0.95,0.95,0.95,0.38]]
  }
  });
}


function effectD (beat, endBeat, NJS, NJSOffset) {
  filterednotes = _notes.filter(n=> n._time >= beat && n._time <= endBeat)
  filterednotes.forEach(note => {
if (note._customData._track !== "noteCloud") {
		note._customData._noteJumpMovementSpeed = NJS;
		note._customData._noteJumpStartBeatOffset = NJSOffset;
		note._customData._disableSpawnEffect = true;
		note._customData._disableNoteLook = true;
		note._customData._disableNoteGravity = true;
		note._customData._animation = {};
		note._customData._animation._dissolveArrow = disArrow;
		note._customData._animation._position = [[0,0,-4,0],[0,0,0,0.2],[0,0,0,0.45,"easeOutQuart"]];
		note._customData._animation._localRotation = [[0,0,0,0],[0,0,90,0.04],[0,0,180,0.8],[0,0,270,0.12],[0,0,360,0.16],[0,0,450,0.2],[0,0,540,0.24],[0,0,630,0.26],[0,0,720,0.32]];
		//note._customData._animation._scale = [[1,1,1,0],[0.8,0.8,0.8,1]]		
}
  });
}


function effectE (beat, endBeat, NJS, NJSOffset) {
  filterednotes1 = _notes.filter(n=> n._time >= beat && n._time <= endBeat)
  filterednotes1.forEach(note => {
	if (note._type == 0) {
	note._customData._noteJumpMovementSpeed = NJS;
	note._customData._noteJumpStartBeatOffset = NJSOffset;
	note._customData._disableSpawnEffect = true;
	note._customData._disableNoteLook = true;
	note._customData._disableNoteGravity = true;
	note._customData._animation = {};
	note._customData._animation._dissolveArrow = disArrow;
	note._customData._animation._rotation = [[0,20,0,0],[0,0,0,0.2]]
  }});
  filterednotes2 = _notes.filter(n=> n._time >= beat && n._time <= endBeat)
  filterednotes2.forEach(note => {
	if (note._type == 1) {
	note._customData._noteJumpMovementSpeed = NJS;
	note._customData._noteJumpStartBeatOffset = NJSOffset;
	note._customData._disableSpawnEffect = true;
	note._customData._disableNoteLook = true;
	note._customData._disableNoteGravity = true;
	note._customData._animation = {};
	note._customData._animation._dissolveArrow = disArrow;
	note._customData._animation._rotation = [[0,-20,0,0],[0,0,0,0.2]]
  }});
}


function effect42 (beat, endBeat) {
  filterednotesL = _notes.filter(n=> n._time >= beat && n._time <= endBeat)
  filterednotesL.forEach(note => {
	note._customData._noteJumpMovementSpeed = 14;
	note._customData._noteJumpStartBeatOffset = 1.8;
	note._customData._disableSpawnEffect = true;
	note._customData._disableNoteLook = true;
	note._customData._disableNoteGravity = true;
	note._customData._animation = {};
	note._customData._animation._dissolveArrow = disArrow;
	note._customData._animation._position = [[-15,0,0,0],[-5,0,-10,0.12,"splineCatmullRom"],[0,0,-5,0.32,"easeOutQuart","splineCatmullRom"],[0,0,0,0.38,"splineCatmullRom"]]
  });
  filterednotesR = _notes.filter(n=> n._time >= beat+0.031 && n._time <= endBeat+0.031)
  filterednotesR.forEach(note => {
	note._customData._noteJumpMovementSpeed = 14;
	note._customData._noteJumpStartBeatOffset = 1.8;
	note._customData._disableSpawnEffect = true;
	note._customData._disableNoteLook = true;
	note._customData._disableNoteGravity = true;
	note._customData._animation = {};
	note._customData._animation._dissolveArrow = disArrow;
	note._customData._animation._position = [[15,0,0,0],[5,0,-10,0.12,"splineCatmullRom"],[0,0,-5,0.32,"easeOutQuart","splineCatmullRom"],[0,0,0,0.38,"splineCatmullRom"]]
  });

}



// --------------------------------------------------------------------------------------------------------------------------------


effectA(10,14.5,12,2);
effectE(16,20.5,12,2);
effectB(21,31.5,12,2);	// don't change

effectD(32,33,14,1);
effectE(34,35,14,0);
effectD(36,36,12,2);

effect42(42,42);

effectE(46,48.2,14,1);

//(48.5,49)); //in from the left?	leave no effect
//(49,49.5)); //in from the right?
//(50,50)); //in from the left?

effectC(54,57.2,14,1);


effectC(83,88,14,1);

mergeNote(95,108,12,2);


effectRotY(123,126,18,0.5,8);


randoDots(2,40);
randoDots(46,14);
randoDots(66,10);
randoDots(83,50);


no_foggy(2);
fog_fun(42,4);

fog_reset(159);


noteCloud(10,100,0.4,20,1);
noteCloud(94,100,0.1,10,0.4);

dissolbArrow(48.5,53,14,0);
dissolbArrow(58,79.5,14,0);
dissolbArrow(88,94,14,0);
dissolbArrow(110,122,14,0);
dissolbArrow(132,141,14,0);

// --------------------------------------------------------------------------------------------------------------------------------

const precision = 4
const jsonP = Math.pow(10, precision)
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

map._notes.sort(
	(a, b) =>
		parseFloat(Math.round((a._time + Number.EPSILON) * sortP) / sortP) - parseFloat(Math.round((b._time + Number.EPSILON) * sortP) / sortP) ||
		parseFloat(Math.round((a._lineIndex + Number.EPSILON) * sortP) / sortP) - parseFloat(Math.round((b._lineIndex + Number.EPSILON) * sortP) / sortP) ||
		parseFloat(Math.round((a._lineLayer + Number.EPSILON) * sortP) / sortP) - parseFloat(Math.round((b._lineLayer + Number.EPSILON) * sortP) / sortP)
)
_obstacles.sort((a, b) => a._time - b._time)
_customEvents.sort((a, b) => a._time - b._time)

fs.writeFileSync(OUTPUT, JSON.stringify(map, null, 0));