const fs = require("fs");
const three = require("D:\\Games\\SteamLibrary\\steamapps\\common\\Beat Saber\\Beat Saber_Data\\CustomWIPLevels\\node_modules\\three");

const mapInput = "NormalStandard.dat"
const mapOutput = "ExpertPlusStandard.dat"
const lightINPUT = "NormalLightshow.dat"
const noteNotes = "EasyStandard.dat"


let map = JSON.parse(fs.readFileSync(mapInput));
let importNotes = JSON.parse(fs.readFileSync(noteNotes));
let lightNotes = JSON.parse(fs.readFileSync(lightINPUT));

const pillarToNoodleUnits = 0.1495;
const NJO = 1.8;

const _notes = map._notes;
const _customEvents = map._customData._customEvents;
const _environment = map._customData._environment;

const noodlesL = _notes.filter(nyoom=> nyoom._customData && nyoom._customData._track == "model2noteL")
const noodlesR = _notes.filter(nyoom=> nyoom._customData && nyoom._customData._track == "model2noteR")


/*
Tobu Candyland
*/

if (!map._customData._environment) map._customData._environment = []

lightNotes._notes.forEach(note => {
    if (!note._customData) {
        note._customData = {}
    }
})

function cl (what) {console.log(what)};

function vectorFromRotation(vectorRot, length, lz) {
    const deg2rad = Math.PI / 180;
    var mathRot = copy(vectorRot);

    mathRot[0] *= deg2rad;
    mathRot[1] *= deg2rad;
    mathRot[2] *= deg2rad;

    var rotVector = new three.Vector3(0, length, lz).applyEuler(new three.Euler(...mathRot, "YXZ"));
    return [rotVector.x, rotVector.y, rotVector.z];
}

function copy(obj) {
    if (typeof obj != 'object') return obj;

    var newObj = Array.isArray(obj) ? [] : {};

    for (const key in obj) {
        newObj[key] = copy(obj[key]);
    }
    return newObj
}

function reduceDupli(myArray) {
			//cl("old long " + myArray.length);
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
			//cl("new long " + myArray.length);
}


