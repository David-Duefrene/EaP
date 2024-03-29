import pgUpsert from '../../../../Postgres/pgUpsert'
import ESIRequest from '../../../axiosRequests/ESIRequest'
import Structures from '../../Universe/Structure/Structures'

import CharacterAuthData from '../../CharacterAuthData.type'
import Blueprint from './Blueprint.d'

export default async (characterAuthData: CharacterAuthData) => {
	try {
		const { characterID, accessToken } = characterAuthData
		const result = await ESIRequest(`characters/${characterID}/blueprints`, accessToken)
		result.forEach(async (blueprint: Blueprint) => {
			await Structures(characterAuthData, blueprint.location_id)
			await pgUpsert('blueprint', { characterID, ...blueprint }, [ 'character_id', 'item_id' ])
		})
		return Promise.resolve()
	} catch (error) {
		if (error === '304') return Promise.resolve()
		throw new Error('Blueprints API error\n', { cause: error })
	}
}
