import prisma from '../../../prisma/PrismaClient'
import ESIRequest from '../../axiosRequests/ESIRequest'
import Character from '../../../Types/APIResponses/EveOfficial/character.type'
import CharacterAuthData from '../../../Types/APIResponses/EveOfficial/axiosTypes/characterAuthData.type'

export default (characterAuthData: CharacterAuthData) => {
	const { characterID } = characterAuthData

	return ESIRequest(`characters/${characterID}`).then(async (result: { data: Character }) => {
		const { name } = result.data
		const characterData = { name, characterID }

		await prisma.Character.upsert({
			where: { characterID },
			update: {
				...characterData,
				characterSheet: {
					update: { ...result.data },
				},
			},
			create: {
				...characterData,
				characterSheet: {
					create: { ...result.data },
				},
			},
		}).catch((error: Error) => {
			throw new Error('public character sheet prisma error\n', { cause: error })
		})
	}).catch((error: Error) => {
		throw new Error('public character sheet API error\n', { cause: error })
	})
}