// add environment with or without an animation
function addEnv(track, aniTime, aniDur) {
  if (aniTime == undefined) {aniTime = 5};
  if (aniDur == undefined) {aniDur = 10};
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

        var offset = vectorFromRotation(pillarRot, pillarScale[1] / 2 * 0.87, pillarScale[2] / 2 *.87);

        pillarScale[0] *= pillarToNoodleUnits * 0.65;
        pillarScale[1] *= pillarToNoodleUnits * 14.3;
        pillarScale[2] *= pillarToNoodleUnits * 7.15;
/* temporary disable
        pillarPos[1] += 0.09;
        pillarPos[2] += 0.65 * (1 / 0.6);
*/
        pillarPos[0] += offset[0];
        pillarPos[1] += offset[1];
        pillarPos[2] += offset[2];

        map._customData._environment.push({
            _id: "BackCube$",
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

			x._customData._animation._scale.forEach(array => array[0]*=pillarToNoodleUnits*0.65);
			x._customData._animation._scale.forEach(array => array[1]*=pillarToNoodleUnits*14.3);
			x._customData._animation._scale.forEach(array => array[2]*=pillarToNoodleUnits*7.15);

			x._customData._animation._definitePosition.forEach(array => array[0]+=offset[0]);
			x._customData._animation._definitePosition.forEach(array => array[1]+=offset[1]);
			x._customData._animation._definitePosition.forEach(array => array[2]+=offset[2]);
			//x._customData._animation._definitePosition[0] = pillarPos; // to correct anim offset?hmmmm

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



const env2Yeet = ["Logo\\.\\[\\d+\\]Logo$","Runway$","Construction$","DiskTop","Tower$","TubeR$","TubeL$","TubeL \\(\\d+\\)$","RunwayPier$","FrontLaserFogL$","FrontLaserFogR$","BloomFog$","SmokePSL","SmokePSR","StarSky"];

env2Yeet.forEach (env => {
	_environment.push({
        "_id" : env,
        "_lookupMethod" : "Regex",
        "_active" : false})
});


_environment.push({
        "_id" : "TeslaTower1L\\.\\[\\d+\\]DynamicTeslaDisc$",
        "_lookupMethod" : "Regex",
        "_track" : "L1"
})
_environment.push({
        "_id" : "TeslaTower2L\\.\\[\\d+\\]DynamicTeslaDisc$",
        "_lookupMethod" : "Regex",
        "_track" : "L2"
})
_environment.push({
        "_id" : "TeslaTower3L\\.\\[\\d+\\]DynamicTeslaDisc$",
        "_lookupMethod" : "Regex",
        "_track" : "L3"
})

_environment.push({
        "_id" : "TeslaTower1R\\.\\[\\d+\\]DynamicTeslaDisc$",
        "_lookupMethod" : "Regex",
        "_track" : "R1"
})
_environment.push({
        "_id" : "TeslaTower2R\\.\\[\\d+\\]DynamicTeslaDisc$",
        "_lookupMethod" : "Regex",
        "_track" : "R2"
})
_environment.push({
        "_id" : "TeslaTower3R\\.\\[\\d+\\]DynamicTeslaDisc$",
        "_lookupMethod" : "Regex",
        "_track" : "R3"
})

_environment.push({
        "_id" : "TeslaDiscColumn1LLightningTarget$",
        "_lookupMethod" : "Regex",
        "_track" : "L0logo",
		"_position" : [-43,41.666,300]
})
_environment.push({
        "_id" : "TeslaDiscColumn1RLightningTarget$",
        "_lookupMethod" : "Regex",
        "_track" : "R0logo",
		"_position" : [41.666,26.666,300]
})


_environment.push({
        "_id" : "FrontLaserL$",
        "_lookupMethod" : "Regex",
        "_track" : "FLL",
		"_active" : false
})
_environment.push({
        "_id" : "FrontLaserR$",
        "_lookupMethod" : "Regex",
        "_track" : "FLR",
		"_active" : false
})


_environment.push({
	"_id" : "RunwayPillar\\.\\[\\d+\\]RunwayLightL0$",
	"_lookupMethod" : "Regex",
	"_track" : "RWL0",
	"_position" : [-4,-1,32],
	"_scale" : [0.8,0.08,100],
	"_rotation":[0,0,0]
})
_environment.push({
	"_id" : "RunwayPillar\\.\\[\\d+\\]RunwayLightL1$",
	"_lookupMethod" : "Regex",
	"_track" : "RWL1",
	"_position" : [-4.6,-1,32],
	"_scale" : [0.8,0.08,100],
	"_rotation":[0,0,0]
})

_environment.push({
	"_id" : "RunwayPillar\\.\\[\\d+\\]RunwayLightR0$",
	"_lookupMethod" : "Regex",
	"_track" : "RWR0",
	"_position" : [4,-1,32],
	"_scale" : [0.8,0.08,100],
	"_rotation":[0,0,0]
})
_environment.push({
	"_id" : "RunwayPillar\\.\\[\\d+\\]RunwayLightR1$",
	"_lookupMethod" : "Regex",
	"_track" : "RWR1",
	"_position" : [4.6,-1,32],
	"_scale" : [0.8,0.08,100],
	"_rotation":[0,0,0]
})

	_environment.push({
		"_id" : "RunwayPillarLow \\(2\\)\\.\\[\\d+\\]RunwayLightL0$",
		"_lookupMethod" : "Regex",
		"_track" : "RWL0",
		"_position" : [-4,-1,55],
		"_scale" : [0.8,0.08,100],
		"_rotation":[0,0,0]
	})
	_environment.push({
		"_id" : "RunwayPillarLow \\(2\\)\\.\\[\\d+\\]RunwayLightL1$",
		"_lookupMethod" : "Regex",
		"_track" : "RWL1",
		"_position" : [-4.6,-1,55],
		"_scale" : [0.8,0.08,100],
		"_rotation":[0,0,0]
	})

	_environment.push({
		"_id" : "RunwayPillarLow \\(2\\)\\.\\[\\d+\\]RunwayLightR0$",
		"_lookupMethod" : "Regex",
		"_track" : "RWR0",
		"_position" : [4,-1,55],
		"_scale" : [0.8,0.08,100],
		"_rotation":[0,0,0]
	})
	_environment.push({
		"_id" : "RunwayPillarLow \\(2\\)\\.\\[\\d+\\]RunwayLightR1$",
		"_lookupMethod" : "Regex",
		"_track" : "RWR1",
		"_position" : [4.6,-1,55],
		"_scale" : [0.8,0.08,100],
		"_rotation":[0,0,0]
	})

		_environment.push({
			"_id" : "RunwayPillar\\.\\[\\d+\\]RunwayLightL0$",
			"_lookupMethod" : "Regex",
			"_track" : "RWL0",
			"_duplicate" : 1,
			"_position" : [-4,-1,78],
			"_scale" : [0.8,0.08,100],
			"_rotation":[0,0,0]
		})
		_environment.push({
			"_id" : "RunwayPillar\\.\\[\\d+\\]RunwayLightL1$",
			"_lookupMethod" : "Regex",
			"_track" : "RWL1",
			"_duplicate" : 1,
			"_position" : [-4.6,-1,78],
			"_scale" : [0.8,0.08,100],"_rotation":[0,0,0]
		})

		_environment.push({
			"_id" : "RunwayPillar\\.\\[\\d+\\]RunwayLightR0$",
			"_lookupMethod" : "Regex",
			"_track" : "RWR0",
			"_duplicate" : 1,
			"_position" : [4,-1,78],
			"_scale" : [0.8,0.08,100],
			"_rotation":[0,0,0]
		})
		_environment.push({
			"_id" : "RunwayPillar\\.\\[\\d+\\]RunwayLightR1$",
			"_lookupMethod" : "Regex",
			"_track" : "RWR1",
			"_duplicate" : 1,
			"_position" : [4.6,-1,78],
			"_scale" : [0.8,0.08,100],
			"_rotation":[0,0,0]
		})




// == lasers ===================
// -- l
const L1laser = ["TeslaTower1L\\.\\[\\d+\\]DynamicTeslaDisc\\.\\[\\d+\\]LightningWithTarget","TeslaTower1L\\.\\[\\d+\\]DynamicTeslaDisc\\.\\[\\d+\\]LightningWithTargetThin$"];
const L2laser = ["TeslaTower1L\\.\\[\\d+\\]DynamicTeslaDisc\\.\\[\\d+\\]LightningTarget$","TeslaTower2L\\.\\[\\d+\\]DynamicTeslaDisc\\.\\[\\d+\\]LightningWithTarget$","TeslaTower2L\\.\\[\\d+\\]DynamicTeslaDisc\\.\\[\\d+\\]LightningWithTargetThin$"];
const L3laser = ["TeslaTower2L\\.\\[\\d+\\]DynamicTeslaDisc\\.\\[\\d+\\]LightningTarget$","TeslaTower3L\\.\\[\\d+\\]DynamicTeslaDisc\\.\\[\\d+\\]LightningWithTarget$","TeslaTower3L\\.\\[\\d+\\]DynamicTeslaDisc\\.\\[\\d+\\]LightningWithTargetThin$"];
// -- r
const R1laser = ["TeslaTower1R\\.\\[\\d+\\]DynamicTeslaDisc\\.\\[\\d+\\]LightningWithTarget$","TeslaTower1R\\.\\[\\d+\\]DynamicTeslaDisc\\.\\[\\d+\\]LightningWithTargetThin$"];
const R2laser = ["TeslaTower1R\\.\\[\\d+\\]DynamicTeslaDisc\\.\\[\\d+\\]LightningTarget$","TeslaTower2R\\.\\[\\d+\\]DynamicTeslaDisc\\.\\[\\d+\\]LightningWithTarget$","TeslaTower2R\\.\\[\\d+\\]DynamicTeslaDisc\\.\\[\\d+\\]LightningWithTargetThin$"];
const R3laser = ["TeslaTower2R\\.\\[\\d+\\]DynamicTeslaDisc\\.\\[\\d+\\]LightningTarget$","TeslaTower3R\\.\\[\\d+\\]DynamicTeslaDisc\\.\\[\\d+\\]LightningWithTarget$","TeslaTower3R\\.\\[\\d+\\]DynamicTeslaDisc\\.\\[\\d+\\]LightningWithTargetThin$"];


L1laser.forEach (env => {
	_environment.push({
        "_id" : env,
        "_lookupMethod" : "Regex",
		"_track" : "L1laser"})
});
L2laser.forEach (env => {
	_environment.push({
        "_id" : env,
        "_lookupMethod" : "Regex",
		"_track" : "L2laser"})
});
L3laser.forEach (env => {
	_environment.push({
        "_id" : env,
        "_lookupMethod" : "Regex",
		"_track" : "L3laser"})
});
R1laser.forEach (env => {
	_environment.push({
        "_id" : env,
        "_lookupMethod" : "Regex",
		"_track" : "R1laser"})
});
R2laser.forEach (env => {
	_environment.push({
        "_id" : env,
        "_lookupMethod" : "Regex",
		"_track" : "R2laser"})
});
R3laser.forEach (env => {
	_environment.push({
        "_id" : env,
        "_lookupMethod" : "Regex",
		"_track" : "R3laser"})
});


function fogg() {
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
		_startY: [[-100,0]],
		_height: [[2,0]],
		_attenuation: [[-0.0012,0]],
		_offset: [[49000,0]]
		}
	});
}



