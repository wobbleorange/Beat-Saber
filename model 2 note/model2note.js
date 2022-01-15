const trackName = "model2note";
const mapInput = "D:\\Games\\SteamLibrary\\steamapps\\common\\Beat Saber\\Beat Saber_Data\\CustomWIPLevels\\Noodle Testing\\NormalStandard.dat"
const mapOutput = "D:\\Games\\SteamLibrary\\steamapps\\common\\Beat Saber\\Beat Saber_Data\\CustomWIPLevels\\Noodle Testing\\ExpertStandard.dat"

const fs = require("fs");
const three = require("three");
let map = JSON.parse(fs.readFileSync(mapInput));

const _notes = map._notes;
const noodles = _notes.filter(nyoom=> nyoom._customData && nyoom._customData._track == trackName)
    let noof = JSON.parse(JSON.stringify(noodles));


/*
Made from a rework of environment script by Swifter

Add the following to your SW script: (NOTE - ModelToWall does not need to be used for the hollow or star functions.)
0:Run
  javascript: Name of script file here, ie model2note.js)
  runbefore: false
  refreshonsave: true
0:ModelToWall
  path: Name of model file here. (E.G. path:model.dae)
  track: Name of track here. Must match "trackName" constant from this script, ie model2note
  type:3
  interactable:false
  fake:true
This should run this whole script with node from SW on save of the JS script or the SW script.

*/



function copy(obj) {
    if (typeof obj != 'object') return obj;

    var newObj = Array.isArray(obj) ? [] : {};

    for (const key in obj) {
        newObj[key] = copy(obj[key]);
    }
    return newObj
}


