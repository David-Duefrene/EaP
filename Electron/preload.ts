const { contextBridge, ipcRenderer } = require('electron')

const { Client } = require('pg')

const pgClient = new Client({
	host: 'localhost',
	port: 5432,
	user: 'postgres',
	password: 'password',
	database: 'DATABASE',
})
pgClient.connect()


contextBridge.exposeInMainWorld('findAll', {
	characters: () => ipcRenderer.invoke('character'),
	characterSheets: () => pgClient.query('SELECT * FROM public."CharacterSheet" JOIN public."chrBloodlines" ON public."CharacterSheet"."bloodlineID" = public."chrBloodlines"."bloodlineID" JOIN public."chrRaces" ON public."CharacterSheet"."raceID" = public."chrRaces"."raceID"'),
	// () => ipcRenderer.invoke('characterSheet'),
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
