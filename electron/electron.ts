import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';

console.log("Environment:", process.env.NODE_ENV);


let mainWindow: BrowserWindow | null = null;
let testWindows: BrowserWindow[] = [];  // Array to store references to all test windows

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    autoHideMenuBar: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.maximize();

  if (mainWindow) mainWindow.webContents.openDevTools();

  if (process.env.NODE_ENV === 'development') {
    // In development, load from localhost
    mainWindow.loadURL('http://localhost:5555');
    mainWindow.webContents.openDevTools();
  } else {
    // In production, load from the local file
    mainWindow.loadFile(path.join(app.getAppPath(), 'dist', 'index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Close all test windows when the main window is closed
  mainWindow.on('close', () => {
    testWindows.forEach((win) => {
      if (!win.isDestroyed()) win.close();
    });
    testWindows = [];  // Clear the array after closing all windows
  });
}

function createTestWindow() {
  const testWindow = new BrowserWindow({
    width: 600,
    height: 400,
    opacity: 0.8,
    alwaysOnTop: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

   if (process.env.NODE_ENV === 'development') {
    // Load from localhost in development mode
    testWindow.loadURL('http://localhost:5555/test');
  } else {
    // Load from local file in production mode
    testWindow.loadFile(path.join(app.getAppPath(), 'dist', 'test.html'));
  }
  testWindow.setMenuBarVisibility(false);

  testWindow.on('closed', () => {
    testWindows = testWindows.filter((win) => win !== testWindow);
  });

  testWindows.push(testWindow);  // Add the new test window to the array
}

app.whenReady().then(createMainWindow);

// IPC to open a new test window
ipcMain.on('open-test-window', () => {
  createTestWindow();
});

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