// hollow note
function hollowNote (beat, endBeat, NJS, NJSOffset) {
  filterednotes = _notes.filter(n=> n._time >= beat && n._time < endBeat && n._type !== 3)
  filterednotes.forEach(note => {
  //if (note._customData._track == "hollowNote") {
   note._customData = {}
   note._customData._noteJumpMovementSpeed = NJS;
   note._customData._noteJumpStartBeatOffset = NJSOffset;
   note._customData._disableSpawnEffect = true;
   note._customData._disableNoteLook = true;
   note._customData._disableNoteGravity = true;
   note._customData._animation = {}
   note._customData._animation._dissolve = [[0,0]]
   //note._customData._animation._rotation = [[-10,0,0,0],[0,0,0,0.25]];
    // normal or angle note
	if ([0,1,2,3,8].some(x => note._cutDirection == x)) {
		// 1
		let notef1 = JSON.parse(JSON.stringify(note));
		notef1._customData = {}
		notef1._customData._disableSpawnEffect = true;
		notef1._customData._disableNoteLook = true;
		notef1._customData._disableNoteGravity = true;
		notef1._customData._fake = true;
		notef1._customData._interactable = false;
		notef1._time
		notef1._customData._animation = {}
		notef1._customData._animation._scale = [[1,0.05,1,0]];
		notef1._customData._animation._position = [[0,0.4,0,0]];
		notef1._customData._animation._dissolve = [[1,0]]
		notef1._customData._animation._dissolveArrow = [[0,0]]
		//notef1._customData._animation._rotation = [[-10,0,0,0],[0,0,0,0.25]];
		//notef1._customData._animation._color = [[1,1,1,1,0]]
		notef1._customData._noteJumpMovementSpeed = NJS;
		notef1._customData._noteJumpStartBeatOffset = NJSOffset;
		_notes.push(notef1);
		// 2
		let notef2 = JSON.parse(JSON.stringify(note));
		notef2._customData = {}
		notef2._customData._disableSpawnEffect = true;
		notef2._customData._disableNoteLook = true;
		notef2._customData._disableNoteGravity = true;
		notef2._customData._fake = true;
		notef2._customData._interactable = false;
		notef2._time
		notef2._customData._animation = {}
		notef2._customData._animation._scale = [[1,0.05,1,0]];
		notef2._customData._animation._position = [[0,-0.4,0,0]];
		notef2._customData._animation._dissolve = [[1,0]]
		notef2._customData._animation._dissolveArrow = [[0,0]]
		//notef2._customData._animation._rotation = [[-10,0,0,0],[0,0,0,0.25]];
		//notef2._customData._animation._color = [[1,1,1,1,0]]
		notef2._customData._noteJumpMovementSpeed = NJS;
		notef2._customData._noteJumpStartBeatOffset = NJSOffset;
		_notes.push(notef2);
		// 3
		let notef3 = JSON.parse(JSON.stringify(note));
		notef3._customData = {}
		notef3._customData._disableSpawnEffect = true;
		notef3._customData._disableNoteLook = true;
		notef3._customData._disableNoteGravity = true;
		notef3._customData._fake = true;
		notef3._customData._interactable = false;
		notef3._time
		notef3._customData._animation = {}
		notef3._customData._animation._scale = [[0.05,1,1,0]];
		notef3._customData._animation._position = [[-0.4,0,0,0]];
		notef3._customData._animation._dissolve = [[1,0]]
		notef3._customData._animation._dissolveArrow = [[0,0]]
		//notef3._customData._animation._rotation = [[-10,0,0,0],[0,0,0,0.25]];
		//notef3._customData._animation._color = [[1,1,1,1,0]]
		notef3._customData._noteJumpMovementSpeed = NJS;
		notef3._customData._noteJumpStartBeatOffset = NJSOffset;
		_notes.push(notef3);
		// 4
		let notef4 = JSON.parse(JSON.stringify(note));
		notef4._customData = {}
		notef4._customData._disableSpawnEffect = true;
		notef4._customData._disableNoteLook = true;
		notef4._customData._disableNoteGravity = true;
		notef4._customData._fake = true;
		notef4._customData._interactable = false;
		notef4._time
		notef4._customData._animation = {}
		notef4._customData._animation._scale = [[0.05,1,1,0]];
		notef4._customData._animation._position = [[0.4,0,0,0]];
		notef4._customData._animation._dissolve = [[1,0]]
		notef4._customData._animation._dissolveArrow = [[0,0]]
		//notef4._customData._animation._rotation = [[-10,0,0,0],[0,0,0,0.25]];
		//notef4._customData._animation._color = [[1,1,1,1,0]]
		notef4._customData._noteJumpMovementSpeed = NJS;
		notef4._customData._noteJumpStartBeatOffset = NJSOffset;
		_notes.push(notef4);
	}
	else {
		// 1
		let notef1 = JSON.parse(JSON.stringify(note));
		notef1._customData = {}
		notef1._customData._disableSpawnEffect = true;
		notef1._customData._disableNoteLook = true;
		notef1._customData._disableNoteGravity = true;
		notef1._customData._fake = true;
		notef1._customData._interactable = false;
		notef1._time
		notef1._customData._animation = {}
		notef1._customData._animation._scale = [[0.78,0.05,1,0]];
		notef1._customData._animation._position = [[0.28243,0.282843,0,0]];
		notef1._customData._animation._localRotation = [[0,0,-45,0]]
		notef1._customData._animation._dissolve = [[1,0]]
		notef1._customData._animation._dissolveArrow = [[0,0]]
		//notef1._customData._animation._rotation = [[-10,0,0,0],[0,0,0,0.25]];
		//notef1._customData._animation._color = [[1,1,1,1,0]]
		notef1._customData._noteJumpMovementSpeed = NJS;
		notef1._customData._noteJumpStartBeatOffset = NJSOffset;
		_notes.push(notef1);
		// 2
		let notef2 = JSON.parse(JSON.stringify(note));
		notef2._customData = {}
		notef2._customData._disableSpawnEffect = true;
		notef2._customData._disableNoteLook = true;
		notef2._customData._disableNoteGravity = true;
		notef2._customData._fake = true;
		notef2._customData._interactable = false;
		notef2._time
		notef2._customData._animation = {}
		notef2._customData._animation._scale = [[0.78,0.05,1,0]];
		notef2._customData._animation._position = [[-0.282843,-0.282843,0,0]];
		notef2._customData._animation._localRotation = [[0,0,-45,0]]
		notef2._customData._animation._dissolve = [[1,0]]
		notef2._customData._animation._dissolveArrow = [[0,0]]
		//notef2._customData._animation._rotation = [[-10,0,0,0],[0,0,0,0.25]];
		//notef2._customData._animation._color = [[1,1,1,1,0]]
		notef2._customData._noteJumpMovementSpeed = NJS;
		notef2._customData._noteJumpStartBeatOffset = NJSOffset;
		_notes.push(notef2);
		// 3
		let notef3 = JSON.parse(JSON.stringify(note));
		notef3._customData = {}
		notef3._customData._disableSpawnEffect = true;
		notef3._customData._disableNoteLook = true;
		notef3._customData._disableNoteGravity = true;
		notef3._customData._fake = true;
		notef3._customData._interactable = false;
		notef3._time
		notef3._customData._animation = {}
		notef3._customData._animation._position = [[-0.282843,0.282843,0,0]];
		notef3._customData._animation._localRotation = [[0,0,-45,0]];
		notef3._customData._animation._scale = [[0.05,0.78,1,0]]
		notef3._customData._animation._dissolve = [[1,0]]
		notef3._customData._animation._dissolveArrow = [[0,0]]
		//notef3._customData._animation._rotation = [[-10,0,0,0],[0,0,0,0.25]];
		//notef3._customData._animation._color = [[1,1,1,1,0]]
		notef3._customData._noteJumpMovementSpeed = NJS;
		notef3._customData._noteJumpStartBeatOffset = NJSOffset;
		_notes.push(notef3);
		// 4
		let notef4 = JSON.parse(JSON.stringify(note));
		notef4._customData = {}
		notef4._customData._disableSpawnEffect = true;
		notef4._customData._disableNoteLook = true;
		notef4._customData._disableNoteGravity = true;
		notef4._customData._fake = true;
		notef4._customData._interactable = false;
		notef4._time
		notef4._customData._animation = {}
		notef4._customData._animation._scale = [[0.05,0.78,1,0]];
		notef4._customData._animation._position = [[0.282843,-0.282843,0,0]];
		notef4._customData._animation._localRotation = [[0,0,-45,0]]
		notef4._customData._animation._dissolve = [[1,0]]
		notef4._customData._animation._dissolveArrow = [[0,0]]
		//notef4._customData._animation._rotation = [[-10,0,0,0],[0,0,0,0.25]];
		//notef4._customData._animation._color = [[1,1,1,1,0]]
		notef4._customData._noteJumpMovementSpeed = NJS;
		notef4._customData._noteJumpStartBeatOffset = NJSOffset;
		_notes.push(notef4);
	}
   // }
  });
}


