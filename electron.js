const { app, BrowserWindow } = require('electron');
const path = require('path');

app.disableHardwareAcceleration();

async function createWindow() {
  const isDev = await import('electron-is-dev').then(module => module.default);

  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadURL(
    isDev
      ? 'http://localhost:3000'  // Development URL
      : `file://${path.join(__dirname, '../out/index.html')}`  // Production path to the Next.js build
  );
}

app.on('ready', createWindow);
