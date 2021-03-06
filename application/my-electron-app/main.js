

const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    show: false, 
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  win.setIcon(path.join(__dirname, 'img/favicon.ico'));
  win.maximize();
  win.show();
  win.menuBarVisible = false;
  win.loadFile('app.html')
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
