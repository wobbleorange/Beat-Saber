const fs = require("fs");
const three = require("three");

const mapInput = "HardStandard.dat"
const mapOutput = "EasyStandard.dat"

let map = JSON.parse(fs.readFileSync(mapInput));

const pillarToNoodleUnits = 0.1495;

const _notes = map._notes;
const _customEvents = map._customData._customEvents
const _customData = map._customData;
const _obstacles = map._obstacles;
const _environment = _customData._environment;

const noodlesL = _notes.filter(nyoom=> nyoom._customData && nyoom._customData._track == "model2noteL") //model track for flower


/*
TheFatRat - Origins
*/

if (!map._customData._environment) map._customData._environment = []

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


function vectorFromRotation(vectorRot, length) {
    const deg2rad = Math.PI / 180;
    var mathRot = copy(vectorRot);

    mathRot[0] *= deg2rad;
    mathRot[1] *= deg2rad;
    mathRot[2] *= deg2rad;

    var rotVector = new three.Vector3(0, length, 0).applyEuler(new three.Euler(...mathRot, "YXZ"));
    return [rotVector.x, rotVector.y, rotVector.z];
}


function reduceDupli(myArray) {
			xlong = myArray.length - 1;
			for (let xtime = 1; xtime < xlong; ) {
				if (myArray[xtime][0] == myArray[xtime-1][0] && 
				    myArray[xtime][1] == myArray[xtime-1][1] &&
					myArray[xtime][2] == myArray[xtime-1][2] &&
					myArray[xtime][0] == myArray[xtime+1][0] && 
				    myArray[xtime][1] == myArray[xtime+1][1] &&
					myArray[xtime][2] == myArray[xtime+1][2])
					{
					myArray.splice(xtime,1);
					xlong--;
			} else {xtime++};
			}
}


// add environment with or without an animation
function addEnv(track, aniTime, aniDur) {
  if (aniTime == undefined) aniTime=5;
  if (aniDur == undefined) aniDur=3;
  count = 0

  map._notes.forEach(x => {
    if (x._customData && x._customData._track == track) {
		count++;

        var y = copy(x);

        var pillarPos = y._customData._animation._definitePosition[0];
        var pillarRot = y._customData._animation._localRotation[0];
        var pillarScale = y._customData._animation._scale[0];

        pillarPos.pop();
        pillarRot.pop();
        pillarScale.pop();

        var offset = vectorFromRotation(pillarRot, pillarScale[1] / 2 * 0.87);

        pillarScale[0] *= pillarToNoodleUnits;
        pillarScale[1] *= pillarToNoodleUnits / 32;
        pillarScale[2] *= pillarToNoodleUnits;

        pillarPos[0] += offset[0];
        pillarPos[1] += offset[1];
        pillarPos[2] += offset[2];

        map._customData._environment.push({
            _id: "\\]PillarPair\\.\\[\\d+\\]PillarL\\.\\[\\d+\\]Pillar$",
            _lookupMethod: "Regex",
            _duplicate: 1,
            _position: pillarPos,
            _scale: pillarScale,
            _rotation: pillarRot,
            _track: track + count,
            _active: true
        })

		//-- animate track ----------

		if (x._customData._animation._definitePosition[1] !== undefined || x._customData._animation._localRotation[1] !== undefined || x._customData._animation._scale[1] !== undefined) {
			console.log("has animation")

			x._customData._animation._scale.forEach(array => array[0]*=pillarToNoodleUnits);
			x._customData._animation._scale.forEach(array => array[1]*=(pillarToNoodleUnits / 32));
			x._customData._animation._scale.forEach(array => array[2]*=pillarToNoodleUnits);

			x._customData._animation._definitePosition.forEach(array => array[0]+=offset[0]);
			x._customData._animation._definitePosition.forEach(array => array[1]+=offset[1]);
			x._customData._animation._definitePosition.forEach(array => array[2]+=offset[2]);

				reduceDupli(x._customData._animation._definitePosition);
				reduceDupli(x._customData._animation._scale);

			map._customData._customEvents.push({
				_time: aniTime, // to define as required
				_type: "AnimateTrack",
				_data: {
					_track: track + count,
					_duration: aniDur, // to define as required
					_position: x._customData._animation._definitePosition,
					_rotation: x._customData._animation._localRotation,
					_scale: x._customData._animation._scale
					}
				})
			}
    }	
  });
}




