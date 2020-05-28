// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process./

var ipc = require('electron').ipcRenderer;

ipc.on('menu-event', function(event, id) {
	console.log("------ Renderer menu-event, id = ", id);
	//console.log("Event = ");
	//console.dir(event);
})

function key_down(evt) {
	console.log("------ Renderer Key down");
	//console.dir(evt);
}

function key_up(evt) {
	//console.log("Renderer Key up, evt = ");
	//console.dir(evt);
}

window.addEventListener('keydown', key_down, false);
window.addEventListener('keyup', key_up, false)