const { Tray, nativeImage, Menu, ipcMain } = require('electron');
const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

let locked = app.requestSingleInstanceLock()
if (locked) {
    // Server
    require('./server/index')
} else {
    app.quit()
}
    
app.on('second-instance', (event, argv, cwd) => {
    if (mainWindow) {
        if (!mainWindow.isVisible() || mainWindow.isMinimized) {
            mainWindow.show()
            mainWindow.restore()
      }
  }
})

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let windowTray;
const trayMenu = Menu.buildFromTemplate([
    {
        label: 'Open',
        click: ()=>{mainWindow.show()}
    },
    { type: "separator" },
    {role: 'quit'}
])

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        minWidth: 1000,
        minHeight: 750,
        webPreferences:
        {
            nodeIntegration: true,
            // FOR DIST
            devTools: false
        },
        icon: path.join(__dirname, 'icon.ico')
    });


    mainWindow.setMenu(null)

    // and load the index.html of the app.
    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '/../build/index.html'),
        // FOR DIST
        // pathname: path.join(__dirname, 'index.html'),
        
        protocol: 'file:',
        slashes: true
    });
    mainWindow.loadURL(startUrl);
    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    mainWindow.maximize()

    // Tray
    // FOR DIST
    windowTray = new Tray(nativeImage.createFromPath(path.join(__dirname, 'icon.ico')))
    windowTray.setToolTip('Exercise Tracker')
    
    windowTray.setContextMenu(trayMenu)
    windowTray.on('click', () => {
        mainWindow.show()
        windowTray.removeBalloon()
    })

    // Emitted when the window is closed.
    mainWindow.on('close', function (e) {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        e.preventDefault()

        windowTray.displayBalloon({
            iconType: 'info',
            title: 'Exercise Tracker',
            content: 'You can open me again from system tray found at the right section of the taskbar or by clicking the ∧ symbol.'
        })
        e.sender.hide()
    })
}

app.setLoginItemSettings({
    //FOR DIST
    openAtLogin: true
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

app.on('before-quit', () => {
    mainWindow.removeAllListeners('close')
    mainWindow = null
})
 

ipcMain.on('ACTIVE_TIMER', () => {
    mainWindow.setAlwaysOnTop(true)
    mainWindow.setClosable(false)
    mainWindow.setMinimizable(false)
    mainWindow.setMovable(false)
    windowTray.setContextMenu(null)

})

ipcMain.on('STOP_TIMER', () => {
    mainWindow.setAlwaysOnTop(false)
    mainWindow.setClosable(true)
    mainWindow.setMinimizable(true)
    mainWindow.setMovable(true)
    windowTray.setContextMenu(trayMenu)
})