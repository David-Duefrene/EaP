import pgUpsert from '../../../../Postgres/pgUpsert'
import ESIRequest from '../../../axiosRequests/ESIRequest'

import CharacterAuthData from '../../CharacterAuthData.type'

export default async (characterAuthData: CharacterAuthData) => {
	try {
		const { characterID, accessToken } = characterAuthData
		const result = await ESIRequest(`characters/${characterID}/fatigue`, accessToken)
		return pgUpsert('fatigue', { characterID, ...result }, [ 'character_id' ])
	} catch (error) {
		if (error === '304') return Promise.resolve()
		throw new Error('Fatigue API error\n', { cause: error })
	}
}
