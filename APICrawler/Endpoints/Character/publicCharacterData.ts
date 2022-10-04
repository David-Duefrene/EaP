import prisma from '../../../prisma/PrismaClient'
import ESIRequest from '../../axiosRequests/ESIRequest'
import Character from '../../../Types/APIResponses/EveOfficial/character.type'
import CharacterAuthData from '../../../Types/APIResponses/EveOfficial/axiosTypes/characterAuthData.type'

export default (characterAuthData: CharacterAuthData) => {
	const { characterID } = characterAuthData

	return ESIRequest(`characters/${characterID}`).then((result: { data: Character }) => {
		const {
			name, corporationId, allianceId, securityStatus,
			birthday, bloodLineId, description, gender, raceId,
		} = result.data

		const characterData = { name, characterID }
		const sheetData = {
			name, corporationId, allianceId, securityStatus, birthday, bloodLineId, description, gender, raceId,
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
