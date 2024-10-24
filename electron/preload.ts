// electron/preload.ts

import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  openTestWindow: () => ipcRenderer.send('open-test-window'),
  sendCoordinates: (coordinates: any) => ipcRenderer.send('send-coordinates', coordinates),
  onCoordinatesUpdate: (callback: (arg0: any) => void) => ipcRenderer.on('update-coordinates', (_event, data) => callback(data)),
});
