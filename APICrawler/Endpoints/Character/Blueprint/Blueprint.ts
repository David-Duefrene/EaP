import pgUpsert from '../../../../Postgres/pgUpsert'
import ESIRequest from '../../../axiosRequests/ESIRequest'
import Structures from '../../Universe/Structure/Structures'

import CharacterAuthData from '../../CharacterAuthData.type'
import Blueprint from './Blueprint.d'

export default async (characterAuthData: CharacterAuthData) => {
	const { characterID, accessToken } = characterAuthData

	try {
		const result = await ESIRequest(`characters/${characterID}/blueprints`, accessToken)
		result.data.forEach(async (blueprint: Blueprint) => {
			await Structures(characterAuthData, blueprint.location_id)
			await pgUpsert('blueprint', { characterID, ...blueprint }, [ 'character_id', 'item_id' ])
		})
	} catch (error) {
		throw new Error('Blueprints API error\n', { cause: error })
	}
}
