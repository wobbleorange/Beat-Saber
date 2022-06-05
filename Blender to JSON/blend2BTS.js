const mapInput = "NormalStandard_Old.dat"
const mapOutput = "EasyStandard.dat"

const fs = require("fs");

let map = JSON.parse(fs.readFileSync(mapInput));

let cubes = JSON.parse(fs.readFileSync("cube.Locations.json"));	// -- this is the file to import from


const pillarToNoodleUnits = 0.1495;

const _notes = map._notes;
const _customEvents = map._customData._customEvents;

if (!map._customData._environment) map._customData._environment = []
if (!map._customData._customEvents) map._customData._customEvents = []

function cl (what) {console.log(what)};

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
  if (aniDur == undefined) {aniDur = 20};
  count = 0

  cubes.forEach(x => {
		count++;

        var pillarPos = copy(x._customData._animation._definitePosition[0]);
        var pillarRot = copy(x._customData._animation._localRotation[0]);
        var pillarScale = copy(x._customData._animation._scale[0]);

        pillarPos.pop();
        pillarRot.pop();
        pillarScale.pop();

        pillarScale[0] *= pillarToNoodleUnits * 2.5;
        pillarScale[1] *= (pillarToNoodleUnits / 32) * 2.5;
        pillarScale[2] *= pillarToNoodleUnits * 2.5;

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

			x._customData._animation._scale.forEach(array => array[0]*=pillarToNoodleUnits *2.5);
			x._customData._animation._scale.forEach(array => array[1]*=(pillarToNoodleUnits / 32) *2.5);
			x._customData._animation._scale.forEach(array => array[2]*=pillarToNoodleUnits *2.5);

				reduceDupli(x._customData._animation._definitePosition);
				reduceDupli(x._customData._animation._localRotation);
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

  });
}



// adds additional animateTrack to existing environment
function addAnimOnly(track, aniTime, aniDur) {
  if (aniTime == undefined) {aniTime = 5};
  if (aniDur == undefined) {aniDur = 20};
  count = 0
  cubes.forEach(x => {
		count++;


		//-- animate track ----------

		if (x._customData._animation._definitePosition[1] !== undefined || x._customData._animation._localRotation[1] !== undefined || x._customData._animation._scale[1] !== undefined) {
			console.log("has animation")

			x._customData._animation._scale.forEach(array => array[0]*=pillarToNoodleUnits *2.5);
			x._customData._animation._scale.forEach(array => array[1]*=(pillarToNoodleUnits / 32) *2.5);
			x._customData._animation._scale.forEach(array => array[2]*=pillarToNoodleUnits *2.5);

				reduceDupli(x._customData._animation._definitePosition);
				reduceDupli(x._customData._animation._localRotation);
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

  });

}

// ------------------------------------------------------------------------------------------------------


addEnv("BTStest");


// ------------------------------------------------------------------------------------------------------



fs.writeFileSync(mapOutput, JSON.stringify(map, null, 0).replaceAll('\}\,\{','},\r{').replaceAll('\"_events\":[','\r\"_events\":[\r').replaceAll('\"_customEvents\":[','\r\"_customEvents\":[\r').replaceAll('\"_notes\":[','\r\"_notes\":[\r').replaceAll('\"_obstacles\":[','\r\"_obstacles\":[\r').replaceAll('\"_waypoints\":[','\r\"_waypoints\":[\r').replaceAll('\"_environment\":[','\r\"_environment\":[\r').replaceAll('\"_bookmarks\":[','\r\"_bookmarks\":[\r').replaceAll('\"_pointDefinitions\":[','\r\"_pointDefinitions\":[\r'));
