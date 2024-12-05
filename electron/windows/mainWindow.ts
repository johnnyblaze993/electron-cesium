import { BrowserWindow, app } from "electron";
import * as path from "path";

let mainWindow: BrowserWindow | null = null;

export function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(app.getAppPath(), "build", "electron", "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (app.isPackaged) {
    mainWindow
      .loadFile(path.join(app.getAppPath(), "dist", "index.html"))
      .then(() => {
        mainWindow?.webContents.executeJavaScript(`window.location.hash = "/";`);
      });
  } else {
    mainWindow.loadURL("http://localhost:5173/#/");
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  mainWindow.webContents.on("did-finish-load", () => {
    console.log("Main window content loaded");
  });

  mainWindow.webContents.on("did-fail-load", (_event, errorCode, errorDescription) => {
    console.error("Main window failed to load:", errorCode, errorDescription);
  });

  return mainWindow;
}

export function getMainWindow() {
  return mainWindow;
}
