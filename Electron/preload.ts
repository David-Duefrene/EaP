const { contextBridge, ipcRenderer } = require('electron')

import pgClient from '../Postgres/postgresClient'
import pgSelectByCharID from '../Postgres/pgSelectByCharID'

import CorpRole from '../Types/APIResponses/EveOfficial/CorpRoles.types'

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
	blueprints: (characterID: bigint) => pgSelectByCharID('Blueprint', characterID),
	contactNotifications: (characterID: bigint) => pgSelectByCharID('ContactNotification', characterID),
	corpHistory: (characterID: bigint) => pgSelectByCharID('CorpHistory', characterID),
	corpRoles: (characterID: bigint) => pgSelectByCharID('CorpRoles', characterID),
	medals: (characterID: bigint) => pgSelectByCharID('Medal', characterID),
	notifications: (characterID: bigint) => pgSelectByCharID('Notification', characterID),
	standings: (characterID: bigint) => pgSelectByCharID('Standings', characterID),
	titles: (characterID: bigint) => pgSelectByCharID('Title', characterID),
})

contextBridge.exposeInMainWorld('auth', {
	login: () => ipcRenderer.send('Login'),
})

contextBridge.exposeInMainWorld('listen', {
	notification: (callback: (event: Event, value: string) => void) => ipcRenderer.on('Notification', callback),
})
