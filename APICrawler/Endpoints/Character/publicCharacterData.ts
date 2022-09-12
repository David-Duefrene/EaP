import prisma from '../../../prisma/PrismaClient'
import ESIRequest from '../../axiosRequests/ESIRequest'
import Character from '../../../Types/APIResponses/EveOfficial/character.type'
import CharacterAuthData from '../../../Types/APIResponses/EveOfficial/axiosTypes/characterAuthData.type'

export default (characterAuthData: CharacterAuthData) => {
	const { characterID } = characterAuthData

	return ESIRequest(`characters/${characterID}`).then((result: { data: Character }) => {
		const {
			name, corporation_id: corporationID, alliance_id: allianceID, security_status: securityStatus,
			birthday, bloodline_id: bloodLineID, description, gender, race_id: raceID,
		} = result.data

		const characterData = { name, characterID }
		const sheetData = {
			name, corporationID, allianceID, securityStatus, birthday, bloodLineID, description, gender, raceID,
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
