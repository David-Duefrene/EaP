import prisma from '../../../prisma/PrismaClient'
import ESIRequest from '../../axiosRequests/ESIRequest'

import CharacterAuthData from '../../../Types/APIResponses/EveOfficial/axiosTypes/characterAuthData.type'
import Blueprint from '../../../Types/APIResponses/EveOfficial/Blueprints.types'

export default (characterAuthData: CharacterAuthData) => {
	const { characterID, accessToken, name } = characterAuthData

	return ESIRequest(`characters/${characterID}/blueprints`, accessToken).then((result: { data: Array<Blueprint> }) => {
		result.data.forEach((blueprint) => {
			// For each does not wait for promises and is causing issues
			const {
				item_id: itemID, location_flag: locationFlag, location_id: locationID,
				material_efficiency: materialEfficiency, quantity, runs, time_efficiency: timeEfficiency,
				type_id: typeID,
			} = blueprint
			const blueprintData = {
				itemID, locationFlag, locationID, materialEfficiency, quantity, runs, timeEfficiency, typeID,
			}

			return prisma.Blueprint.upsert({
				where: { itemID },
				update: {
					characterID,
					...blueprintData,
				},
				create: {
					characterID,
					...blueprintData,
				},
			}).catch((error: Error) => {
				// eslint-disable-next-line no-console
				console.log('Blueprint error\n', error)
				Promise.reject(error)
			}).catch((error: Error) => {
				// eslint-disable-next-line no-console
				console.log('Blueprint error\n', error)
			})
		})
	})
}
