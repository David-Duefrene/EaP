import pgUpsert from '../../pgUpsert'
import ESIRequest from '../../axiosRequests/ESIRequest'

import CharacterAuthData from '../../../Types/APIResponses/EveOfficial/axiosTypes/characterAuthData.type'
import Blueprint from '../../../Types/APIResponses/EveOfficial/Blueprints.types'

export default (characterAuthData: CharacterAuthData) => {
	const { characterID, accessToken } = characterAuthData

	return ESIRequest(`characters/${characterID}/blueprints`, accessToken).then((result: { data: Array<Blueprint> }) => {
		result.data.forEach(async (blueprint) => {
			await pgUpsert('Blueprint', { characterID, ...blueprint }, [ 'characterID', 'itemID' ])
		})
	}).catch((error: Error) => {
		throw new Error('Blueprints API error\n', { cause: error })
	})
}
