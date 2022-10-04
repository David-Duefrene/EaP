import prisma from '../../../prisma/PrismaClient'
import ESIRequest from '../../axiosRequests/ESIRequest'

import CharacterAuthData from '../../../Types/APIResponses/EveOfficial/axiosTypes/characterAuthData.type'
import Blueprint from '../../../Types/APIResponses/EveOfficial/Blueprints.types'

export default (characterAuthData: CharacterAuthData) => {
	const { characterID, accessToken } = characterAuthData

	return ESIRequest(`characters/${characterID}/blueprints`, accessToken).then((result: { data: Array<Blueprint> }) => {
		// eslint-disable-next-line @typescript-eslint/ban-types
		const blueprintList: Object[] = []
		// TODO: Add Blueprints type for prisma response ^^

		result.data.forEach((blueprint) => {
			const {
				itemId, locationFlag, locationId, materialEfficiency, quantity, runs, timeEfficiency, typeId,
			} = blueprint
			const blueprintData = {
				itemId, locationFlag, locationId, materialEfficiency, quantity, runs, timeEfficiency, typeId,
			}

			blueprintList.push(blueprintData)
		})

		return prisma.$transaction([
			prisma.Blueprint.deleteMany({ where: { characterID } }),
			// TODO: switch off of SQLlite for this to work
			prisma.Blueprint.createMany({ ...blueprintList }),
		])
	})
}