// -- required for Tobu logo

map._customData._customEvents.push (
	{	_time: 1,
		_type: "AnimateTrack",
		_data: {
			_track: "L0logo",
			_duration: 419,
			_position: [[-43,41.666,300,0]]}})

map._customData._customEvents.push (
	{	_time: 1,
		_type: "AnimateTrack",
		_data: {
			_track: "R0logo",
			_duration: 419,
			_position: [[41.666,26.666,300,0]]}})

// -- set mid starting position
let L3last = [-100,33.333,87,0];
let L2last = [-100,33.333,176,0];
let L1last = [-73.333,33.333,247,0];
let L0Last = [-43,41.666,300,0];

let R3last = [100,33.333,87,0];
let R2last = [100,33.333,176,0];
let R1last = [73.333,33.333,247,0];
let R0last = [41.666,26.666,300,0];




// -- L --------------------
// -- L0
function L0_TOP(beat) {
	cl("L0 TOP undefined");	// friendly reminder
}

function L0_MID(beat) {
	cl("L0 MID undefined");
}

function L0_BTM(beat) {
	cl("L0 BTM undefined");
}

// -- L1
function L1_Jump(beat, dur) {
	if (dur != dur) {dur = 0.25};
	_customEvents.push({
	_time: beat,
	_type: "AnimateTrack",
	_data: {
		_track: "L1",
		_duration: dur,
		_position: [L1last,[-73.333,106,247,0.48,"easeInExpo"],[-73.333,106,247,0.52],[-73.333,66.666,247,1,"easeInExpo"]]
		}
	})
	L1last = [-73.333,66.666,247,0];
}

