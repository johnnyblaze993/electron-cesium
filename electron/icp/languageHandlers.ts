import { ipcMain } from "electron";
import { getTestWindows } from "../windows/testWindow";

export function setupLanguageHandlers() {
  ipcMain.on("set-language", (_event, language) => {
    const testWindows = getTestWindows();
    testWindows.forEach((win) => {
      if (win && !win.isDestroyed()) {
        win.webContents.send("update-language", language);
      }
    });
  });
}