// -- env ---------------------------------------------------------------------------------------------------------


const env2Yeet = ["GlowLineL$","GlowLineR","LowCloudsGenerator$","Construction$","TrackMirror$","SideLaser$","BottomGlow$","DustPS$","StarEmitterPS$","StarHemisphere$"];

env2Yeet.forEach (env => {
	_environment.push({
        "_id" : env,
        "_lookupMethod" : "Regex",
        "_active" : false})
});

	_environment.push({
        "_id" : "HighCloudsGenerator$",
        "_lookupMethod" : "Regex",
        "_active" : true,
		"_scale" : [1.3,2,1]
		})

	_environment.push({
        "_id" : "HighCloudsGenerator$",
        "_lookupMethod" : "Regex",
        "_active" : true,
		"_duplicate" : 1,
		"_position" : [0,116,0],
		"_scale" : [1.3,2,0.52]
		})


for (i = 0; i < 20; i++) {

	xx = RInt(-150,150);
	yy = RInt(45,100);
	zz = RInt(-240,-100);

	xxx = RandEx(-1000,1000,500)

	_environment.push({
        "_id" : "HighCloudsGenerator$",
        "_lookupMethod" : "Regex",
        "_active" : true,
		"_duplicate" : 1,
		"_position" : [xxx,yy,zz],
		"_scale" : [2.3,3,1.52],
		"_track" : "clouds" + i
		})

		_customEvents.push({
		_time: 65,
		_type: "AnimateTrack",
		_data: {
		  _track: "clouds" + i,
		  _duration: 6,
		  _position: [[xxx,yy,zz,0],[xx,yy,zz,1,"easeOutCirc"]]
		}
		});

		_customEvents.push({
		_time: 112,
		_type: "AnimateTrack",
		_data: {
		  _track: "clouds" + i,
		  _duration: 6,
		  _position: [[xx,yy,zz,0],[xxx,yy,zz,1,"easeInSine"]]
		}
		});
}


_environment.push({
	"_id" : "GlowLineC$",
	"_lookupMethod" : "Regex",
	"_active" : true,
	"_position" : [0,-0.8,153],
	"_scale" : [15000,90,5],
	"_rotation" : [90,0,0]
	})


_environment.push({
	"_id" : "PillarTrackLaneRing",
	"_lookupMethod" : "Contains",
	"_active" : false
	})

_environment.push({
	"_id" : "MagicDoorSprite$",
	"_lookupMethod" : "Regex",
	"_active" : true,
	"_position" : [0,-1234,567],
	"_localRotation" : [0,90,0]
	})

_environment.push({
	"_id" : "MagicDoorSprite$",
	"_lookupMethod" : "Regex",
	"_active" : true,
	"_duplicate" : 1,
	"_position" : [0,-873,2400],
	"_localRotation" : [0,0,0],
	"_scale" : [10000,200,1]
	})



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
	_startY: [[-20,0]],
	_height: [[4,0]],
	_attenuation: [[0.0012,0]],
	_offset: [[19000,0]]
	}
})


// -- note mods ---------------------------------------------------------------------------------------------------------