function L1_TOP(beat, dur) {
	if (dur != dur) {dur = 0.25};
	_customEvents.push({
	_time: beat,
	_type: "AnimateTrack",
	_data: {
		_track: "L1",
		_duration: dur,
		_position: [L1last,[-73.333,66.666,247,1]]
		}
	})
	L1last = [-73.333,66.666,247,0];
}
function L1_MID(beat, dur) {
	if (dur != dur) {dur = 0.25};
	_customEvents.push({
	_time: beat,
	_type: "AnimateTrack",
	_data: {
		_track: "L1",
		_duration: dur,
		_position: [L1last,[-73.333,33.333,247,1]]
		}
	})
	L1last = [-73.333,33.333,247,0];
}
function L1_BTM(beat, dur) {
	if (dur != dur) {dur = 0.25};
	_customEvents.push({
	_time: beat,
	_type: "AnimateTrack",
	_data: {
		_track: "L1",
		_duration: dur,
		_position: [L1last,[-73.333,0,247,1]]
		}
	})
	L1last = [-73.333,0,247,0];
}

// -- L2
function L2_Jump(beat, dur) {
	if (dur != dur) {dur = 0.25};
	_customEvents.push({
	_time: beat,
	_type: "AnimateTrack",
	_data: {
		_track: "L2",
		_duration: dur,
		_position: [L2last,[-100,106,176,0.48,"easeInExpo"],[-100,106,176,0.52],[-100,66.666,176,1,"easeInExpo"]]
		}
	})
	L2last = [-100,66.666,176,0];
}

