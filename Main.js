const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');

// Create a function to preload the sounds for quicker access
const preloadSounds = () => {
  const soundFiles = [
    'Key1.mp3', 'Key2.mp3', 'Key3.mp3', 'Key4.mp3', 'space.mp3', 
    'ding.mp3', 'FullKey.mp3', 'backspace.mp3', 'enter-key.mp3'
  ];

  const soundCache = {};

  soundFiles.forEach(file => {
    const soundPath = path.join(__dirname, 'sounds', file);
    if (fs.existsSync(soundPath)) {
      soundCache[file] = new Audio(soundPath);
    }
  });

  return soundCache;
};

// Preload all sounds into memory
const soundCache = preloadSounds();

// Create the main window
function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // Load the HTML file
  win.loadFile('index.html');
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