treecount = 0;
function treeNote (beat, endBeat, NJS, NJSOffset, appear) {

  filterednotes = _notes.filter(n=> n._time >= beat && n._time < endBeat)
  filterednotes.forEach(note => {

	xx = Random(-9,-16);
	yy = Random(6,9);
	zz = Random(29,33);
	gg = Random(0.7,1);

	if (note._type == 0) {cc = [0.881,0.228,0.308,1,0.32]};
	if (note._type == 1) {cc = [0.188,0.62,1,1,0.32]};

	note._customData._track = "treeNote"
	note._customData._noteJumpMovementSpeed = NJS;
	note._customData._noteJumpStartBeatOffset = NJSOffset;
	note._customData._disableSpawnEffect = true;
	note._customData._disableNoteLook = true;
	note._customData._disableNoteGravity = true;
	note._customData._animation = {};
	note._customData._animation._color = [[0,gg,0,1,0.25],cc];
	note._customData._animation._dissolveArrow = [[0,0.15],[1,0.2]];
	note._customData._animation._dissolve = [[0,0],[1,0.05,"easeStep"]];
	note._customData._animation._definitePosition = [[xx,yy,zz,0.15],[Random(-3,2),1.5,30,0.25,"splineCatmullRom"],[0,0,15,0.35,"splineCatmullRom"],[0,0,0,0.5],[0,0,-10,0.55],[0,0,-1000,1]];
	note._customData._animation._scale = [[1.4,1.4,1.4,0.2],[1,1,1,0.25]]

		let notef1 = copy(note);
		notef1._time = 50 + appear;
		notef1._customData._noteJumpStartBeatOffset = 50;
		notef1._customData._track = "tree" + treecount;
		notef1._customData._fake = true;
		notef1._customData._interactable = false;
		notef1._customData._disableSpawnEffect = true;
		notef1._customData._disableNoteLook = true;
		notef1._customData._disableNoteGravity = true;
		notef1._customData._animation = {};
		notef1._customData._animation._color = [[0,gg,0,1,0]];
		notef1._customData._animation._scale = [[1.4,1.4,1.4,0]];
		notef1._customData._animation._definitePosition= [[xx,yy,zz,0]];
		notef1._customData._animation._dissolve = [[0,0],[1,0.02],[1,0.24],[0,0.25,"easeStep"]];
		notef1._customData._animation._dissolveArrow = [[0,0]];
		_notes.push(notef1);

	_customEvents.push({
		_time: note._time - 4.5,
		_type: "AnimateTrack",
		_data: {
		  _track: "tree" + treecount,
		  _duration: 0.1,
		  _dissolve: [[0,0]],
		  _color: [[2,2,2,1,0]]
		}
	  });

  treecount++;
  });

}

flowercount = 0;
function flowerNote (beat, endBeat, NJS, NJSOffset, appear) {

  filterednotes = _notes.filter(n=> n._time >= beat && n._time < endBeat)
  filterednotes.forEach(note => {

	xx = RandEx(-18,18,6);
	yy = -1;
	zz = Random(23,44);

	if (note._type == 0) {cc = [0.881,0.228,0.308,1,0.32]};
	if (note._type == 1) {cc = [0.188,0.62,1,1,0.32]};

	note._customData._track = "flowerNote";
	note._customData._noteJumpMovementSpeed = NJS;
	note._customData._noteJumpStartBeatOffset = NJSOffset;
	note._customData._disableSpawnEffect = true;
	note._customData._disableNoteLook = true;
	note._customData._disableNoteGravity = true;
	note._customData._animation = {};
	note._customData._animation._color = [[0.7991,0.6939,0.0723,0.28],cc];
	note._customData._animation._dissolveArrow = [[0,0.15],[1,0.2]];
	note._customData._animation._dissolve = [[0,0],[1,0.05,"easeStep"]];
	note._customData._animation._definitePosition = [[xx,yy,zz,0.15],[Random(-3,2),1.5,30,0.25,"splineCatmullRom"],[0,0,15,0.35,"splineCatmullRom"],[0,0,0,0.5],[0,0,-10,0.55],[0,0,-1000,1]];
	note._customData._animation._scale = [[0.1,0.1,0.1,0.1],[1,1,1,0.15]]

	   noodlesL.forEach(noodz => {
		noodz._customData._animation._position = noodz._customData._animation._definitePosition
		var noof = copy(noodz);
		noof._time = 50 + appear;
		noof._type = note._type;
		noof._cutDirection = 8;
		noof._customData._track = "flower" + flowercount;
		noof._customData._animation._definitePosition = [[xx,yy,zz,0]];
		noof._customData._animation._dissolve = [[1,0]];
		noof._customData._animation._dissolveArrow = [[0,0]];
		//noof._customData._noteJumpMovementSpeed = NJS;
		noof._customData._noteJumpStartBeatOffset = 50;
		noof._customData._disableSpawnEffect = true;
		noof._customData._disableNoteLook = true;
		noof._customData._disableNoteGravity = true;
		noof._customData._fake = true;
		noof._customData._interactable = false;
		
		_notes.push(noof);
	   });

	_customEvents.push({
		_time: note._time - 4.5,
		_type: "AnimateTrack",
		_data: {
		  _track: "flower" + flowercount,
		  _duration: 1,
		  _dissolve: [[0,0]],
		  _scale: [[1,1,1,0],[0.1,0.1,0.1,1]],
		  _color: [[2,2,2,1,0]]
		}
	  });

  flowercount++;
  });

}