function L2_TOP(beat, dur) {
	if (dur != dur) {dur = 0.25};
	_customEvents.push({
	_time: beat,
	_type: "AnimateTrack",
	_data: {
		_track: "L2",
		_duration: dur,
		_position: [L2last,[-100,66.666,176,1]]
		}
	})
	L2last = [-100,66.666,176,0];
}
function L2_MID(beat, dur) {
	if (dur != dur) {dur = 0.25};
	_customEvents.push({
	_time: beat,
	_type: "AnimateTrack",
	_data: {
		_track: "L2",
		_duration: dur,
		_position: [L2last,[-100,33.333,176,1]]
		}
	})
	L2last = [-100,33.333,176,0];
}
function L2_BTM(beat, dur) {
	if (dur != dur) {dur = 0.25};
	_customEvents.push({
	_time: beat,
	_type: "AnimateTrack",
	_data: {
		_track: "L2",
		_duration: dur,
		_position: [L2last,[-100,0,176,1]]
		}
	})
	L2last = [-100,0,176,0];
}

// -- L3
function L3_Jump(beat, dur) {
	if (dur != dur) {dur = 0.25};

	_customEvents.push({
	_time: beat,
	_type: "AnimateTrack",
	_data: {
		_track: "L3",
		_duration: dur,
		_position: [L3last,[-100,106,87,0.48,"easeInExpo"],[-100,106,87,0.52],[-100,66.666,87,1,"easeInExpo"]]
		}
	})

	L3last = [-100,66.666,87,0];
}

function L3_TOP(beat, dur) {
	if (dur != dur) {dur = 0.25};

	_customEvents.push({
	_time: beat,
	_type: "AnimateTrack",
	_data: {
		_track: "L3",
		_duration: dur,
		_position: [L3last,[-100,66.666,87,1]]
		}
	})

	L3last = [-100,66.666,87,0];
}
function L3_MID(beat, dur) {
	if (dur != dur) {dur = 0.25};
	
	_customEvents.push({
	_time: beat,
	_type: "AnimateTrack",
	_data: {
		_track: "L3",
		_duration: dur,
		_position: [L3last,[-100,33.333,87,1]]
		}
	})

	L3last = [-100,33.333,87,0];
}
function L3_BTM(beat, dur) {
	if (dur != dur) {dur = 0.25};	
	_customEvents.push({
	_time: beat,
	_type: "AnimateTrack",
	_data: {
		_track: "L3",
		_duration: dur,
		_position: [L3last,[-100,0,87,1]]
		}
	})
	L3last = [-100,0,87,0];
}


// -- R --------------------
// -- R0
function R0_TOP(beat) {
	cl("R0 TOP undefined");
}

function R0_MID(beat) {
	cl("R0 MID undefined");
}

function R0_BTM(beat) {
	cl("R0 BTM undefined");
}

// -- R1
function R1_Jump(beat, dur) {
	if (dur != dur) {dur = 0.25};
	_customEvents.push({
	_time: beat,
	_type: "AnimateTrack",
	_data: {
		_track: "R1",
		_duration: dur,
		_position: [R1last,[73.333,106,247,0.48,"easeInExpo"],[73.333,106,247,0.52],[73.333,66.666,247,1,"easeInExpo"]]
		}
	})
	R1last = [73.333,66.666,247,0];
}

function R1_TOP(beat, dur) {
	if (dur != dur) {dur = 0.25};
	_customEvents.push({
	_time: beat,
	_type: "AnimateTrack",
	_data: {
		_track: "R1",
		_duration: dur,
		_position: [R1last,[73.333,66.666,247,1]]
		}
	})
	R1last = [73.333,66.666,247,0];
}
function R1_MID(beat, dur) {
	if (dur != dur) {dur = 0.25};
	_customEvents.push({
	_time: beat,
	_type: "AnimateTrack",
	_data: {
		_track: "R1",
		_duration: dur,
		_position: [R1last,[73.333,33.333,247,1]]
		}
	})
	R1last = [73.333,33.333,247,0];
}
function R1_BTM(beat, dur) {
	if (dur != dur) {dur = 0.25};
	_customEvents.push({
	_time: beat,
	_type: "AnimateTrack",
	_data: {
		_track: "R1",
		_duration: dur,
		_position: [R1last,[73.333,0,247,1]]
		}
	})
	R1last = [73.333,0,247,0];
}

