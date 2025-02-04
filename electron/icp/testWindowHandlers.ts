import { ipcMain } from "electron";
import { createTestWindow, getTestWindows} from "../windows/testWindow";
import axios from "axios";

//endpoint: 'http://localhost:8080/electronTestEndpoint'

export function setupTestWindowHandlers() {
  ipcMain.on("open-test-window", (_event, language: string) => {
    console.log("IPC Event: open-test-window received");
    createTestWindow(language || "en"); // Pass language or default
  });

  ipcMain.handle('call-test-endpoint', async () => {
    try {
      const response = await axios.get('http://localhost:8080/electronTestEndpoint');
      console.log('Response from backend:', response.data);
      return response.data; // Return the response to the renderer process
    } catch (error) {
      console.error('Error calling backend:', error);
      throw error; // Throw the error to be caught by the renderer
    }
  });

    // ✅ Handle opacity changes from renderer process
    ipcMain.on("set-window-opacity", (_event, opacity: number) => {
      console.log(`IPC Event: set-window-opacity received with value ${opacity}`);
      getTestWindows().forEach((win) => {
        if (!win.isDestroyed()) {
          win.setOpacity(opacity);
        }
      });
    });
}
