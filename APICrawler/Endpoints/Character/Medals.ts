import prisma from '../../../prisma/PrismaClient'
import ESIRequest from '../../axiosRequests/ESIRequest'

import CharacterAuthData from '../../../Types/APIResponses/EveOfficial/axiosTypes/characterAuthData.type'
import Medal from '../../../Types/APIResponses/EveOfficial/Medals.types'

export default (characterAuthData: CharacterAuthData) => {
	const { characterID, accessToken } = characterAuthData

	return ESIRequest(`characters/${characterID}/medals`, accessToken).then((result: { data: Array<Medal>}) => {
		result.data.forEach(async (medal: Medal) => {
			const medalData = { ...medal }
			const graphics = medal.graphics
			delete medalData.graphics

			await prisma.Medal.upsert({
				where: { medalID: medalData.medalID },
				update: {
					...medalData,
					character: { connect: { characterID } },
					graphics: JSON.stringify(graphics),
				},
				create: {
					...medalData,
					character: { connect: { characterID } },
					graphics: JSON.stringify(graphics),
				},
			}).catch((error: Error) => {
				throw new Error('Medals prisma error\n', { cause: error })
			})
		})
	}).catch((error: Error) => {
		throw new Error('Medals API error\n', { cause: error })
	})
}
