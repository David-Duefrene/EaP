import prisma from '../../../prisma/PrismaClient'
import ESIRequest from '../../axiosRequests/ESIRequest'

import CharacterAuthData from '../../../Types/APIResponses/EveOfficial/axiosTypes/characterAuthData.type'
import Blueprint from '../../../Types/APIResponses/EveOfficial/Blueprints.types'

export default (characterAuthData: CharacterAuthData) => {
	const { characterID, accessToken } = characterAuthData

	return ESIRequest(`characters/${characterID}/blueprints`, accessToken).then((result: { data: Array<Blueprint> }) => {
		return result.data.forEach((blueprint) => {
			const { itemId } = blueprint
			const blueprintData = { ...blueprint }

			prisma.Blueprint.upsert({
				where: { itemId },
				update: {
					data: { ...blueprintData },
				},
				create: {
					data: { ...blueprintData },
				},
			})
		})
	})
}
