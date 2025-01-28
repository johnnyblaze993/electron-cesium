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
  getMatchingFiles: () => ipcRenderer.invoke("get-matching-files"),
  getSimulations: () => ipcRenderer.invoke("get-simulations"), // Fetch simulations
  runSimulationExe: (fileName: any) => ipcRenderer.invoke("run-simulation-exe", fileName), // Run selected simulation
  clearSimOutputFiles: () => ipcRenderer.invoke("clear-sim-output-files"),
  readFile: (fileName: any) => ipcRenderer.invoke("read-file", fileName),

});
