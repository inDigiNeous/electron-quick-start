// Modules to control application life and create native browser window
const {app, BrowserWindow, Menu} = require('electron')
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
    } else {
      console.log("====== Main: event -> renderer");
      _main_win.webContents.send('menu-event', menu_item.id)
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
        id: "test_func1",
        accelerator: 'Ctrl+T',
        label: "Test function 1",
        click: on_menu_item_click
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

function createWindow () {
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
  _main_win.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
