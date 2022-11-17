const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('findAll', {
	characters: () => ipcRenderer.invoke('character'),
	characterSheets: () => ipcRenderer.invoke('characterSheet'),
	handleNotification: (callback: (event: Event, value: string) => void) => ipcRenderer.on('Notification', callback),
})

contextBridge.exposeInMainWorld('auth', {
	login: () => ipcRenderer.send('Login'),
})
