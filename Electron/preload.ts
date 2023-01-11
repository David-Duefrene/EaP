const { contextBridge, ipcRenderer } = require('electron')

import pgSelectByCharID from '../Postgres/pgSelectByCharID'
import pgQuery from '../Postgres/pgQuery'

contextBridge.exposeInMainWorld('findAll', {
	characters: async () => {
		const result = await pgQuery(/*SQL*/`
			SELECT * FROM character
			JOIN character_sheet ON character.character_id = character_sheet.character_id
			JOIN "chrBloodlines" ON character_sheet.bloodline_id = "chrBloodlines"."bloodlineID"
			JOIN "chrRaces" ON character_sheet.race_id = "chrRaces"."raceID"
			`)
		return result
	},
})

contextBridge.exposeInMainWorld('getCharacter', {
	characterSheet: async (characterID: bigint) => {
		const result = await pgQuery(/*SQL*/`
		SELECT
			character_sheet.character_id,
			character_sheet.alliance_id,
			character_sheet.birthday,
			character_sheet.bloodline_id,
			character_sheet.corporation_id,
			character_sheet.description,
			character_sheet.faction_id,
			character_sheet.gender,
			character_sheet.name,
			character_sheet.race_id,
			character_sheet.security_status,
			character_sheet.title,
			"chrBloodlines"."bloodlineName",
			"chrBloodlines".description AS "bloodlineDescription",
			"chrBloodlines"."corporationID" AS "bloodlineCorporationID",
			"chrRaces"."raceName",
			"chrRaces".description AS "raceDescription",
			"chrRaces"."shortDescription" AS "raceShortDescription",
			title.name AS title_name

		FROM character_sheet
				JOIN "chrBloodlines" ON character_sheet.bloodline_id = "chrBloodlines"."bloodlineID"
				JOIN "chrRaces" ON character_sheet.race_id = "chrRaces"."raceID"
				JOIN title ON character_sheet.character_id = title.character_id
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
})

contextBridge.exposeInMainWorld('auth', {
	login: () => ipcRenderer.send('Login'),
})

contextBridge.exposeInMainWorld('listen', {
	notification: (callback: (event: Event, value: string) => void) => ipcRenderer.on('Notification', callback),
})