// -- R2
function R2_Jump(beat, dur) {
	if (dur != dur) {dur = 0.25};
	_customEvents.push({
	_time: beat,
	_type: "AnimateTrack",
	_data: {
		_track: "R2",
		_duration: dur,
		_position: [R2last,[100,106,176,0.48,"easeInExpo"],[100,106,176,0.52],[100,66.666,176,1,"easeInExpo"]]
		}
	})
	R2last = [100,66.666,176,0];
}

function R2_TOP(beat, dur) {
	if (dur != dur) {dur = 0.25};
	_customEvents.push({
	_time: beat,
	_type: "AnimateTrack",
	_data: {
		_track: "R2",
		_duration: dur,
		_position: [R2last,[100,66.666,176,1]]
		}
	})
	R2last = [100,66.666,176,0];
}
function R2_MID(beat, dur) {
	if (dur != dur) {dur = 0.25};
	_customEvents.push({
	_time: beat,
	_type: "AnimateTrack",
	_data: {
		_track: "R2",
		_duration: dur,
		_position: [R2last,[100,33.333,176,1]]
		}
	})
	R2last = [100,33.333,176,0];
}
function R2_BTM(beat, dur) {
	if (dur != dur) {dur = 0.25};
	_customEvents.push({
	_time: beat,
	_type: "AnimateTrack",
	_data: {
		_track: "R2",
		_duration: dur,
		_position: [R2last,[100,0,176,1]]
		}
	})
	R2last = [100,0,176,0];
}

// -- R3
function R3_Jump(beat, dur) {
	if (dur != dur) {dur = 0.25};

	_customEvents.push({
	_time: beat,
	_type: "AnimateTrack",
	_data: {
		_track: "R3",
		_duration: dur,
		_position: [R3last,[100,106,87,0.48,"easeInExpo"],[100,106,87,0.52],[100,66.666,87,1,"easeInExpo"]]
		}
	})

	R3last = [100,66.666,87,0];
}

function R3_TOP(beat, dur) {
	if (dur != dur) {dur = 0.25};

	_customEvents.push({
	_time: beat,
	_type: "AnimateTrack",
	_data: {
		_track: "R3",
		_duration: dur,
		_position: [R3last,[100,66.666,87,1]]
		}
	})

	R3last = [100,66.666,87,0];
}
function R3_MID(beat, dur) {
	if (dur != dur) {dur = 0.25};
	
	_customEvents.push({
	_time: beat,
	_type: "AnimateTrack",
	_data: {
		_track: "R3",
		_duration: dur,
		_position: [R3last,[100,33.333,87,1]]
		}
	})

	R3last = [100,33.333,87,0];
}
function R3_BTM(beat, dur) {
	if (dur != dur) {dur = 0.25};	
	_customEvents.push({
	_time: beat,
	_type: "AnimateTrack",
	_data: {
		_track: "R3",
		_duration: dur,
		_position: [R3last,[100,0,87,1]]
		}
	})
	R3last = [100,0,87,0];
}




function doL() {
  filterednotes = lightNotes._notes.filter(n=> n._type == 0 && n._lineLayer == 1)	// left
  filterednotes.forEach(note => {
	  if (note._lineIndex == 0) {
		  if (note._cutDirection == 0) {L3_TOP(note._time, parseFloat(note._customData._track))};
		  if (note._cutDirection == 8) {L3_MID(note._time, parseFloat(note._customData._track))};
		  if (note._cutDirection == 1) {L3_BTM(note._time, parseFloat(note._customData._track))};}
	  if (note._lineIndex == 1) {
		  if (note._cutDirection == 0) {L2_TOP(note._time, parseFloat(note._customData._track))};
		  if (note._cutDirection == 8) {L2_MID(note._time, parseFloat(note._customData._track))};
		  if (note._cutDirection == 1) {L2_BTM(note._time, parseFloat(note._customData._track))};}
	  if (note._lineIndex == 2) {
		  if (note._cutDirection == 0) {L1_TOP(note._time, parseFloat(note._customData._track))};
		  if (note._cutDirection == 8) {L1_MID(note._time, parseFloat(note._customData._track))};
		  if (note._cutDirection == 1) {L1_BTM(note._time, parseFloat(note._customData._track))};}
	  if (note._lineIndex == 3) {
		  if (note._cutDirection == 0) {L0_TOP(note._time, parseFloat(note._customData._track))};
		  if (note._cutDirection == 8) {L0_MID(note._time, parseFloat(note._customData._track))};
		  if (note._cutDirection == 1) {L0_BTM(note._time, parseFloat(note._customData._track))};
		  if (note._cutDirection == 5) {
			  L1_Jump(note._time, 1.5);
			  L2_Jump(note._time+0.25, 1.5);
			  L3_Jump(note._time+0.5, 1.5);
			  };
		  }
  });
}