// hollow note morph
function hollowNoteMorph (beat, endBeat, NJS, NJSOffset) {
  filterednotes = _notes.filter(n=> n._time >= beat && n._time < endBeat)
  filterednotes.forEach(note => {
  //if (note._customData._track == "hollowNoteMorph") {
   note._customData = {}
   note._customData._noteJumpMovementSpeed = NJS;
   note._customData._noteJumpStartBeatOffset = NJSOffset;
   note._customData._disableSpawnEffect = true;
   note._customData._disableNoteLook = true;
   note._customData._disableNoteGravity = true;
   note._customData._animation = {}
   note._customData._animation._dissolve = [[0,0]]
   //note._customData._animation._rotation = [[-10,0,0,0],[0,0,0,0.25]];
   //note._customData._animation._color = [[0,0,0,-1,0],[1,0,1,-1,0.44,"easeStep"]]
  	// 1
    let notef1 = JSON.parse(JSON.stringify(note));
    notef1._customData = {}
    notef1._customData._disableSpawnEffect = true;
    notef1._customData._disableNoteLook = true;
    notef1._customData._disableNoteGravity = true;
    notef1._customData._fake = true;
    notef1._customData._interactable = false;
    notef1._time
    notef1._customData._animation = {}
    notef1._customData._animation._scale = [[1,0.05,1,0.3],[1,1,1,0.4]];
    notef1._customData._animation._position = [[0,0.4,0,0.3],[0,0,0,0.4]];
    notef1._customData._animation._dissolve = [[1,0]]
    notef1._customData._animation._dissolveArrow = [[0,0]]
    //notef1._customData._animation._rotation = [[-10,0,0,0],[0,0,0,0.25]];
    //notef1._customData._animation._color = [[1,1,1,1,0]]
    notef1._customData._noteJumpMovementSpeed = NJS;
    notef1._customData._noteJumpStartBeatOffset = NJSOffset;
    _notes.push(notef1);
	// 2
    let notef2 = JSON.parse(JSON.stringify(note));
    notef2._customData = {}
    notef2._customData._disableSpawnEffect = true;
    notef2._customData._disableNoteLook = true;
    notef2._customData._disableNoteGravity = true;
    notef2._customData._fake = true;
    notef2._customData._interactable = false;
    notef2._time
    notef2._customData._animation = {}
    notef2._customData._animation._scale = [[1,0.05,1,0.3],[1,1,1,0.4]];
    notef2._customData._animation._position = [[0.,-0.4,0,0.3],[0,0,0,0.4]];
    notef2._customData._animation._dissolve = [[1,0]]
    notef2._customData._animation._dissolveArrow = [[0,0]]
    //notef2._customData._animation._rotation = [[-10,0,0,0],[0,0,0,0.25]];
    //notef2._customData._animation._color = [[1,1,1,1,0]]
    notef2._customData._noteJumpMovementSpeed = NJS;
    notef2._customData._noteJumpStartBeatOffset = NJSOffset;
    _notes.push(notef2);
	// 3
    let notef3 = JSON.parse(JSON.stringify(note));
    notef3._customData = {}
    notef3._customData._disableSpawnEffect = true;
    notef3._customData._disableNoteLook = true;
    notef3._customData._disableNoteGravity = true;
    notef3._customData._fake = true;
    notef3._customData._interactable = false;
    notef3._time
    notef3._customData._animation = {}
    notef3._customData._animation._scale = [[0.05,1,1,0.3],[1,1,1,0.4]];
    notef3._customData._animation._position = [[-0.4,0,0,0.3],[0,0,0,0.4]];
    notef3._customData._animation._dissolve = [[1,0]]
    notef3._customData._animation._dissolveArrow = [[0,0]]
    //notef3._customData._animation._rotation = [[-10,0,0,0],[0,0,0,0.25]];
    //notef3._customData._animation._color = [[1,1,1,1,0]]
    notef3._customData._noteJumpMovementSpeed = NJS;
    notef3._customData._noteJumpStartBeatOffset = NJSOffset;
    _notes.push(notef3);
	// 4
    let notef4 = JSON.parse(JSON.stringify(note));
    notef4._customData = {}
    notef4._customData._disableSpawnEffect = true;
    notef4._customData._disableNoteLook = true;
    notef4._customData._disableNoteGravity = true;
    notef4._customData._fake = true;
    notef4._customData._interactable = false;
    notef4._time
    notef4._customData._animation = {}
    notef4._customData._animation._scale = [[0.05,1,1,0.3],[1,1,1,0.4]];
    notef4._customData._animation._position = [[0.4,0,0,0.3],[0,0,0,0.4]];
    notef4._customData._animation._dissolve = [[1,0]]
    notef4._customData._animation._dissolveArrow = [[0,0]]
    //notef4._customData._animation._rotation = [[-10,0,0,0],[0,0,0,0.25]];
    //notef4._customData._animation._color = [[1,1,1,1,0]]
    notef4._customData._noteJumpMovementSpeed = NJS;
    notef4._customData._noteJumpStartBeatOffset = NJSOffset;
    _notes.push(notef4);

  // }
  });
}


