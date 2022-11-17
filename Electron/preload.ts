const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
	setTitle: (title: string) => ipcRenderer.send('set-title', title),
})

export default {}
