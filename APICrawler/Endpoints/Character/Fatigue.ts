import pgUpsert from '../../../Postgres/pgUpsert'
import ESIRequest from '../../axiosRequests/ESIRequest'

import CharacterAuthData from '../../../Types/APIResponses/EveOfficial/axiosTypes/characterAuthData.type'
import Fatigue from '../../../Types/APIResponses/EveOfficial/Fatigue.type'

export default (characterAuthData: CharacterAuthData) => {
	const { characterID, accessToken } = characterAuthData

	return ESIRequest(`characters/${characterID}/fatigue`, accessToken).then((result: Fatigue) => {
		pgUpsert('fatigue', { characterID, ...result.data }, [ 'character_id' ])
	}).catch((error: Error) => {
		throw new Error('Fatigue API error\n', { cause: error })
	})
}
