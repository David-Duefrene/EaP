const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
	character: () => ipcRenderer.invoke('character'),
	characterSheet: () => ipcRenderer.invoke('characterSheet'),
	handleNotification: (callback: (event: Event, value: string) => void) => ipcRenderer.on('Notification', callback),
})
