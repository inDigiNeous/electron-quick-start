// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process./

var ipc = require('electron').ipcRenderer;

ipc.on('menu-event', function(event, id) {
	console.log("------ Renderer: menu-event, id = ", id);
	if (id === "test_func1") {
		test_func();
	}
})

function test_func() {
	console.log("------ Renderer: test function");
}

function key_down(evt) {
	console.log("------ Renderer: Key down");

	// T
	if (evt.keyCode === 84) {
		test_func();
	}
}

function key_up(evt) {
	console.log("------ Renderer: Key up, evt.keyCode = ", evt.keyCode);
}

window.addEventListener('keydown', key_down, false);
window.addEventListener('keyup', key_up, false)