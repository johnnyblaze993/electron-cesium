import { ipcMain } from "electron";
import { createTestWindow } from "../windows/testWindow";

export function setupTestWindowHandlers() {
  ipcMain.on("open-test-window", (_event, language: string) => {
    console.log("IPC Event: open-test-window received");
    createTestWindow(language || "en"); // Pass language or default
  });
}
