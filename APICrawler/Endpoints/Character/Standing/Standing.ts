import pgUpsert from '../../../../Postgres/pgUpsert'
import ESIRequest from '../../../axiosRequests/ESIRequest'

import CharacterAuthData from '../../CharacterAuthData.type'
import Standing from './Standing.type'

export default async (characterAuthData: CharacterAuthData) => {
	const { characterID, accessToken } = characterAuthData

	try {
		const result = await ESIRequest(`characters/${characterID}/standings`, accessToken)
		result.forEach(async (standing: Standing) => {
			pgUpsert('standings', { characterID, ...standing }, ['character_id', 'from_id'])
		})
	} catch (error) {
		throw new Error('Standings API error\n', { cause: error })
	}
}
