const { contextBridge, ipcRenderer } = require('electron')

import pgSelectByCharID from '../Postgres/pgSelectByCharID'
import pgQuery from '../Postgres/pgQuery'

contextBridge.exposeInMainWorld('findAll', {
	characters: async () => {
		const result = await pgQuery(/*SQL*/`
			SELECT
				character_sheet.character_id,
				character_sheet.birthday,
				character_sheet.description,
				character_sheet.gender,
				character_sheet.name,
				character_sheet.security_status,
				character_sheet.title,
				bloodlines.name AS bloodline_name,
				bloodlines.description AS bloodline_description,
				bloodlines.corporation_id AS bloodline_corporation_id,
				races.name AS race_name,
				races.description AS race_description,
				corporation.name AS corporation,
				alliance.name AS alliance

			FROM character_sheet
					JOIN bloodlines ON character_sheet.bloodline_id = bloodlines.bloodline_id
					JOIN races ON character_sheet.race_id = races.race_id
					JOIN corporation ON character_sheet.corporation_id = corporation.corporation_id
					LEFT JOIN alliance ON character_sheet.alliance_id = alliance.alliance_id
		`)
		return result
	},
})

contextBridge.exposeInMainWorld('getCharacter', {
	characterSheet: async (characterID: bigint) => {
		const result = await pgQuery(/*SQL*/`
		SELECT
			character_sheet.character_id,
			character_sheet.birthday,
			character_sheet.description,
			character_sheet.gender,
			character_sheet.name,
			character_sheet.security_status,
			character_sheet.title,
			bloodlines.name AS bloodline_name,
			bloodlines.description AS bloodline_description,
			bloodlines.corporation_id AS bloodline_corporation_id,
			races.name AS race_name,
			races.description AS race_description,
			title.name AS title_name,
			corporation.name AS corporation,
			alliance.name AS alliance

		FROM character_sheet
				JOIN bloodlines ON character_sheet.bloodline_id = bloodlines.bloodline_id
				JOIN races ON character_sheet.race_id = races.race_id
				JOIN corporation ON character_sheet.corporation_id = corporation.corporation_id
				LEFT JOIN title ON character_sheet.character_id = title.character_id
				LEFT JOIN alliance ON character_sheet.alliance_id = alliance.alliance_id

		WHERE character_sheet.character_id = $1
		`, [ characterID ])
		return result[0]
	},
	blueprints: (characterID: bigint) => pgSelectByCharID('blueprint', characterID),
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
