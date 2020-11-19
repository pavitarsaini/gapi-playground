const { app, BrowserWindow, ipcRenderer, remote, ipcMain } = require('electron')
var settings = require('user-settings').file('.myAppSettings');
const fs = require('fs');
const fsp = require('fs').promises;
settings.set('username', 'rev087');

function createWindow () {
    // Create the browser window.
    const win = new BrowserWindow({
      width: 1200,
      height: 675,
      //allowRunningInsecureContent: true,
      webPreferences: {
        nodeIntegration: true,
        nativeWindowOpen: true
      }

      
    })
    win.setMenuBarVisibility(false)


    // and load the index.html of the app.
    //win.loadFile('index.html')
    win.loadURL('http://localhost:3000/', {userAgent: 'Chrome'})

    // Open the DevTools.
    win.webContents.openDevTools()
  }
  
  //app.userAgentFallback = app.userAgentFallback.replace('Electron/' + process.versions.electron, '');
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.whenReady().then(createWindow)

  
  //app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');
  
  // Quit when all windows are closed, except on macOS. There, it's common
  // for applications and their menu bar to stay active until the user quits
  // explicitly with Cmd + Q.
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  
  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })

  var appData = process.env.APPDATA;
  function getUid () {
    const data = fs.readFileSync(appData + '/classroom-win10/user.json', 'utf8')
    return data
  }

  ipcMain.on('getUid-message', (event, arg) => {
    console.log(arg)
    event.returnValue = getUid()
  })

  ipcMain.on('fileSave-message', (event, arg) => {
    fs.writeFileSync(appData + '/classroom-win10/user.json', arg , 'utf-8'); 
    event.reply('fileSave-reply', 'Saved')
  })

  /*
  ipcMain.on('fileGet-message', (event, arg) => {
    fsp.readFile(process.env.APPDATA + '/test.json', 'utf-8').then(data => {
      console.log(data);
      event.reply('fileGet-reply', data)
  });  
  })
  */