import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';

let mainWindow: BrowserWindow | null = null;
let testWindow: BrowserWindow | null = null;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),  // Use preload script here
      contextIsolation: true,  // Enable context isolation for security
      nodeIntegration: false,  // Disable node integration for security
    },
  });

  mainWindow.loadURL('http://localhost:5555');  // Vite dev server

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function createTestWindow() {
  testWindow = new BrowserWindow({
    width: 600,
    height: 400,
    opacity: 0.8,  // Opacity to indicate secondary window
    alwaysOnTop: true,  // Keep the Test window always on top
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // Load the route for the Test component
  testWindow.loadURL('http://localhost:5555/test');  // This loads the /test route

  testWindow.setMenuBarVisibility(false);  // Hide the menu bar

  testWindow.on('closed', () => {
    testWindow = null;
  });
}

app.whenReady().then(createMainWindow);

// Listen for the IPC event to open a new window
ipcMain.on('open-test-window', () => {
  createTestWindow();
});

// Listen for the coordinates sent from Test window
ipcMain.on('send-coordinates', (_event, coordinate) => {
  if (mainWindow) {
    // Send the single coordinate to the main window (App.tsx)
    mainWindow.webContents.send('update-coordinates', coordinate);
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});
