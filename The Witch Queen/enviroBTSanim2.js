const mapInput = "D:\\Games\\SteamLibrary\\steamapps\\common\\Beat Saber\\Beat Saber_Data\\CustomWIPLevels\\The Witch Queen\\NormalStandard.dat"
const mapOutput = "D:\\Games\\SteamLibrary\\steamapps\\common\\Beat Saber\\Beat Saber_Data\\CustomWIPLevels\\The Witch Queen\\ExpertStandard.dat"

const fs = require("fs");
const three = require("three");
let map = JSON.parse(fs.readFileSync(mapInput));
const pillarToNoodleUnits = 0.1495;

const _notes = map._notes;



/*
Made by Swifter
Add the following to your SW script:
0:Run
  javascript: Name of script file here. (E.G. javascript:script.js)
  runbefore: false
  refreshonsave: true
0:ModelToWall
  path: Name of model file here. (E.G. path:model.dae)
  track: Name of track here. Must match "trackName" constant from this script. Don't put a space after the colon
  type:3 
This should run this whole script with node from SW on save of the JS script or the SW script.
If anything ain't working then DM me :) Swifter#1243
*/

if (!map._customData._environment) map._customData._environment = []

function vectorFromRotation(vectorRot, length) {
    const deg2rad = Math.PI / 180;
    var mathRot = copy(vectorRot);

    mathRot[0] *= deg2rad;
    mathRot[1] *= deg2rad;
    mathRot[2] *= deg2rad;

    var rotVector = new three.Vector3(0, length, 0).applyEuler(new three.Euler(...mathRot, "YXZ"));
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
			//console.log("old long " + myArray.length);
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
			//console.log("new long " + myArray.length);
}




// add environment with or without an animation
function addEnv(track, aniTime, aniDur) {
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
/* temporary disable
        pillarPos[1] += 0.09;
        pillarPos[2] += 0.65 * (1 / 0.6);
*/
        pillarPos[0] += offset[0];
        pillarPos[1] += offset[1];
        pillarPos[2] += offset[2];

        map._customData._environment.push({
            _id: "\\]PillarPair \\(4\\)\\.\\[0\\]PillarL\\.\\[0\\]Pillar$",
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
			//x._customData._animation._definitePosition[0] = pillarPos; // to correct anim offset?hmmmm


			map._customData._customEvents.push({
				_time: aniTime, // to define as required
				_type: "AnimateTrack",
				_data: {
					_track: track + count,
					_duration: aniDur, // to define as required
					_position: reduceDupli(x._customData._animation._definitePosition),
					_rotation: reduceDupli(x._customData._animation._localRotation),
					_scale: reduceDupli(x._customData._animation._scale)
					}
				})
			}

    }
	
  });
}


// adds additional animateTrack to existing environment
function addAnimOnly(track, aniTime, aniDur) {
  count = 0
  map._notes.forEach(x => {
    if (x._customData && x._customData._track == track+"_anim") {
		count++;

        var y = copy(x);

        var pillarRot = y._customData._animation._localRotation[0];
        var pillarScale = y._customData._animation._scale[0];
         pillarRot.pop();
         pillarScale.pop();

        var offset = vectorFromRotation(pillarRot, pillarScale[1] / 2 * 0.87);

/* temporary disable
        pillarPos[1] += 0.09;
        pillarPos[2] += 0.65 * (1 / 0.6);

        pillarPos[0] += offset[0];
        pillarPos[1] += offset[1];
        pillarPos[2] += offset[2];
*/


		//-- animate track ----------

		if (x._customData._animation._definitePosition[1] !== undefined || x._customData._animation._localRotation[1] !== undefined || x._customData._animation._scale[1] !== undefined) {
			console.log("has animation")

			x._customData._animation._scale.forEach(array => array[0]*=pillarToNoodleUnits);
			x._customData._animation._scale.forEach(array => array[1]*=(pillarToNoodleUnits / 32));
			x._customData._animation._scale.forEach(array => array[2]*=pillarToNoodleUnits);

			x._customData._animation._definitePosition.forEach(array => array[0]+=offset[0]);
			x._customData._animation._definitePosition.forEach(array => array[1]+=offset[1]);
			x._customData._animation._definitePosition.forEach(array => array[2]+=offset[2]);
			//x._customData._animation._definitePosition[0] = pillarPos; // to correct anim offset?hmmmm


			map._customData._customEvents.push({
				_time: aniTime, // to define as required
				_type: "AnimateTrack",
				_data: {
					_track: track + count,
					_duration: aniDur, // to define as required
					_position: reduceDupli(x._customData._animation._definitePosition),
					_rotation: reduceDupli(x._customData._animation._localRotation),
					_scale: reduceDupli(x._customData._animation._scale)
					}
				})
			}

    }
	
  });
  

}



addEnv("witchtrack",2,10);


map._notes = map._notes.filter(x => (x._customData && x._customData._track !== "witchtrack"));




fs.writeFileSync(mapOutput, JSON.stringify(map, null, 0));