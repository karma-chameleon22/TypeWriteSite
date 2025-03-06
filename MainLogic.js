const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadFile('TypeWrite.html');  // Make sure this matches your HTML filename
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// Handle sound playback requests from the renderer process
ipcMain.on('play-sound', (event, sound) => {
  const soundFile = path.join(__dirname, 'sounds', `${sound}.mp3`);  // Adjust path if needed

  if (fs.existsSync(soundFile)) {
    const audio = new Audio(soundFile);
    audio.play();
  }
});