function doR() {
  filterednotes = lightNotes._notes.filter(n=> n._type == 1 && n._lineLayer == 0)	// right
  //cl(filterednotes);
  filterednotes.forEach(note => {
	  if (note._lineIndex == 3) {
		  //cl(note._cutDirection);
		  if (note._cutDirection == 0) {R3_TOP(note._time, parseFloat(note._customData._track))};
		  if (note._cutDirection == 8) {R3_MID(note._time, parseFloat(note._customData._track))};
		  if (note._cutDirection == 1) {R3_BTM(note._time, parseFloat(note._customData._track))};}
	  if (note._lineIndex == 2) {
		  if (note._cutDirection == 0) {R2_TOP(note._time, parseFloat(note._customData._track))};
		  if (note._cutDirection == 8) {R2_MID(note._time, parseFloat(note._customData._track))};
		  if (note._cutDirection == 1) {R2_BTM(note._time, parseFloat(note._customData._track))};}
	  if (note._lineIndex == 1) {
		  if (note._cutDirection == 0) {R1_TOP(note._time, parseFloat(note._customData._track))};
		  if (note._cutDirection == 8) {R1_MID(note._time, parseFloat(note._customData._track))};
		  if (note._cutDirection == 1) {R1_BTM(note._time, parseFloat(note._customData._track))};}
	  if (note._lineIndex == 0) {
		  if (note._cutDirection == 0) {R0_TOP(note._time, parseFloat(note._customData._track))};
		  if (note._cutDirection == 8) {R0_MID(note._time, parseFloat(note._customData._track))};
		  if (note._cutDirection == 1) {R0_BTM(note._time, parseFloat(note._customData._track))};
		  if (note._cutDirection == 5) {
			  R1_Jump(note._time, 1.5);
			  R2_Jump(note._time+0.25, 1.5);
			  R3_Jump(note._time+0.5, 1.5);
			  };
		  }
  });
}

// --------------------------------------------------------------------------------------------------------------------------------


const jiggle = [107,111,119.25,121.75,123.5,125.5,299,303,311.25,313.75,315.5,317.5];

jiggle.forEach (x => {
_customEvents.push (
	{	_time: x,
		_type: "AnimateTrack",
		_data: {
			_track: ["L2laser","L3laser","R2laser","R3laser"],
			_duration: 1,
			_scale: [[1,1,1,0],[5,1,1,0.1],[1,1,1,0.2],[5,1,1,0.3],[1,1,1,0.4],[5,1,1,0.5],[1,1,1,0.6],[5,1,1,0.7],[1,1,1,0.8],[5,1,1,0.9],[1,1,1,1]]}})
});

const smallLaser = [0,191,420];
smallLaser.forEach (x => {
_customEvents.push (
	{	_time: x,
		_type: "AnimateTrack",
		_data: {
			_track: ["L1laser","L2laser","L3laser","R1laser","R2laser","R3laser"],
			_duration: 4,
			_scale: [[1,1,1,0],[0.5,0.5,1,1]]}})
});

const bigLaser = [107,299];
bigLaser.forEach (x => {
_customEvents.push (
	{	_time: x,
		_type: "AnimateTrack",
		_data: {
			_track: ["L1laser","L2laser","L3laser","R1laser","R2laser","R3laser"],
			_duration: 4,
			_scale: [[1,1,1,0],[0.5,0.5,1,1]]}})
});


// --------------------------------------------------------------------------------------------------------------

