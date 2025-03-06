const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // Load your HTML file (make sure the filename matches)
  win.loadFile('TypeWrite.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // On macOS, recreate a window when the dock icon is clicked and no windows are open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  // On macOS, apps usually remain active until the user quits explicitly with Cmd + Q.
  if (process.platform !== 'darwin') app.quit();
});
