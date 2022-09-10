const axios = require('axios')
const { PrismaClient } = require('@prisma/client')

import Character from '../../../Types/APIResponses/EveOfficial/character.type'

export default (characterAuthData) => {
	const { characterID } = characterAuthData

	return axios.get(`https://esi.evetech.net/latest/characters/${characterID}/?datasource=tranquility`)
		.then((result: { data: Character }) => {
			const prisma = new PrismaClient()
			const {
				name, corporation_id: corporationID, alliance_id: allianceID, security_status: securityStatus,
				birthday, bloodline_id: bloodLineID, description, gender, race_id: raceID,
			} = result.data

			const characterData = { name, characterID }
			const sheetData = {
				name,
				corporationID,
				allianceID,
				securityStatus,
				birthday,
				bloodLineID,
				description,
				gender,
				raceID,
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
				// eslint-disable-next-line no-console
				console.error('public char error\n', error)
			})
		}).catch((error: Error) => {
			// eslint-disable-next-line no-console
			console.error('public char error\n', error)
		})
}