// red and blue stars
function starNote (beat, endBeat, NJS, NJSOffset) {
	let z0 = -0.36;
	let x1 = 0.097;
	let y1 = 0.5525;
	let x2 = 0.4357;
	let y2 = 0.3065;
	let x3 = 0.499;
	let y3 = 0.1192;
	let x4 = 0.3695;
	let y4 = -0.2791;
	let x5 = 0.2095;
	let y5 = -0.3957;
	let dir = 0;
	let up = 1;
  filterednotes = _notes.filter(n=> n._time >= beat && n._time < endBeat)
  filterednotes.forEach(note => {
  //if (note._customData._track == "starNote") {
    //if (note._cutDirection = 0,2,4,5) {dir = 180; up = -1}
   note._customData = {}
   note._customData._noteJumpMovementSpeed = NJS;
   note._customData._noteJumpStartBeatOffset = NJSOffset;
   note._customData._disableSpawnEffect = true;
   note._customData._disableNoteLook = true;
   note._customData._disableNoteGravity = true;
   note._customData._animation = {}
   note._customData._animation._dissolve = [[0,0]];
  	// 1
    let notef1 = JSON.parse(JSON.stringify(note));
    notef1._customData = {}
    notef1._customData._disableSpawnEffect = true;
    notef1._customData._disableNoteLook = true;
    notef1._customData._disableNoteGravity = true;
    notef1._customData._fake = true;
    notef1._customData._interactable = false;
    notef1._time
    notef1._customData._animation = {}
    notef1._customData._animation._scale = [[0.76,0.1,0.1,0]];
    notef1._customData._animation._localRotation = [[0,0,-72+dir,0]];
    notef1._customData._animation._position = [[x1,y1,z0,0]];
    notef1._customData._animation._dissolve = [[1,0]];
    notef1._customData._animation._dissolveArrow = [[0,0]];
    //notef1._customData._animation._color = [[1,1,1,1,0]]
    notef1._customData._noteJumpMovementSpeed = NJS;
    notef1._customData._noteJumpStartBeatOffset = NJSOffset;
    _notes.push(notef1);
    // }
	// 2
    let notef2 = JSON.parse(JSON.stringify(note));
    notef2._customData = {}
    notef2._customData._disableSpawnEffect = true;
    notef2._customData._disableNoteLook = true;
    notef2._customData._disableNoteGravity = true;
    notef2._customData._fake = true;
    notef2._customData._interactable = false;
    notef2._time
    notef2._customData._animation = {}
    notef2._customData._animation._scale = [[0.76,0.1,0.1,0]];
    notef2._customData._animation._localRotation = [[0,0,0+dir,0]];
    notef2._customData._animation._position = [[x2,y2,z0,0]];
    notef2._customData._animation._dissolve = [[1,0]];
    notef2._customData._animation._dissolveArrow = [[0,0]];
    //notef2._customData._animation._color = [[1,1,1,1,0]]
    notef2._customData._noteJumpMovementSpeed = NJS;
    notef2._customData._noteJumpStartBeatOffset = NJSOffset;
    _notes.push(notef2);
	// 3
    let notef3 = JSON.parse(JSON.stringify(note));
    notef3._customData = {}
    notef3._customData._disableSpawnEffect = true;
    notef3._customData._disableNoteLook = true;
    notef3._customData._disableNoteGravity = true;
    notef3._customData._fake = true;
    notef3._customData._interactable = false;
    notef3._time
    notef3._customData._animation = {}
    notef3._customData._animation._scale = [[0.76,0.1,0.1,0]];
    notef3._customData._animation._localRotation = [[0,0,36+dir,0]];
    notef3._customData._animation._position = [[x3,y3,z0,0]];
    notef3._customData._animation._dissolve = [[1,0]];
    notef3._customData._animation._dissolveArrow = [[0,0]];
    //notef3._customData._animation._color = [[1,1,1,1,0]]
    notef3._customData._noteJumpMovementSpeed = NJS;
    notef3._customData._noteJumpStartBeatOffset = NJSOffset;
    _notes.push(notef3);
	// 4
    let notef4 = JSON.parse(JSON.stringify(note));
    notef4._customData = {}
    notef4._customData._disableSpawnEffect = true;
    notef4._customData._disableNoteLook = true;
    notef4._customData._disableNoteGravity = true;
    notef4._customData._fake = true;
    notef4._customData._interactable = false;
    notef4._time
    notef4._customData._animation = {}
    notef4._customData._animation._scale = [[0.76,0.1,0.1,0]];
    notef4._customData._animation._localRotation = [[0,0,-72+dir,0]];
    notef4._customData._animation._position = [[x4,y4,z0,0]];
    notef4._customData._animation._dissolve = [[1,0]];
    notef4._customData._animation._dissolveArrow = [[0,0]];
    //notef4._customData._animation._color = [[1,1,1,1,0]]
    notef4._customData._noteJumpMovementSpeed = NJS;
    notef4._customData._noteJumpStartBeatOffset = NJSOffset;
    _notes.push(notef4);
	// 5
    let notef5 = JSON.parse(JSON.stringify(note));
    notef5._customData = {}
    notef5._customData._disableSpawnEffect = true;
    notef5._customData._disableNoteLook = true;
    notef5._customData._disableNoteGravity = true;
    notef5._customData._fake = true;
    notef5._customData._interactable = false;
    notef5._time
    notef5._customData._animation = {}
    notef5._customData._animation._scale = [[0.76,0.1,0.1,0]];
    notef5._customData._animation._localRotation = [[0,0,144+dir,0]];
    notef5._customData._animation._position = [[x5,y5,z0,0]];
    notef5._customData._animation._dissolve = [[1,0]];
    notef5._customData._animation._dissolveArrow = [[0,0]];
    //notef5._customData._animation._color = [[1,1,1,1,0]]
    notef5._customData._noteJumpMovementSpeed = NJS;
    notef5._customData._noteJumpStartBeatOffset = NJSOffset;
    _notes.push(notef5);
	// 6
    let notef6 = JSON.parse(JSON.stringify(note));
    notef6._customData = {}
    notef6._customData._disableSpawnEffect = true;
    notef6._customData._disableNoteLook = true;
    notef6._customData._disableNoteGravity = true;
    notef6._customData._fake = true;
    notef6._customData._interactable = false;
    notef6._time
    notef6._customData._animation = {}
    notef6._customData._animation._scale = [[0.76,0.1,0.1,0]];
    notef6._customData._animation._localRotation = [[0,0,-144+dir,0]];
    notef6._customData._animation._position = [[-x5,y5,z0,0]];
    notef6._customData._animation._dissolve = [[1,0]];
    notef6._customData._animation._dissolveArrow = [[0,0]];
    //notef6._customData._animation._color = [[1,1,1,1,0]]
    notef6._customData._noteJumpMovementSpeed = NJS;
    notef6._customData._noteJumpStartBeatOffset = NJSOffset;
    _notes.push(notef6);
	// 7
    let notef7 = JSON.parse(JSON.stringify(note));
    notef7._customData = {}
    notef7._customData._disableSpawnEffect = true;
    notef7._customData._disableNoteLook = true;
    notef7._customData._disableNoteGravity = true;
    notef7._customData._fake = true;
    notef7._customData._interactable = false;
    notef7._time
    notef7._customData._animation = {}
    notef7._customData._animation._scale = [[0.76,0.1,0.1,0]];
    notef7._customData._animation._localRotation = [[0,0,72+dir,0]];
    notef7._customData._animation._position = [[-x4,y4,z0,0]];
    notef7._customData._animation._dissolve = [[1,0]];
    notef7._customData._animation._dissolveArrow = [[0,0]];
    //notef7._customData._animation._color = [[1,1,1,1,0]]
    notef7._customData._noteJumpMovementSpeed = NJS;
    notef7._customData._noteJumpStartBeatOffset = NJSOffset;
    _notes.push(notef7);
	// 8
    let notef8 = JSON.parse(JSON.stringify(note));
    notef8._customData = {}
    notef8._customData._disableSpawnEffect = true;
    notef8._customData._disableNoteLook = true;
    notef8._customData._disableNoteGravity = true;
    notef8._customData._fake = true;
    notef8._customData._interactable = false;
    notef8._time
    notef8._customData._animation = {}
    notef8._customData._animation._scale = [[0.76,0.1,0.1,0]];
    notef8._customData._animation._localRotation = [[0,0,-36+dir,0]];
    notef8._customData._animation._position = [[-x3,y3,z0,0]];
    notef8._customData._animation._dissolve = [[1,0]];
    notef8._customData._animation._dissolveArrow = [[0,0]];
    //notef8._customData._animation._color = [[1,1,1,1,0]]
    notef8._customData._noteJumpMovementSpeed = NJS;
    notef8._customData._noteJumpStartBeatOffset = NJSOffset;
    _notes.push(notef8);
	// 9
    let notef9 = JSON.parse(JSON.stringify(note));
    notef9._customData = {}
    notef9._customData._disableSpawnEffect = true;
    notef9._customData._disableNoteLook = true;
    notef9._customData._disableNoteGravity = true;
    notef9._customData._fake = true;
    notef9._customData._interactable = false;
    notef9._time
    notef9._customData._animation = {}
    notef9._customData._animation._scale = [[0.76,0.1,0.1,0]];
    notef9._customData._animation._localRotation = [[0,0,0+dir,0]];
    notef9._customData._animation._position = [[-x2,y2,z0,0]];
    notef9._customData._animation._dissolve = [[1,0]];
    notef9._customData._animation._dissolveArrow = [[0,0]];
    //notef9._customData._animation._color = [[1,1,1,1,0]]
    notef9._customData._noteJumpMovementSpeed = NJS;
    notef9._customData._noteJumpStartBeatOffset = NJSOffset;
    _notes.push(notef9);
	// 10
    let notef10 = JSON.parse(JSON.stringify(note));
    notef10._customData = {}
    notef10._customData._disableSpawnEffect = true;
    notef10._customData._disableNoteLook = true;
    notef10._customData._disableNoteGravity = true;
    notef10._customData._fake = true;
    notef10._customData._interactable = false;
    notef10._time
    notef10._customData._animation = {}
    notef10._customData._animation._scale = [[0.76,0.1,0.1,0]];
    notef10._customData._animation._localRotation = [[0,0,72+dir,0]];
    notef10._customData._animation._position = [[-x1,y1,z0,0]];
    notef10._customData._animation._dissolve = [[1,0]];
    notef10._customData._animation._dissolveArrow = [[0,0]];
    //notef10._customData._animation._color = [[1,1,1,1,0]]
    notef10._customData._noteJumpMovementSpeed = NJS;
    notef10._customData._noteJumpStartBeatOffset = NJSOffset;
    _notes.push(notef10);
 // }
  });
}


