import ESIRequest from '../../axiosRequests/ESIRequest'
import prisma from '../../../prisma/PrismaClient'

import CharacterAuthData from '../../../Types/APIResponses/EveOfficial/axiosTypes/characterAuthData.type'
import Title from '../../../Types/APIResponses/EveOfficial/Title.types'

export default (characterAuthData: CharacterAuthData) => {
	const { characterID, accessToken } = characterAuthData

	return ESIRequest(`characters/${characterID}/titles`, accessToken).then((result: { data: Array<Title> }) => {
		result.data.forEach(async (title) => {
			await prisma.Title.upsert({
				where: { characterID },
				update: { ...title, characterID },
				create: { ...title, characterID },
			}).catch((error: Error) => {
				throw new Error('Title prisma error\n', { cause: error })
			})
		})
	}).catch((error: Error) => {
		throw new Error('Title API error\n', { cause: error })
	})
}
