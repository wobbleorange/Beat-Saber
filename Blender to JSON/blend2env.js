const mapInput = "NormalStandard_Old.dat"
const mapOutput = "EasyStandard.dat"

const fs = require("fs");

let map = JSON.parse(fs.readFileSync(mapInput));

let cubes = JSON.parse(fs.readFileSync("cube.Locations.json"));	// -- this is the file to import from


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
		
		if (x._customData._material == "pillar") {
			pillarScale[0] *= 0.345;
			pillarScale[1] *= 0.01065;
			pillarScale[2] *= 0.345;
			matID = "\\]PillarPair \\(1\\)\\.\\[\\d+\\]PillarL\\.\\[\\d+\\]Pillar$"
		}
		else if (x._customData._material == "laser") {
			pillarScale[0] *= 12;
			pillarScale[1] *= 0.00048 ;
			pillarScale[2] *= 12;
			matID = "\\]SmallPillarPair\\.\\[\\d+\\]PillarL\\.\\[\\d+\\]LaserL$"
		}
		else if (x._customData._material == "pillarwithlaser") {
			pillarScale[0] *= 0.345;
			pillarScale[1] *= 0.3325;
			pillarScale[2] *= 0.345;
			matID = "\\]SmallPillarPair \\(1\\)\\.\\[\\d+\\]PillarL$"
		}
		else if (x._customData._material == "backcube") {
			pillarScale[0] *= 0.2429375;
			pillarScale[1] *= 5.344625;
			pillarScale[2] *= 2.6723125;
			matID = "BackCube$"
		}
		else if (x._customData._material == "leftfarrail") {
			pillarScale[0] *= 13.455;
			pillarScale[1] *= 13.455;
			pillarScale[2] *= 0.030834375;
			matID = "LeftFarRail1$"
		}


        map._customData._environment.push({
            _id: matID,
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

			if (x._customData._material == "pillar") {
				x._customData._animation._scale.forEach(array => array[0] *= 0.345);
				x._customData._animation._scale.forEach(array => array[1] *= 0.01065);
				x._customData._animation._scale.forEach(array => array[2] *= 0.345);
			}
			else if (x._customData._material == "laser") {
				x._customData._animation._scale.forEach(array => array[0] *= 12);
				x._customData._animation._scale.forEach(array => array[1] *= 0.00048);
				x._customData._animation._scale.forEach(array => array[2] *= 12);
			}
			else if (x._customData._material == "pillarwithlaser") {
				x._customData._animation._scale.forEach(array => array[0] *= 0.345);
				x._customData._animation._scale.forEach(array => array[1] *= 0.3325);
				x._customData._animation._scale.forEach(array => array[2] *= 0.345);
			}
			else if (x._customData._material == "backcube") {
				x._customData._animation._scale.forEach(array => array[0] *= 0.2429375);
				x._customData._animation._scale.forEach(array => array[1] *= 5.344625);
				x._customData._animation._scale.forEach(array => array[2] *= 2.6723125);
			}
			else if (x._customData._material == "leftfarrail") {
				x._customData._animation._scale.forEach(array => array[0] *= 13.455);
				x._customData._animation._scale.forEach(array => array[1] *= 13.455);
				x._customData._animation._scale.forEach(array => array[2] *= 0.030834375);
			}

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

			if (x._customData._material == "pillar") {
				x._customData._animation._scale.forEach(array => array[0] *= 0.345);
				x._customData._animation._scale.forEach(array => array[1] *= 0.01065);
				x._customData._animation._scale.forEach(array => array[2] *= 0.345);
			}
			else if (x._customData._material == "laser") {
				x._customData._animation._scale.forEach(array => array[0] *= 12);
				x._customData._animation._scale.forEach(array => array[1] *= 0.00048);
				x._customData._animation._scale.forEach(array => array[2] *= 12);
			}
			else if (x._customData._material == "pillarwithlaser") {
				x._customData._animation._scale.forEach(array => array[0] *= 0.345);
				x._customData._animation._scale.forEach(array => array[1] *= 0.3325);
				x._customData._animation._scale.forEach(array => array[2] *= 0.345);
			}
			else if (x._customData._material == "backcube") {
				x._customData._animation._scale.forEach(array => array[0] *= 0.2429375);
				x._customData._animation._scale.forEach(array => array[1] *= 5.344625);
				x._customData._animation._scale.forEach(array => array[2] *= 2.6723125);
			}
			else if (x._customData._material == "leftfarrail") {
				x._customData._animation._scale.forEach(array => array[0] *= 13.455);
				x._customData._animation._scale.forEach(array => array[1] *= 13.455);
				x._customData._animation._scale.forEach(array => array[2] *= 0.030834375);
			}

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


addEnv("test");


// ------------------------------------------------------------------------------------------------------



fs.writeFileSync(mapOutput, JSON.stringify(map, null, 0).replaceAll('\}\,\{','},\r{').replaceAll('\"_events\":[','\r\"_events\":[\r').replaceAll('\"_customEvents\":[','\r\"_customEvents\":[\r').replaceAll('\"_notes\":[','\r\"_notes\":[\r').replaceAll('\"_obstacles\":[','\r\"_obstacles\":[\r').replaceAll('\"_waypoints\":[','\r\"_waypoints\":[\r').replaceAll('\"_environment\":[','\r\"_environment\":[\r').replaceAll('\"_bookmarks\":[','\r\"_bookmarks\":[\r').replaceAll('\"_pointDefinitions\":[','\r\"_pointDefinitions\":[\r'));