function noteCloud (beat, endBeat, amount, xx, sz) {
	beats = endBeat - beat
	addT = beats / amount

	for (c = 0; c < amount; c++) {
	//red
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
			_position:[RandEx(-xx,xx,5),Random(0,2)],
			_flip:[RInt(-2,2),RInt(1,2)],
			_animation:{
				_dissolveArrow:[[0,0]],
				_color:[[0.881,0.228,0.308,1,0]],
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
			_position:[RandEx(-xx,xx,5),Random(0,2)],
			_flip:[RInt(-2,2),RInt(1,2)],
			_animation:{
				_dissolveArrow:[[0,0]],
				_color:[[0.188,0.62,1,1,0]],
				_scale:[[sz,sz,sz,0]]}}
		})

	}
}


function bloat (beat, endBeat, NJS, NJSOffset) {
  filterednotes = _notes.filter(n=> n._time >= beat && n._time < endBeat)
  filterednotes.forEach(note => {
	  if (!note._customData._track) {
	   note._customData = {}
	   note._customData._noteJumpMovementSpeed = NJS;
	   note._customData._noteJumpStartBeatOffset = NJSOffset;
	   note._customData._track = "bloat"
		  }
  });

	for (i = 1; i < 28; i++) {
		_customEvents.push({
		_time: beat + (i*0.75),
		_type: "AnimateTrack",
		_data: {
		  _track: "bloat",
		  _duration: 0.4,
		  _scale: [[1,1,1,0],[1.4,1.4,1.4,0.5],[1,1,1,1]]
		}
		});
	}

};


function swing (beat, endBeat, NJS, NJSOffset) {
	beat = beat - 2;

	for (i = 1; i < 8; i++) {
		_customEvents.push({
		_time: beat-0.75 + (i*3),
		_type: "AnimateTrack",
		_data: {
		  _track: ["swingL","swingLarrow"],
		  _duration: 1.5,
		  _rotation: [[0,0,0,0],[0,0,15,0.5],[0,0,0,1]],
		  _position: [[0,0,0,0],[0,0.5,0,0.5],[0,0,0,1]]
		}
		});
	}

	for (i = 1; i < 8; i++) {
		_customEvents.push({
		_time: beat+0.75 + (i*3),
		_type: "AnimateTrack",
		_data: {
		  _track: ["swingR","swingRarrow"],
		  _duration: 1.5,
		  _rotation: [[0,0,0,0],[0,0,-15,0.5],[0,0,0,1]],
		  _position: [[0,0,0,0],[0,0.5,0,0.5],[0,0,0,1]]
		}
		});
	}
};

function noteArrowRain (beat, endBeat, NJS, NJSOffset) {

  filterednotes = _notes.filter(n=> n._time >= beat && n._time < endBeat)
  filterednotes.forEach(note => {
	if (note._customData._track == "swingL" || note._customData._track == "swingR") {
	   note._customData._noteJumpMovementSpeed = NJS;
	   note._customData._noteJumpStartBeatOffset = NJSOffset;
	   note._customData._disableSpawnEffect = true;
	   note._customData._disableNoteLook = true;
	   note._customData._disableNoteGravity = true;
	   note._customData._animation = {};
	   note._customData._animation._dissolveArrow = [[0,0]];

		var arrow = copy(note);
		arrow._customData._track = note._customData._track + "arrow";
		arrow._customData._animation._position = [[0,26,20,0],[0,0,0,0.16,"easeOutCirc"]];
		arrow._customData._animation._dissolve = [[0,0]];
		arrow._customData._animation._dissolveArrow = [[0,0.06],[1,0.08],[1,0.5],[0,0.51]];
		arrow._customData._fake = true;
		arrow._customData._interactable = false;
		
		_notes.push(arrow);
	  }
  });

}


