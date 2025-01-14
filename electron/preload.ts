// electron/preload.ts

import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  openTestWindow: (language: string) => ipcRenderer.send("open-test-window", language),
  sendCoordinates: (coordinates: any) => ipcRenderer.send('send-coordinates', coordinates),
  onCoordinatesUpdate: (callback: (arg0: any) => void) => ipcRenderer.on('update-coordinates', (_event, data) => callback(data)),
  setLanguage: (language: string) => ipcRenderer.send('set-language', language),
  onLanguageUpdate: (callback: (language: string) => void) =>
    ipcRenderer.on('update-language', (_event, language) => callback(language)),
  callTestEndpoint: () => ipcRenderer.invoke('call-test-endpoint')
});