// red and blue stars morph into block
function starNoteMorph (beat, endBeat, NJS, NJSOffset) {
	let z0 = -0.36;
	let x1 = 0.097;
	let y1 = 0.5525;
	let x2 = 0.4357;
	let y2 = 0.3065;
	let x3 = 0.499;
	let y3 = 0.1192;
	let x4 = 0.3695;
	let y4 = -0.2791;
	let x5 = 0.2095;
	let y5 = -0.3957;
	let dir = 0;
	let up = 1;
  filterednotes = _notes.filter(n=> n._time >= beat && n._time < endBeat)
  filterednotes.forEach(note => {
  //if (note._customData._track == "starNoteMorph") {
    //if (note._cutDirection = 0,2,4,5) {dir = 180; up = -1}
   note._customData = {}
   note._customData._noteJumpMovementSpeed = NJS;
   note._customData._noteJumpStartBeatOffset = NJSOffset;
   note._customData._disableSpawnEffect = true;
   note._customData._disableNoteLook = true;
   note._customData._disableNoteGravity = true;
   note._customData._animation = {};
   note._customData._animation._dissolve = [[0,0]];
  	// 1
    let notef1 = JSON.parse(JSON.stringify(note));
    notef1._customData = {};
    notef1._customData._disableSpawnEffect = true;
    notef1._customData._disableNoteLook = true;
    notef1._customData._disableNoteGravity = true;
    notef1._customData._fake = true;
    notef1._customData._interactable = false;
    notef1._time;
    notef1._customData._animation = {};
    notef1._customData._animation._scale = [[0.76,0.1,0.1,0.3],[1,1,1,0.4]];
    notef1._customData._animation._localRotation = [[0,0,-72+dir,0.3],[0,0,0,0.4]];
    notef1._customData._animation._position = [[x1,y1,z0,0.3],[0,0,0,0.4]];
    notef1._customData._animation._dissolve = [[1,0]];
    notef1._customData._animation._dissolveArrow = [[0,0]];
    //notef1._customData._animation._color = [[1,1,1,1,0]]
    notef1._customData._noteJumpMovementSpeed = NJS;
    notef1._customData._noteJumpStartBeatOffset = NJSOffset;
    _notes.push(notef1);
    // }
	// 2
    let notef2 = JSON.parse(JSON.stringify(note));
    notef2._customData = {};
    notef2._customData._disableSpawnEffect = true;
    notef2._customData._disableNoteLook = true;
    notef2._customData._disableNoteGravity = true;
    notef2._customData._fake = true;
    notef2._customData._interactable = false;
    notef2._time;
    notef2._customData._animation = {};
    notef2._customData._animation._scale = [[0.76,0.1,0.1,0.3],[1,1,1,0.4]];
    notef2._customData._animation._localRotation = [[0,0,0+dir,0.3],[0,0,0,0.4]];
    notef2._customData._animation._position = [[x2,y2,z0,0.3],[0,0,0,0.4]];
    notef2._customData._animation._dissolve = [[1,0]];
    notef2._customData._animation._dissolveArrow = [[0,0]];
    //notef2._customData._animation._color = [[1,1,1,1,0]];
    notef2._customData._noteJumpMovementSpeed = NJS;
    notef2._customData._noteJumpStartBeatOffset = NJSOffset;
    _notes.push(notef2);
	// 3
    let notef3 = JSON.parse(JSON.stringify(note));
    notef3._customData = {};
    notef3._customData._disableSpawnEffect = true;
    notef3._customData._disableNoteLook = true;
    notef3._customData._disableNoteGravity = true;
    notef3._customData._fake = true;
    notef3._customData._interactable = false;
    notef3._time;
    notef3._customData._animation = {};
    notef3._customData._animation._scale = [[0.76,0.1,0.1,0.3],[1,1,1,0.4]];
    notef3._customData._animation._localRotation = [[0,0,36+dir,0.3],[0,0,0,0.4]];
    notef3._customData._animation._position = [[x3,y3,z0,0.3],[0,0,0,0.4]];
    notef3._customData._animation._dissolve = [[1,0]];
    notef3._customData._animation._dissolveArrow = [[0,0]];
    //notef3._customData._animation._color = [[1,1,1,1,0]];
    notef3._customData._noteJumpMovementSpeed = NJS;
    notef3._customData._noteJumpStartBeatOffset = NJSOffset;
    _notes.push(notef3);
	// 4
    let notef4 = JSON.parse(JSON.stringify(note));
    notef4._customData = {};
    notef4._customData._disableSpawnEffect = true;
    notef4._customData._disableNoteLook = true;
    notef4._customData._disableNoteGravity = true;
    notef4._customData._fake = true;
    notef4._customData._interactable = false;
    notef4._time;
    notef4._customData._animation = {};
    notef4._customData._animation._scale = [[0.76,0.1,0.1,0.3],[1,1,1,0.4]];
    notef4._customData._animation._localRotation = [[0,0,-72+dir,0.3],[0,0,0,0.4]];
    notef4._customData._animation._position = [[x4,y4,z0,0.3],[0,0,0,0.4]];
    notef4._customData._animation._dissolve = [[1,0]];
    notef4._customData._animation._dissolveArrow = [[0,0]];
    //notef4._customData._animation._color = [[1,1,1,1,0]];
    notef4._customData._noteJumpMovementSpeed = NJS;
    notef4._customData._noteJumpStartBeatOffset = NJSOffset;
    _notes.push(notef4);
	// 5
    let notef5 = JSON.parse(JSON.stringify(note));
    notef5._customData = {};
    notef5._customData._disableSpawnEffect = true;
    notef5._customData._disableNoteLook = true;
    notef5._customData._disableNoteGravity = true;
    notef5._customData._fake = true;
    notef5._customData._interactable = false;
    notef5._time;
    notef5._customData._animation = {};
    notef5._customData._animation._scale = [[0.76,0.1,0.1,0.3],[1,1,1,0.4]];
    notef5._customData._animation._localRotation = [[0,0,144+dir,0.3],[0,0,0,0.4]];
    notef5._customData._animation._position = [[x5,y5,z0,0.3],[0,0,0,0.4]];
    notef5._customData._animation._dissolve = [[1,0]];
    notef5._customData._animation._dissolveArrow = [[0,0]];
    //notef5._customData._animation._color = [[1,1,1,1,0]];
    notef5._customData._noteJumpMovementSpeed = NJS;
    notef5._customData._noteJumpStartBeatOffset = NJSOffset;
    _notes.push(notef5);
	// 6
    let notef6 = JSON.parse(JSON.stringify(note));
    notef6._customData = {};
    notef6._customData._disableSpawnEffect = true;
    notef6._customData._disableNoteLook = true;
    notef6._customData._disableNoteGravity = true;
    notef6._customData._fake = true;
    notef6._customData._interactable = false;
    notef6._time;
    notef6._customData._animation = {};
    notef6._customData._animation._scale = [[0.76,0.1,0.1,0.3],[1,1,1,0.4]];
    notef6._customData._animation._localRotation = [[0,0,-144+dir,0.3],[0,0,0,0.4]];
    notef6._customData._animation._position = [[-x5,y5,z0,0.3],[0,0,0,0.4]];
    notef6._customData._animation._dissolve = [[1,0]];
    notef6._customData._animation._dissolveArrow = [[0,0]];
    //notef6._customData._animation._color = [[1,1,1,1,0]];
    notef6._customData._noteJumpMovementSpeed = NJS;
    notef6._customData._noteJumpStartBeatOffset = NJSOffset;
    _notes.push(notef6);
	// 7
    let notef7 = JSON.parse(JSON.stringify(note));
    notef7._customData = {};
    notef7._customData._disableSpawnEffect = true;
    notef7._customData._disableNoteLook = true;
    notef7._customData._disableNoteGravity = true;
    notef7._customData._fake = true;
    notef7._customData._interactable = false;
    notef7._time;
    notef7._customData._animation = {};
    notef7._customData._animation._scale = [[0.76,0.1,0.1,0.3],[1,1,1,0.4]];
    notef7._customData._animation._localRotation = [[0,0,72+dir,0.3],[0,0,0,0.4]];
    notef7._customData._animation._position = [[-x4,y4,z0,0.3],[0,0,0,0.4]];
    notef7._customData._animation._dissolve = [[1,0]];
    notef7._customData._animation._dissolveArrow = [[0,0]];
    //notef7._customData._animation._color = [[1,1,1,1,0]];
    notef7._customData._noteJumpMovementSpeed = NJS;
    notef7._customData._noteJumpStartBeatOffset = NJSOffset;
    _notes.push(notef7);
	// 8
    let notef8 = JSON.parse(JSON.stringify(note));
    notef8._customData = {};
    notef8._customData._disableSpawnEffect = true;
    notef8._customData._disableNoteLook = true;
    notef8._customData._disableNoteGravity = true;
    notef8._customData._fake = true;
    notef8._customData._interactable = false;
    notef8._time;
    notef8._customData._animation = {};
    notef8._customData._animation._scale = [[0.76,0.1,0.1,0.3],[1,1,1,0.4]];
    notef8._customData._animation._localRotation = [[0,0,-36+dir,0.3],[0,0,0,0.4]];
    notef8._customData._animation._position = [[-x3,y3,z0,0.3],[0,0,0,0.4]];
    notef8._customData._animation._dissolve = [[1,0]];
    notef8._customData._animation._dissolveArrow = [[0,0]];
    //notef8._customData._animation._color = [[1,1,1,1,0]];
    notef8._customData._noteJumpMovementSpeed = NJS;
    notef8._customData._noteJumpStartBeatOffset = NJSOffset;
    _notes.push(notef8);
	// 9
    let notef9 = JSON.parse(JSON.stringify(note));
    notef9._customData = {};
    notef9._customData._disableSpawnEffect = true;
    notef9._customData._disableNoteLook = true;
    notef9._customData._disableNoteGravity = true;
    notef9._customData._fake = true;
    notef9._customData._interactable = false;
    notef9._time;
    notef9._customData._animation = {};
    notef9._customData._animation._scale = [[0.76,0.1,0.1,0.3],[1,1,1,0.4]];
    notef9._customData._animation._localRotation = [[0,0,0+dir,0.3],[0,0,0,0.4]];
    notef9._customData._animation._position = [[-x2,y2,z0,0.3],[0,0,0,0.4]];
    notef9._customData._animation._dissolve = [[1,0]];
    notef9._customData._animation._dissolveArrow = [[0,0]];
    //notef9._customData._animation._color = [[1,1,1,1,0]];
    notef9._customData._noteJumpMovementSpeed = NJS;
    notef9._customData._noteJumpStartBeatOffset = NJSOffset;
    _notes.push(notef9);
	// 10
    let notef10 = JSON.parse(JSON.stringify(note));
    notef10._customData = {};
    notef10._customData._disableSpawnEffect = true;
    notef10._customData._disableNoteLook = true;
    notef10._customData._disableNoteGravity = true;
    notef10._customData._fake = true;
    notef10._customData._interactable = false;
    notef10._time;
    notef10._customData._animation = {};
    notef10._customData._animation._scale = [[0.76,0.1,0.1,0.3],[1,1,1,0.4]];
    notef10._customData._animation._localRotation = [[0,0,72+dir,0.3],[0,0,0,0.4]];
    notef10._customData._animation._position = [[-x1,y1,z0,0.3],[0,0,0,0.4]];
    notef10._customData._animation._dissolve = [[1,0]];
    notef10._customData._animation._dissolveArrow = [[0,0]];
    //notef10._customData._animation._color = [[1,1,1,1,0]];
    notef10._customData._noteJumpMovementSpeed = NJS;
    notef10._customData._noteJumpStartBeatOffset = NJSOffset;
    _notes.push(notef10);
 // }
  });
}


