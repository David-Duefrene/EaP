import prisma from '../../../prisma/PrismaClient'
import ESIRequest from '../../axiosRequests/ESIRequest'

import CharacterAuthData from '../../../Types/APIResponses/EveOfficial/axiosTypes/characterAuthData.type'
import Blueprint from '../../../Types/APIResponses/EveOfficial/Blueprints.types'

export default (characterAuthData: CharacterAuthData) => {
	const { characterID, accessToken } = characterAuthData

	return ESIRequest(`characters/${characterID}/blueprints`, accessToken).then((result: { data: Array<Blueprint> }) => {
		result.data.forEach(async (blueprint) => {
			const { itemID } = blueprint

			await prisma.Blueprint.upsert({
				where: { itemID },
				update: { ...blueprint, owner: { connect: { characterID } } },
				create: { ...blueprint, owner: { connect: { characterID } } },
			}).catch((error: Error) => {
				throw new Error('Blueprints prisma error\n', { cause: error })
			})
		})
	}).catch((error: Error) => {
		throw new Error('Blueprints API error\n', { cause: error })
	})
}
