const { contextBridge, ipcRenderer } = require('electron')

import pgSelectByCharID from '../Postgres/pgSelectByCharID'
import pgQuery from '../Postgres/pgQuery'

contextBridge.exposeInMainWorld('findAll', {
	characters: async () => {
		const result = await pgQuery(/*SQL*/`
			SELECT * FROM get_all_characters
		`)
		return result
	},
})

contextBridge.exposeInMainWorld('getCharacter', {
	characterSheet: async (characterID: bigint) => {
		const result = await pgQuery(/*SQL*/`
		SELECT * FROM get_character_sheet
		WHERE character_id = $1
		`, [ characterID ])
		return result[0]
	},
	blueprints: (characterID: bigint) => pgSelectByCharID('get_blueprints', characterID),
	contactNotifications: (characterID: bigint) => pgSelectByCharID('contact_notification', characterID),
	corpHistory: (characterID: bigint) => pgSelectByCharID('corporation_history', characterID),
	corpRoles: (characterID: bigint) => pgSelectByCharID('corp_roles', characterID),
	medals: (characterID: bigint) => pgSelectByCharID('medal', characterID),
	notifications: (characterID: bigint) => pgSelectByCharID('notification', characterID),
	standings: (characterID: bigint) => pgSelectByCharID('standings', characterID),
	titles: (characterID: bigint) => pgSelectByCharID('title', characterID),
	clones: (characterID: bigint) => pgSelectByCharID('get_clones', characterID),
	cloneStatus: (characterID: bigint) => pgSelectByCharID('clone_status', characterID),
})

contextBridge.exposeInMainWorld('auth', {
	login: () => ipcRenderer.send('Login'),
})

contextBridge.exposeInMainWorld('listen', {
	notification: (callback: (event: Event, value: string) => void) => ipcRenderer.on('Notification', callback),
})
