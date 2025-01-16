// electron/preload.ts

import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  openTestWindow: (language: string) => ipcRenderer.send("open-test-window", language),
  sendCoordinates: (coordinates: any) => ipcRenderer.send('send-coordinates', coordinates),
  deleteCoordinate: (index: number) => ipcRenderer.send("delete-coordinate", index),
  onCoordinateDeleted: (callback: (index: number) => void) =>
    ipcRenderer.on("coordinate-deleted", (_event, index) => callback(index)),
  onCoordinatesUpdate: (callback: (arg0: any) => void) => ipcRenderer.on('update-coordinates', (_event, data) => callback(data)),
  setLanguage: (language: string) => ipcRenderer.send('set-language', language),
  onLanguageUpdate: (callback: (language: string) => void) =>
    ipcRenderer.on('update-language', (_event, language) => callback(language)),
  callTestEndpoint: () => ipcRenderer.invoke('call-test-endpoint'),
  runSimulationExe: () => ipcRenderer.invoke("run-simulation-exe"),
  clearSimOutputFiles: () => ipcRenderer.invoke("clear-sim-output-files"),
  getMatchingFiles: async () => {
    console.log("getMatchingFiles called"); // Debugging log
    return ipcRenderer.invoke("get-matching-files");
  },
  readFile: (fileName: any) => ipcRenderer.invoke("read-file", fileName),
});
