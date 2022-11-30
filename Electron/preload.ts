const { contextBridge, ipcRenderer } = require('electron')

import pgClient from '../postgres/postgresClient'

contextBridge.exposeInMainWorld('findAll', {
	characters: async () => {
		const result = await pgClient.query(`
			SELECT * FROM public."CharacterSheet"
			JOIN public."chrBloodlines" ON public."CharacterSheet"."bloodlineID" = public."chrBloodlines"."bloodlineID"
			JOIN public."chrRaces" ON public."CharacterSheet"."raceID" = public."chrRaces"."raceID"
		`)
		return result.rows
	},
})

contextBridge.exposeInMainWorld('getCharacter', {
	titles: (characterID: bigint) => ipcRenderer.invoke('characterTitles', characterID),
	blueprints: (characterID: bigint) => ipcRenderer.invoke('characterBlueprints', characterID),
	contactNotifications: (characterID: bigint) => ipcRenderer.invoke('characterContactNotifications', characterID),
	corpHistory: (characterID: bigint) => ipcRenderer.invoke('characterCorpHistory', characterID),
	corpRoles: (characterID: bigint) => ipcRenderer.invoke('characterCorpRoles', characterID),
	medals: (characterID: bigint) => ipcRenderer.invoke('characterMedals', characterID),
	notifications: (characterID: bigint) => ipcRenderer.invoke('characterNotifications', characterID),
	standings: (characterID: bigint) => ipcRenderer.invoke('characterStandings', characterID),
})

contextBridge.exposeInMainWorld('auth', {
	login: () => ipcRenderer.send('Login'),
})

contextBridge.exposeInMainWorld('listen', {
	notification: (callback: (event: Event, value: string) => void) => ipcRenderer.on('Notification', callback),
})
