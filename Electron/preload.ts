const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('findAll', {
	characters: () => ipcRenderer.invoke('character'),
	characterSheets: () => ipcRenderer.invoke('characterSheet'),
	handleNotification: (callback: (event: Event, value: string) => void) => ipcRenderer.on('Notification', callback),
})

contextBridge.exposeInMainWorld('getCharacter', {
	titles: (characterID: bigint) => ipcRenderer.invoke('characterTitles', characterID),
	blueprints: (characterID: bigint) => ipcRenderer.invoke('characterBlueprints', characterID),
	contactNotifications: (characterID: bigint) => ipcRenderer.invoke('characterContactNotifications', characterID),
	corpHistory: (characterID: bigint) => ipcRenderer.invoke('characterCorpHistory', characterID),
})

contextBridge.exposeInMainWorld('auth', {
	login: () => ipcRenderer.send('Login'),
})