function arrowRain (beat, endBeat, amount, sz) {
	beats = endBeat - beat
	addT = beats / amount

	for (c = 0; c < amount; c++) {

	xx = RInt(-12,12);
	zz = RInt(14,40);

	_notes.push ({
		_time: beat + c*addT,
		_lineIndex:0,
		_lineLayer:0,
		_type:0,
		_cutDirection:0,
		_customData: {
			_noteJumpMovementSpeed:16,
			_noteJumpStartBeatOffset:0,
			_track:"arrowRain",
			_interactable:false,
			_fake:true,
			_disableNoteLook:true,
			_position:[0,0],
			_duration:0.25,
			_animation:{
				_definitePosition:[[xx,20,zz,0],[xx,-8,zz,1]],
				_dissolve:[[0,0]],
				_dissolveArrow:[[0,0.04],[1,0.05],[0.2,1]],
				_color:[[0,0,0,1,0]],
				_scale:[[sz,sz,sz,0]]}}
		})

	}
}


function brrrr (beat, endBeat, NJS, NJSOffset) {
  filterednotes = _notes.filter(n=> n._time >= beat && n._time < endBeat)
  filterednotes.forEach(note => {
	if (!note._customData._track) {
	   note._customData = {}
	   note._customData._noteJumpMovementSpeed = NJS;
	   note._customData._noteJumpStartBeatOffset = NJSOffset;
	   note._customData._track = "brrrr";
	   note._customData._animation = {};
	   note._customData._animation._localRotation = [[0,0,0,0],[60,0,0,0.025],[120,0,0,0.05],[180,0,0,0.075],[240,0,0,0.1],[300,0,0,0.125],[360,0,0,0.15]];

	var arrow = copy(note);
	arrow._customData._track = "brrrrArrow";
	arrow._customData._animation._scale = [[0,0,0,0],[2,0,0,0.015],[0,2,0,0.03],[2,0,0,0.045],[0,2,0,0.06],[2,0,0,0.075],[0,2,0,0.09],[2,0,0,0.105],[0,2,0,0.12],[2,0,0,0.135],[0,0,0,0.15]];
	arrow._customData._animation._dissolve = [[0,0]];
	arrow._customData._animation._dissolveArrow = [[1,0.15],[0,0.18]];
	arrow._customData._noteJumpMovementSpeed = NJS;
	arrow._customData._noteJumpStartBeatOffset = NJSOffset;
	arrow._customData._fake = true;
	arrow._customData._interactable = false;
	_notes.push(arrow);
  }
  });

};


function flips (beat, endBeat) {

  filterednotes = _notes.filter(n=> n._time >= beat && n._time < endBeat)
  filterednotes.forEach(note => {
	if (!note._customData._track) {
	   note._customData = {}
	   note._customData._noteJumpMovementSpeed = 16;
	   note._customData._noteJumpStartBeatOffset = 0.5;
	   note._customData._track = "flips";
	   note._customData._flip = [RInt(-2,2),RInt(0,2)];
	  }
  });
}


function chimneySmoke (beat, endBeat) {

dur = endBeat - beat;
addT=0.125;

locZ = 100
locX = 32.33
Ymin = 15
Ymid = 19

var cc = [[0.881,0.228,0.308,1,0],[0.188,0.62,1,1,0]]

 for (n = 0; n < 10*dur; n++) {
	grey = Random(0.4,0.5);
	_notes.push ({
		_time: beat + n*addT,
		_lineIndex:0,
		_lineLayer:0,
		_type:0,
		_cutDirection:8,
		_customData: {
			_interactable:false,
			_noteJumpMovementSpeed:18,
			_noteJumpStartBeatOffset:1,
			_track:"noteSmoke",
			_fake:true,
			_disableNoteLook:true,
			_localRotation:[0,0,Random(-45,45)],
			_animation:{
				_definitePosition: [[locX+Random(-0.75,0.75),Ymin,locZ,0],[locX+Random(-0.75,0.75),Ymid,locZ,0.2],[locX+RInt(-12,10),40,locZ+RInt(-5,5),0.6],[locX+RInt(-12,10),60,locZ+RInt(-10,10),1]],
				_dissolve: [[0,0.05],[1,0.08],[1,0.25],[0,1]],
				_dissolveArrow: [[0,0]],
				_color: [[grey,grey,grey,1,0]],
				_scale: [[1.4,1.4,1.4,0]]}}
		})
 }
}


