"use strict";
// electron/preload.ts
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld('electronAPI', {
    openTestWindow: () => electron_1.ipcRenderer.send('open-test-window'),
    sendCoordinates: (coordinates) => electron_1.ipcRenderer.send('send-coordinates', coordinates),
    onCoordinatesUpdate: (callback) => electron_1.ipcRenderer.on('update-coordinates', (_event, data) => callback(data)),
});
