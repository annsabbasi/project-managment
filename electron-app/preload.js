import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
    launchApp: (token) => ipcRenderer.send('launch-app', token),
  });