function chimneyPop (beat, endBeat, NJS, NJSOffset) {
  filterednotes = _notes.filter(n=> n._time >= beat && n._time < endBeat)
  filterednotes.forEach(note => {
	if (note._type == 0) {cc = [0.881,0.228,0.308,1,0.32]};
	if (note._type == 1) {cc = [0.188,0.62,1,1,0.32]};
	grey = Random(0.4,0.5);
	  if (!note._customData._track) {
		note._customData = {}
		note._customData._noteJumpMovementSpeed = NJS;
		note._customData._noteJumpStartBeatOffset = NJSOffset;
		note._customData._track = "chimneyPop"
		note._customData._animation = {};
		note._customData._animation._color = [[grey,grey,grey,1,0.25],cc];
		note._customData._animation._dissolve = [[0,0.05],[1,0.08]];
		note._customData._animation._dissolveArrow = [[0,0.2],[1,0.27]];
		note._customData._animation._position = [[34,12,50,0],[34,21,70,0.2],[10,16,35,0.27,"splineCatmullRom"],[1,6,17,0.285,"easeOutCirc","splineCatmullRom"],[0,2,5,0.29,"splineCatmullRom"],[0,0,0,0.32,"splineCatmullRom"]]
		note._customData._animation._scale = [[1.4,1.4,1.4,0.2],[1,1,1,0.35]]
	  }
  });

};



// =========================================================================================================================


treeNote(20,31,12,3,0);

flowerNote(33,39,12,3,0);

treeNote(39,43,12,3,30);

bloat(45,67,16,0);


noteArrowRain(69,91,16,0);
noteArrowRain(93,115,16,0);
swing(69,91,16,0);
swing(93,115,16,0);

brrrr(117.5,118.5,16,0.5);

//nil(141,163)

flips(165,211);

brrrr(212.5,213.5,16,0.5);

chimneySmoke(213.5,235);
chimneyPop(213,235,16,2.5);

//nil(225,259)
//fin(273)


noteCloud(165,211,20,12,1);

arrowRain(67,114,100,1.5);




addEnv("environment",5,259);

map._notes = map._notes.filter(x => (x._customData && x._customData._track !== "environment"));
map._notes = map._notes.filter(x => (x._customData && x._customData._track !== "model2noteL"));



// WRITE YOUR SCRIPT IN HERE ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ ok

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


map._notes.sort(
	(a, b) =>
		parseFloat(Math.round((a._time + Number.EPSILON) * sortP) / sortP) - parseFloat(Math.round((b._time + Number.EPSILON) * sortP) / sortP) ||
		parseFloat(Math.round((a._lineIndex + Number.EPSILON) * sortP) / sortP) - parseFloat(Math.round((b._lineIndex + Number.EPSILON) * sortP) / sortP) ||
		parseFloat(Math.round((a._lineLayer + Number.EPSILON) * sortP) / sortP) - parseFloat(Math.round((b._lineLayer + Number.EPSILON) * sortP) / sortP)
)

map._obstacles.sort((a, b) => a._time - b._time)
//map._events.sort((a, b) => a._time - b._time)

fs.writeFileSync(mapOutput, JSON.stringify(map, null, 0).replaceAll('\}\,\{','},\r{').replaceAll('\"_events\":[','\r\"_events\":[\r').replaceAll('\"_customEvents\":[','\r\"_customEvents\":[\r').replaceAll('\"_notes\":[','\r\"_notes\":[\r').replaceAll('\"_obstacles\":[','\r\"_obstacles\":[\r').replaceAll('\"_waypoints\":[','\r\"_waypoints\":[\r').replaceAll('\"_environment\":[','\r\"_environment\":[\r'));


if (!fs.existsSync('./js backup')){
    fs.mkdirSync('./js backup');
}
fs.copyFile('enviroOrigins.js', `./js backup/enviroOrigins_${Date.now()}.js`, (err) => {
  if (err) throw err;
  console.log('OK! Copied backup');
});