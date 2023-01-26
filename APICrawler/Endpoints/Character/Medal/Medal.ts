import pgUpsert from '../../../../Postgres/pgUpsert'
import ESIRequest from '../../../axiosRequests/ESIRequest'

import CharacterAuthData from '../../CharacterAuthData.type'
import Medal from './Medal.type'

export default async (characterAuthData: CharacterAuthData) => {
	try {
		const { characterID, accessToken } = characterAuthData
		const result = await ESIRequest(`characters/${characterID}/medals`, accessToken)
		result.forEach(async (medal: Medal) => {
			const medalData = { ...medal }
			const graphics = JSON.stringify(medalData.graphics)
			delete medalData.graphics

			pgUpsert('medal', { characterID, graphics, ...medalData }, ['character_id', 'medal_id'])
		})
	} catch (error) {
		throw new Error('Medals API error\n', { cause: error })
	}
}
