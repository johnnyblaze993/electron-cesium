"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// electron/electron.ts
const electron_1 = require("electron");
const path = __importStar(require("path"));
const i18next_1 = __importDefault(require("i18next"));
let mainWindow = null;
let testWindows = []; // Array to store references to all test windows
function getPreloadPath() {
    return path.join(electron_1.app.getAppPath(), 'build', 'electron', 'preload.js');
}
function createMainWindow() {
    mainWindow = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: getPreloadPath(),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });
    if (electron_1.app.isPackaged) {
        // Production: Load `index.html` and navigate to `#/`
        mainWindow.loadFile(path.join(electron_1.app.getAppPath(), 'dist', 'index.html')).then(() => {
            mainWindow?.webContents.executeJavaScript(`window.location.hash = "/";`);
        });
    }
    else {
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
            if (!win.isDestroyed())
                win.close();
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
    const testWindow = new electron_1.BrowserWindow({
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
    const initialLanguage = i18next_1.default.language; // Capture the initial language
    testWindow.webContents.on('did-finish-load', () => {
        testWindow.webContents.send('update-language', initialLanguage);
    });
    if (electron_1.app.isPackaged) {
        // Production: Load `index.html` and navigate to `#/test`
        testWindow.loadFile(path.join(electron_1.app.getAppPath(), 'dist', 'index.html')).then(() => {
            testWindow?.webContents.executeJavaScript(`window.location.hash = "/test";`);
        });
    }
    else {
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
electron_1.ipcMain.on('open-test-window', () => {
    createTestWindow();
});
// IPC listener for sending coordinates to the main window
electron_1.ipcMain.on('send-coordinates', (_event, coordinate) => {
    if (mainWindow) {
        // Send the single coordinate to the main window (App.tsx)
        mainWindow.webContents.send('update-coordinates', coordinate);
    }
});
electron_1.ipcMain.on('set-language', (_event, language) => {
    // When language is updated in main window, propagate to test windows
    testWindows.forEach((win) => {
        if (win && !win.isDestroyed()) {
            win.webContents.send('update-language', language);
        }
    });
});
// Create the main window when the app is ready
electron_1.app.whenReady().then(createMainWindow);
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', () => {
    if (electron_1.BrowserWindow.getAllWindows().length === 0) {
        createMainWindow();
    }
});
