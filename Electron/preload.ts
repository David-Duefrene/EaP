const { contextBridge, ipcRenderer } = require('electron')

import pgClient from '../Postgres/postgresClient'
import pgSelectByCharID from '../Postgres/pgSelectByCharID'

contextBridge.exposeInMainWorld('findAll', {
	characters: async () => {
		const result = await pgClient.query(/*SQL*/`
			SELECT * FROM public."CharacterSheet"
			JOIN public."chrBloodlines" ON public."CharacterSheet"."bloodlineID" = public."chrBloodlines"."bloodlineID"
			JOIN public."chrRaces" ON public."CharacterSheet"."raceID" = public."chrRaces"."raceID"
			`)
		return result.rows
	},
})

contextBridge.exposeInMainWorld('getCharacter', {
	characterSheet: async (characterID: bigint) => {
		const result = await pgClient.query(/*SQL*/`
		SELECT
			public."CharacterSheet"."characterID",
			public."CharacterSheet"."allianceID",
			public."CharacterSheet".birthday,
			public."CharacterSheet"."bloodlineID",
			public."CharacterSheet"."corporationID",
			public."CharacterSheet".description,
			public."CharacterSheet"."factionID",
			public."CharacterSheet".gender,
			public."CharacterSheet".name,
			public."CharacterSheet"."raceID",
			public."CharacterSheet"."securityStatus",
			public."CharacterSheet".title,
			public."chrBloodlines"."bloodlineName",
			public."chrBloodlines".description AS "bloodlineDescription",
			public."chrBloodlines"."corporationID" AS "bloodlineCorporationID",
			public."chrRaces"."raceName",
			public."chrRaces".description AS "raceDescription",
			public."chrRaces"."shortDescription" AS "raceShortDescription",
			public."Title".name AS "titleName"

		FROM public."CharacterSheet"
				JOIN public."chrBloodlines" ON public."CharacterSheet"."bloodlineID" = public."chrBloodlines"."bloodlineID"
				JOIN public."chrRaces" ON public."CharacterSheet"."raceID" = public."chrRaces"."raceID"
				JOIN public."Title" ON public."CharacterSheet"."characterID" = public."Title"."characterID"
		WHERE public."CharacterSheet"."characterID" = $1
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
