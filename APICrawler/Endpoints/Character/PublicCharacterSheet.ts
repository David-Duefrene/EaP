import prisma from '../../../prisma/PrismaClient'
import ESIRequest from '../../axiosRequests/ESIRequest'
import Character from '../../../Types/APIResponses/EveOfficial/character.type'
import CharacterAuthData from '../../../Types/APIResponses/EveOfficial/axiosTypes/characterAuthData.type'

export default (characterAuthData: CharacterAuthData) => {
	const { characterID } = characterAuthData

	return ESIRequest(`characters/${characterID}`).then((result: { data: Character }) => {
		const { name } = result.data
		const characterData = { name, characterID }
		const sheetData = { ...result.data }

		return prisma.Character.upsert({
			where: { characterID },
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
			throw new Error('public character sheet prisma error\n', { cause: error })
		})
	}).catch((error: Error) => {
		throw new Error('public character sheet API error\n', { cause: error })
	})
}