// model2note
function modelToNote (beat, endBeat, NJS, NJSOffset) {

  filterednotes = _notes.filter(n=> n._time >= beat && n._time < endBeat)
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

   noodles.forEach(noodz => {
	noodz._customData._animation._position = noodz._customData._animation._definitePosition
	var noof = copy(noodz);
	noof._time = note._time;
	noof._lineIndex = note._lineIndex;
	noof._lineLayer = note._lineLayer;
	noof._type = note._type;
	noof._cutDirection = 1;
	noof._customData._track = "noodz";
	delete noof._customData._animation._definitePosition;
	noof._customData._animation._dissolve = [[1,0]];
	noof._customData._animation._dissolveArrow = [[0,0]];
	noof._customData._noteJumpMovementSpeed = NJS;
	noof._customData._noteJumpStartBeatOffset = NJSOffset;
	noof._customData._disableSpawnEffect = true;
	noof._customData._disableNoteLook = true;
	noof._customData._disableNoteGravity = true;
	_notes.push(noof);
		//fs.writeFileSync(modelOutput+" noof.dat", JSON.stringify(noof, null, 0));
   });
 // }
  });
}

// model2note morph -- not for use with animated models
function modelToNoteMorph (beat, endBeat, NJS, NJSOffset, mungeTime, mungeEnd) {
 
  filterednotes = _notes.filter(n=> n._time >= beat && n._time < endBeat)
  filterednotes.forEach(note => {
  //if (note._customData._track == "modelNoteMorph") {
   note._customData = {}
   note._customData._noteJumpMovementSpeed = NJS;
   note._customData._noteJumpStartBeatOffset = NJSOffset;
   note._customData._disableSpawnEffect = true;
   note._customData._disableNoteLook = true;
   note._customData._disableNoteGravity = true;
   note._customData._track = "arrow"
   note._customData._animation = {}
   note._customData._animation._dissolve = [[0,0]];


   noodles.forEach(noodz => {
	noodz._customData._animation._position = noodz._customData._animation._definitePosition
	var noof = copy(noodz);
	noof._time = note._time;
	noof._lineIndex = note._lineIndex;
	noof._lineLayer = note._lineLayer;
	noof._type = note._type;
	noof._cutDirection = 1;
	noof._customData._track = "noodz";
	delete noof._customData._animation._definitePosition;
	noof._customData._animation._position[0][3] = mungeTime;
	noof._customData._animation._scale[0][3] = mungeTime;
	noof._customData._animation._localRotation[0][3] = mungeTime;
	noof._customData._animation._position[1] = [0,0,0,mungeEnd];
	noof._customData._animation._scale[1] = [1,1,1,mungeEnd];
	noof._customData._animation._localRotation[1] = [0,0,0,mungeEnd];
	noof._customData._animation._dissolve = [[1,0]];
	noof._customData._animation._dissolveArrow = [[0,0]];
	noof._customData._noteJumpMovementSpeed = NJS;
	noof._customData._noteJumpStartBeatOffset = NJSOffset;
	noof._customData._disableSpawnEffect = true;
	noof._customData._disableNoteLook = true;
	noof._customData._disableNoteGravity = true;
	_notes.push(noof);
		//fs.writeFileSync(modelOutput+" noof.dat", JSON.stringify(noof, null, 0));
   });
  // }
  });
}

