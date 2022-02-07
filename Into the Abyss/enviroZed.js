//change as required
const mapInput = "D:\\Games\\SteamLibrary\\steamapps\\common\\Beat Saber\\Beat Saber_Data\\CustomWIPLevels\\Zed not yet ded\\NormalStandard.dat"
const mapOutput = "D:\\Games\\SteamLibrary\\steamapps\\common\\Beat Saber\\Beat Saber_Data\\CustomWIPLevels\\Zed not yet ded\\EasyStandard.dat"

const fs = require("fs");
const three = require("three");
let map = JSON.parse(fs.readFileSync(mapInput));
const pillarToNoodleUnits = 0.1495;

const _notes = map._notes;

/*

NOTE: scale conversion below is for  -- Billie Env --
NOTE: must export dae from blender after running model origin script is blender
NOTE: any animations should be created AFTER running origin script, otherwise models will have incorrect offset in game and be misaligned

(original script by Swifter)
forked by wobbleorange to add animatetrack

Add the following to your SW script:
0:Run
  javascript: Name of script file here. (E.G. javascript:script.js)
  runbefore: false
  refreshonsave: true

0:ModelToWall
  path: Name of model file here. (E.G. path:model.dae)
  track: Name of track here (to be used in the functions below)
  type:3 

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



//main, with or without anim
function modelImport(track, envId, aniTime, aniDur) {
	let count = 0
  map._notes.forEach(x => {
    if (x._customData && x._customData._track == track) {
		count=count+1;

        var y = copy(x);

        var pillarPos = y._customData._animation._definitePosition[0];
        var pillarRot = y._customData._animation._localRotation[0];
        var pillarScale = y._customData._animation._scale[0];

        pillarPos.pop();
        pillarRot.pop();
        pillarScale.pop();

        var offset = vectorFromRotation(pillarRot, pillarScale[1] / 2 * 0.87);

        pillarScale[0] *= pillarToNoodleUnits * 36;
        pillarScale[1] *= pillarToNoodleUnits * 36;
        pillarScale[2] *= pillarToNoodleUnits * 0.0825;

        pillarPos[1] += 0.09;
        pillarPos[2] += 0.65 * (1 / 0.6);

        pillarPos[0] += offset[0];
        pillarPos[1] += offset[1];
        pillarPos[2] += offset[2];

        map._customData._environment.push({
            _id: envId,
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

			x._customData._animation._scale.forEach(array => array[0]*=(pillarToNoodleUnits*36));
			x._customData._animation._scale.forEach(array => array[1]*=(pillarToNoodleUnits*36));
			x._customData._animation._scale.forEach(array => array[2]*=(pillarToNoodleUnits*0.0825));

			x._customData._animation._definitePosition.forEach(array => array[0]+=offset[0]);
			x._customData._animation._definitePosition.forEach(array => array[1]+=offset[1]);
			x._customData._animation._definitePosition.forEach(array => array[2]+=offset[2]);
			//x._customData._animation._definitePosition[0] = pillarPos; // to correct anim offset?hmmmm to investigate
			
			//reduce duplicate data points
			//console.log("posi old long " + x._customData._animation._definitePosition.length);
			xlong = x._customData._animation._definitePosition.length - 1;
			for (let xtime = 1; xtime < xlong; ) {
				if (x._customData._animation._definitePosition[xtime][0] == x._customData._animation._definitePosition[xtime-1][0] && 
				    x._customData._animation._definitePosition[xtime][1] == x._customData._animation._definitePosition[xtime-1][1] &&
					x._customData._animation._definitePosition[xtime][2] == x._customData._animation._definitePosition[xtime-1][2] &&
					x._customData._animation._definitePosition[xtime][0] == x._customData._animation._definitePosition[xtime+1][0] && 
				    x._customData._animation._definitePosition[xtime][1] == x._customData._animation._definitePosition[xtime+1][1] &&
					x._customData._animation._definitePosition[xtime][2] == x._customData._animation._definitePosition[xtime+1][2])
					{
					x._customData._animation._definitePosition.splice(xtime,1);
					xlong--;
				} else {xtime++}
			}
			//console.log("posi new long " + x._customData._animation._definitePosition.length);

			//console.log("scale old long " + x._customData._animation._scale.length);
			xlong = x._customData._animation._scale.length - 1;
			for (let xtime = 1; xtime < xlong; ) {
				if (x._customData._animation._scale[xtime][0] == x._customData._animation._scale[xtime-1][0] && 
				    x._customData._animation._scale[xtime][1] == x._customData._animation._scale[xtime-1][1] &&
					x._customData._animation._scale[xtime][2] == x._customData._animation._scale[xtime-1][2] &&
					x._customData._animation._scale[xtime][0] == x._customData._animation._scale[xtime+1][0] && 
				    x._customData._animation._scale[xtime][1] == x._customData._animation._scale[xtime+1][1] &&
					x._customData._animation._scale[xtime][2] == x._customData._animation._scale[xtime+1][2])
					{
					x._customData._animation._scale.splice(xtime,1);
					xlong--;
				} else {xtime++}
			}
			//console.log("scale new long " + x._customData._animation._scale.length);


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

// animation import only (must have previously used main)
function animImport(track, envId, aniTime, aniDur) {
	let count = 0
  map._notes.forEach(x => {
    if (x._customData && x._customData._track == track+"_fly") {
		count=count+1;

        var y = copy(x);

        var pillarPos = y._customData._animation._definitePosition[0];
        var pillarRot = y._customData._animation._localRotation[0];
        var pillarScale = y._customData._animation._scale[0];

        pillarPos.pop();
        pillarRot.pop();
        pillarScale.pop();

        var offset = vectorFromRotation(pillarRot, pillarScale[1] / 2 * 0.87);

        pillarScale[0] *= pillarToNoodleUnits * 36;
        pillarScale[1] *= pillarToNoodleUnits * 36;
        pillarScale[2] *= pillarToNoodleUnits * 0.0825;

        pillarPos[1] += 0.09;
        pillarPos[2] += 0.65 * (1 / 0.6);

        pillarPos[0] += offset[0];
        pillarPos[1] += offset[1];
        pillarPos[2] += offset[2];



		//-- animate track ----------

		if (x._customData._animation._definitePosition[1] !== undefined || x._customData._animation._localRotation[1] !== undefined || x._customData._animation._scale[1] !== undefined) {
			console.log("has animation")

			x._customData._animation._scale.forEach(array => array[0]*=(pillarToNoodleUnits*36));
			x._customData._animation._scale.forEach(array => array[1]*=(pillarToNoodleUnits*36));
			x._customData._animation._scale.forEach(array => array[2]*=(pillarToNoodleUnits*0.0825));

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
					_position: x._customData._animation._definitePosition,
					_rotation: x._customData._animation._localRotation,
					_scale: x._customData._animation._scale
					}
				})
			}

    }
	
  });

}


//("track", "env Id to use", time, duration)
modelImport("walls", "LeftFarRail1$", 164,1);
modelImport("right_wall", "LeftFarRail1$", 97.5,9);
modelImport("left_wall", "LeftFarRail1$", 114,9);

animImport("right_wall", "LeftFarRail1$", 163,1);
animImport("left_wall", "LeftFarRail1$", 163,1);

modelImport("mountains", "LeftFarRail2$", 163,1);
animImport("mountains", "LeftFarRail2$", 230,1);

modelImport("ground", "LeftFarRail1$", 163,1);
animImport("ground", "LeftFarRail1$", 229,70);

modelImport("abyss", "LeftFarRail1$", 290,5);



// there might be a better way to filter out all the model notes below at the end, like this I can see each easily

map._notes = map._notes.filter(x => (x._customData && x._customData._track !== "walls"));
map._notes = map._notes.filter(x => (x._customData && x._customData._track !== "right_wall"));
map._notes = map._notes.filter(x => (x._customData && x._customData._track !== "left_wall"));
map._notes = map._notes.filter(x => (x._customData && x._customData._track !== "right_wall_fly"));
map._notes = map._notes.filter(x => (x._customData && x._customData._track !== "left_wall_fly"));
map._notes = map._notes.filter(x => (x._customData && x._customData._track !== "mountains"));
map._notes = map._notes.filter(x => (x._customData && x._customData._track !== "mountains_fly"));
map._notes = map._notes.filter(x => (x._customData && x._customData._track !== "ground"));
map._notes = map._notes.filter(x => (x._customData && x._customData._track !== "ground_fly"));
map._notes = map._notes.filter(x => (x._customData && x._customData._track !== "abyss"));
fs.writeFileSync(mapOutput, JSON.stringify(map, null, 0));
