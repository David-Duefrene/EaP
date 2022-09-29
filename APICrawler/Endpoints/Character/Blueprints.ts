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
				item_id: itemID, location_flag: locationFlag, location_id: locationID,
				material_efficiency: materialEfficiency, quantity, runs, time_efficiency: timeEfficiency,
				type_id: typeID,
			} = blueprint
			const blueprintData = {
				itemID, locationFlag, locationID, materialEfficiency, quantity, runs, timeEfficiency, typeID,
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
