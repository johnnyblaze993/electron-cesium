import { BrowserWindow, app } from "electron";
import * as path from "path";

let testWindows: BrowserWindow[] = [];

export function createTestWindow(initialLanguage: string) {
  const testWindow = new BrowserWindow({
    width: 600,
    height: 400,
    opacity: 0.8,
    alwaysOnTop: true,
    webPreferences: {
      preload: path.join(app.getAppPath(), "build", "electron", "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  testWindow.webContents.on("did-finish-load", () => {
    testWindow.webContents.send("update-language", initialLanguage);
  });

  if (app.isPackaged) {
    testWindow
      .loadFile(path.join(app.getAppPath(), "dist", "index.html"))
      .then(() => {
        testWindow?.webContents.executeJavaScript(`window.location.hash = "/test";`);
      });
  } else {
    testWindow.loadURL("http://localhost:5173/#/test");
  }

  testWindow.setMenuBarVisibility(false);

  testWindow.on("closed", () => {
    testWindows = testWindows.filter((win) => win !== testWindow);
  });

  testWindows.push(testWindow);

  return testWindow;
}

export function getTestWindows() {
  return testWindows;
}

export function closeAllTestWindows() {
  testWindows.forEach((win) => {
    if (!win.isDestroyed()) win.close();
  });
  testWindows = [];
}