// model2note
function modelToNoteL (beat, endBeat, NJS, NJSOffset) {

  filterednotes = importNotes._notes.filter(n=> n._time >= beat && n._time < endBeat && n._type == 0)
  filterednotes.forEach(note => {
  //if (note._customData._track == "modelNote") {
   note._customData = {}
   note._customData._noteJumpMovementSpeed = NJS;
   note._customData._noteJumpStartBeatOffset = NJSOffset;
   note._customData._disableSpawnEffect = true;
   note._customData._disableNoteLook = true;
   note._customData._disableNoteGravity = true;
   note._customData._track = "arrow"
   note._customData._animation = {}
   note._customData._animation._dissolve = [[0,0]];

   noodlesL.forEach(noodz => {
	noodz._customData._animation._position = noodz._customData._animation._definitePosition;
	var noof = copy(noodz);
	noof._time = note._time;
	noof._lineIndex = note._lineIndex;
	noof._lineLayer = note._lineLayer;
	noof._type = note._type;
	noof._cutDirection = 1;
	noof._customData._track = "noodz";
	noof._customData._fake = true;
	//noof._customData._interactable = false;
	delete noof._customData._animation._definitePosition;
	noof._customData._animation._dissolve = [[1,0],[1,0.45],[0,0.5]];
	noof._customData._animation._dissolveArrow = [[0,0]];
	noof._customData._noteJumpMovementSpeed = NJS;
	noof._customData._noteJumpStartBeatOffset = NJSOffset;
	noof._customData._disableSpawnEffect = true;
	noof._customData._disableNoteLook = true;
	noof._customData._disableNoteGravity = true;
	importNotes._notes.push(noof);
   });
 // }
  });
}


function modelToNoteR (beat, endBeat, NJS, NJSOffset) {

  filterednotes = importNotes._notes.filter(n=> n._time >= beat && n._time < endBeat && n._type == 1)
  filterednotes.forEach(note => {
  //if (note._customData._track == "modelNote") {
   note._customData = {}
   note._customData._noteJumpMovementSpeed = NJS;
   note._customData._noteJumpStartBeatOffset = NJSOffset;
   note._customData._disableSpawnEffect = true;
   note._customData._disableNoteLook = true;
   note._customData._disableNoteGravity = true;
   note._customData._track = "arrow"
   note._customData._animation = {}
   note._customData._animation._dissolve = [[0,0]];

   noodlesR.forEach(noodz => {
	noodz._customData._animation._position = noodz._customData._animation._definitePosition;
	var noof = copy(noodz);
	noof._time = note._time;
	noof._lineIndex = note._lineIndex;
	noof._lineLayer = note._lineLayer;
	noof._type = note._type;
	noof._cutDirection = 1;
	noof._customData._track = "noodz";
	noof._customData._fake = true;
	//noof._customData._interactable = false;
	delete noof._customData._animation._definitePosition;
	noof._customData._animation._dissolve = [[1,0],[1,0.45],[0,0.5]];
	noof._customData._animation._dissolveArrow = [[0,0]];
	noof._customData._noteJumpMovementSpeed = NJS;
	noof._customData._noteJumpStartBeatOffset = NJSOffset;
	noof._customData._disableSpawnEffect = true;
	noof._customData._disableNoteLook = true;
	noof._customData._disableNoteGravity = true;
	importNotes._notes.push(noof);
   });
 // }
  });
}


// --------------------------------------------------------------------------------------------------------------------------------

fogg();

doL();
doR();


addEnv("environment");

modelToNoteL (1,421,16,-0.2);
modelToNoteR (1,421,16,-0.2);

map._notes = map._notes.filter(x => (x._customData && x._customData._track !== "environment"));
map._notes = map._notes.filter(x => (x._customData && x._customData._track !== "model2noteL"));
map._notes = map._notes.filter(x => (x._customData && x._customData._track !== "model2noteR"));

map._notes = map._notes.concat(importNotes._notes);


// --------------------------------------------------------------------------------------------------------------------------------

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

_customEvents.sort((a, b) => a._time - b._time)



fs.writeFileSync(mapOutput, JSON.stringify(map, null, 0).replaceAll('\}\,\{','},\r{').replaceAll('\"_events\":[','\r\"_events\":[\r').replaceAll('\"_customEvents\":[','\r\"_customEvents\":[\r').replaceAll('\"_notes\":[','\r\"_notes\":[\r').replaceAll('\"_obstacles\":[','\r\"_obstacles\":[\r').replaceAll('\"_waypoints\":[','\r\"_waypoints\":[\r').replaceAll('\"_environment\":[','\r\"_environment\":[\r'));