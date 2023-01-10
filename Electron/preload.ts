const { contextBridge, ipcRenderer } = require('electron')

import pgClient from '../Postgres/postgresClient'
import pgSelectByCharID from '../Postgres/pgSelectByCharID'

contextBridge.exposeInMainWorld('findAll', {
	characters: async () => {
		const result = await pgClient.query(/*SQL*/`
			SELECT * FROM "CharacterSheet"
			JOIN "chrBloodlines" ON "CharacterSheet"."bloodlineID" = "chrBloodlines"."bloodlineID"
			JOIN "chrRaces" ON "CharacterSheet"."raceID" = "chrRaces"."raceID"
			`)
		return result.rows
	},
})

contextBridge.exposeInMainWorld('getCharacter', {
	characterSheet: async (characterID: bigint) => {
		const result = await pgClient.query(/*SQL*/`
		SELECT
			"CharacterSheet"."characterID",
			"CharacterSheet"."allianceID",
			"CharacterSheet".birthday,
			"CharacterSheet"."bloodlineID",
			"CharacterSheet"."corporationID",
			"CharacterSheet".description,
			"CharacterSheet"."factionID",
			"CharacterSheet".gender,
			"CharacterSheet".name,
			"CharacterSheet"."raceID",
			"CharacterSheet"."securityStatus",
			"CharacterSheet".title,
			"chrBloodlines"."bloodlineName",
			"chrBloodlines".description AS "bloodlineDescription",
			"chrBloodlines"."corporationID" AS "bloodlineCorporationID",
			"chrRaces"."raceName",
			"chrRaces".description AS "raceDescription",
			"chrRaces"."shortDescription" AS "raceShortDescription",
			"Title".name AS "titleName"

		FROM "CharacterSheet"
				JOIN "chrBloodlines" ON "CharacterSheet"."bloodlineID" = "chrBloodlines"."bloodlineID"
				JOIN "chrRaces" ON "CharacterSheet"."raceID" = "chrRaces"."raceID"
				JOIN "Title" ON "CharacterSheet"."characterID" = "Title"."characterID"
		WHERE "CharacterSheet"."characterID" = $1
		`, [ characterID ])
		return result.rows[0]
	},
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
