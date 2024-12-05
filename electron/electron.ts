import { app } from "electron";
import { createMainWindow, getMainWindow } from "./windows/mainWindow";
import { closeAllTestWindows } from "./windows/testWindow";
import { setupLanguageHandlers } from "./icp/languageHandlers";
import { setupCoordinateHandlers } from "./icp/coordinateHandlers";
import { setupTestWindowHandlers } from "./icp/testWindowHandlers";

app.whenReady().then(() => {
  console.log("App is ready, creating main window");
  createMainWindow();

  // Setup IPC handlers
  setupLanguageHandlers();
  setupCoordinateHandlers();
  setupTestWindowHandlers();
});

app.on("window-all-closed", () => {
  console.log("All windows closed");
  closeAllTestWindows();
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (!getMainWindow()) {
    console.log("Recreating main window");
    createMainWindow();
  }
});
