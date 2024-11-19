// electron/electron.ts
import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import i18n from 'i18next';

let mainWindow: BrowserWindow | null = null;
let testWindows: BrowserWindow[] = []; // Array to store references to all test windows

function getPreloadPath() {
  return path.join(app.getAppPath(), 'build', 'electron', 'preload.js');
}


function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: getPreloadPath(),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (app.isPackaged) {
    // Production: Load `index.html` and navigate to `#/`
    mainWindow.loadFile(path.join(app.getAppPath(), 'dist', 'index.html')).then(() => {
      mainWindow?.webContents.executeJavaScript(`window.location.hash = "/";`);
    });
  } else {
    // Development: Load the Vite dev server URL with `#/`
    mainWindow.loadURL('http://localhost:5173/#/');
    mainWindow.webContents.openDevTools(); // Opens DevTools for debugging
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Close all test windows when the main window is closed
  mainWindow.on('close', () => {
    testWindows.forEach((win) => {
      if (!win.isDestroyed()) win.close();
    });
    testWindows = []; // Clear the array after closing all windows
  });

  mainWindow.webContents.on('did-finish-load', () => {
    console.log("Content loaded in Electron");
  });
  mainWindow.webContents.on('did-fail-load', (_event, errorCode, errorDescription) => {
    console.error("Failed to load:", errorCode, errorDescription);
  });
}

function createTestWindow() {
  const testWindow = new BrowserWindow({
    width: 600,
    height: 400,
    opacity: 0.8,
    alwaysOnTop: true,
    webPreferences: {
      preload: getPreloadPath(),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

    // Load content and pass language after loading
    const initialLanguage = i18n.language; // Capture the initial language
    testWindow.webContents.on('did-finish-load', () => {
      testWindow.webContents.send('update-language', initialLanguage);
    });

  if (app.isPackaged) {
    // Production: Load `index.html` and navigate to `#/test`
    testWindow.loadFile(path.join(app.getAppPath(), 'dist', 'index.html')).then(() => {
      testWindow?.webContents.executeJavaScript(`window.location.hash = "/test";`);
    });
  } else {
    // Development: Load the Vite dev server URL with `#/test`
    testWindow.loadURL('http://localhost:5173/#/test');
  }

  testWindow.setMenuBarVisibility(false);

  testWindow.on('closed', () => {
    testWindows = testWindows.filter((win) => win !== testWindow);
  });

  testWindows.push(testWindow); // Add the new test window to the array
}

// IPC listener for opening the test window
ipcMain.on('open-test-window', () => {
  createTestWindow();
});

// IPC listener for sending coordinates to the main window
ipcMain.on('send-coordinates', (_event, coordinate) => {
  if (mainWindow) {
    // Send the single coordinate to the main window (App.tsx)
    mainWindow.webContents.send('update-coordinates', coordinate);
  }
});

ipcMain.on('set-language', (_event, language) => {
  // When language is updated in main window, propagate to test windows
  testWindows.forEach((win) => {
    if (win && !win.isDestroyed()) {
      win.webContents.send('update-language', language);
    }
  });
});

// Create the main window when the app is ready
app.whenReady().then(createMainWindow);

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
