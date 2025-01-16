import { ipcMain } from "electron";
import { getMainWindow } from "../windows/mainWindow";

export function setupCoordinateHandlers() {
  ipcMain.on("send-coordinates", (_event, coordinate) => {
    const mainWindow = getMainWindow();
    if (mainWindow) {
      mainWindow.webContents.send("update-coordinates", coordinate);
    }
  });

  ipcMain.on("delete-coordinate", (_event, index: number) => {
    const mainWindow = getMainWindow();
    if (mainWindow) {
      mainWindow.webContents.send("coordinate-deleted", index);
    }
  });
}
