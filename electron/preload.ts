// electron/preload.ts
import { contextBridge, ipcRenderer } from 'electron';

// Expose a safe API to the renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  openTestWindow: () => ipcRenderer.send('open-test-window')
});
