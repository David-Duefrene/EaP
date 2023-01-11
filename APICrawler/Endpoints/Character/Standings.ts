import pgUpsert from '../../../Postgres/pgUpsert'
import ESIRequest from '../../axiosRequests/ESIRequest'

import CharacterAuthData from '../../../Types/APIResponses/EveOfficial/axiosTypes/characterAuthData.type'
import Standings from '../../../Types/APIResponses/EveOfficial/Standings.types'

export default (characterAuthData: CharacterAuthData) => {
	const { characterID, accessToken } = characterAuthData

	return ESIRequest(`characters/${characterID}/standings`, accessToken).then((result: { data: Array<Standings> }) => {
		result.data.forEach(async (standing) => {
			pgUpsert('standings', { characterID, ...standing }, [ 'character_id', 'from_id' ])
		})
	}).catch((error: Error) => {
		throw new Error('Standings API error\n', { cause: error })
	})
}
