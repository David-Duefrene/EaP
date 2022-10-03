import prisma from '../../../prisma/PrismaClient'
import ESIRequest from '../../axiosRequests/ESIRequest'

import CharacterAuthData from '../../../Types/APIResponses/EveOfficial/axiosTypes/characterAuthData.type'
import Blueprint from '../../../Types/APIResponses/EveOfficial/Blueprints.types'

export default (characterAuthData: CharacterAuthData) => {
	const { characterID, accessToken } = characterAuthData

	return ESIRequest(`characters/${characterID}/blueprints`, accessToken).then((result: { data: Array<Blueprint> }) => {
		return result.data.forEach((blueprint) => {
			const {
				item_id: itemID, location_flag: locationFlag, location_id: locationID,
				material_efficiency: materialEfficiency, quantity, runs, time_efficiency: timeEfficiency,
				type_id: typeID,
			} = blueprint
			const blueprintData = {
				itemID, locationFlag, locationID, materialEfficiency, quantity, runs, timeEfficiency, typeID,
			}

			prisma.Blueprint.upsert({
				where: { itemID },
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
