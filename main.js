// Modules to control application life and create native browser window
const {app, BrowserWindow, Menu, dialog} = require('electron')
const path = require('path')

var _main_win;

function show_about() {
  console.log("About application");
}

function on_menu_item_click(menu_item, window, event) {
    if (menu_item.id === 'about') {
      show_about()
    } else if (menu_item.id === 'quit') {
      app.quit()
    } else if (menu_item.id === 'open_file') {
      show_load_file_dialog()
    }
}

function create_menus() {
  var app_menu = {
    label: "Test App",
    submenu: [
      {
        id: "about",
        label: "About Test App",
        click: on_menu_item_click
      },
      { type: 'separator' },
      {
        id: "open_file",
        accelerator: 'CmdOrCtrl+O',
        label: "Open...",
        click: on_menu_item_click
      },
			{
				label: 'Open Recent',
				role: 'recentDocuments',
				submenu: [
					{ role: 'clearRecentDocuments' }
				]
			},
      { type: 'separator' },
      {
        id: "quit",
        accelerator: 'CmdOrCtrl+Q',
        label: "Quit Test App",
        click: on_menu_item_click
      },
    ],
  };

  var menu_template = [
    app_menu
  ];

	const menu = Menu.buildFromTemplate(menu_template)
	Menu.setApplicationMenu(menu)
}

function show_load_file_dialog() {
  const DIALOG_TXT_FILTER = { name: 'Text file', extensions: ['txt'] }
	const options = {
		title: 'Load scene from file',
		filters: [ DIALOG_TXT_FILTER ]
	}

	let choice = dialog.showOpenDialog(_main_win, options)
	choice.then(result => {
		if (result.canceled !== true) {
			// Get the file path from the dialog.
			const path = result.filePaths[0]
			if (path !== undefined) {
        console.log(`Pretending to open ${path}`)
        app.addRecentDocument(path)
			}
		}
	})
}

function create_main_window () {
  // Create the browser window.
  _main_win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  _main_win.loadFile('index.html')

  create_menus();

  // Open the DevTools.
 // _main_win.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  create_main_window()
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) create_main_window()
  })
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})
