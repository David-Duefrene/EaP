import pgUpsert from '../../../../Postgres/pgUpsert'
import ESIRequest from '../../../axiosRequests/ESIRequest'

import CharacterAuthData from '../../CharacterAuthData.type'
import Blueprint from './Blueprint.types'

export default (characterAuthData: CharacterAuthData) => {
	const { characterID, accessToken } = characterAuthData

	return ESIRequest(`characters/${characterID}/blueprints`, accessToken).then((result: { data: Array<Blueprint> }) => {
		result.data.forEach(async (blueprint) => {
			await pgUpsert('blueprint', { characterID, ...blueprint }, [ 'character_id', 'item_id' ])
		})
	}).catch((error: Error) => {
		throw new Error('Blueprints API error\n', { cause: error })
	})
}