//-- note effect funtion(s) to run ---------------------------------------

modelToNote (55,60,14,0)
//modelToNoteMorph (55,90,14,0,0.28,0.4) // not for use with animated models
//starNote(80,90,20,0)
//starNoteMorph(60,80,14,0)
//hollowNote(60,90,14,0)
//hollowNoteMorph(65,90,14,0)

//-----------------------------------------

const jsonP = Math.pow(10, 4)
const sortP = Math.pow(10, 2)
function hahaBall(obj) {
	if (obj)
		for (const key in obj) {
			if (obj[key] == null) {
				delete obj[key]
			} else if (typeof obj[key] === 'object' || Array.isArray(obj[key])) {
				hahaBall(obj[key])
			} else if (typeof obj[key] == 'number') {
				obj[key] = parseFloat(Math.round((obj[key] + Number.EPSILON) * jsonP) / jsonP)
			}
		}
}
hahaBall(map)

map._notes.sort(
	(a, b) =>
		parseFloat(Math.round((a._time + Number.EPSILON) * sortP) / sortP) - parseFloat(Math.round((b._time + Number.EPSILON) * sortP) / sortP) ||
		parseFloat(Math.round((a._lineIndex + Number.EPSILON) * sortP) / sortP) - parseFloat(Math.round((b._lineIndex + Number.EPSILON) * sortP) / sortP) ||
		parseFloat(Math.round((a._lineLayer + Number.EPSILON) * sortP) / sortP) - parseFloat(Math.round((b._lineLayer + Number.EPSILON) * sortP) / sortP)
)


map._notes = map._notes.filter(x => !x._customData || (x._customData && x._customData._track !== trackName));
fs.writeFileSync(mapOutput, JSON.stringify(map, null, 0));

