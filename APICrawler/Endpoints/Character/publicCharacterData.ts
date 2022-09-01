const axios = require('axios')
const { PrismaClient } = require('@prisma/client')

import Character from '../../../Types/APIResponses/EveOfficial/character.type'

export default (characterID: number | string) => {
	return axios.get(`https://esi.evetech.net/latest/characters/${characterID}/?datasource=tranquility`)
	.then((result: { data: Character }) => {
		const prisma = new PrismaClient()
		const {
			name, corporation_id, alliance_id, security_status, birthday,
			bloodline_id, description, gender, race_id,
		} = result.data

		const characterData = { name, characterID }
		const sheetData = {
			name,
			corporationID: corporation_id,
			allianceID: alliance_id,
			securityStatus: security_status,
			birthday: birthday,
			bloodLineID: bloodline_id,
			description: description,
			gender: gender,
			raceID: race_id,
		}

		return prisma.Character.upsert({
			where: { characterID: characterID },
			update: {
				...characterData,
				characterSheet: {
					update: {
						data: { ...sheetData },
						where: { name },
					},
				},
			},
			create: {
				...characterData,
				characterSheet: {
					create: { ...sheetData },
				},
			},
		}).catch((error: Error) => {
			console.error(error)
		})
	}).catch((error: Error) => {
		console.error(error)
	})
}
