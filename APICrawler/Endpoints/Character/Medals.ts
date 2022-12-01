import pgUpsert from '../../pgUpsert'
import ESIRequest from '../../axiosRequests/ESIRequest'

import CharacterAuthData from '../../../Types/APIResponses/EveOfficial/axiosTypes/characterAuthData.type'
import Medal from '../../../Types/APIResponses/EveOfficial/Medals.types'

export default (characterAuthData: CharacterAuthData) => {
	const { characterID, accessToken } = characterAuthData

	return ESIRequest(`characters/${characterID}/medals`, accessToken).then((result: { data: Array<Medal>}) => {
		result.data.forEach(async (medal: Medal) => {
			const medalData = { ...medal }
			const graphics = JSON.stringify(medalData.graphics)
			delete medalData.graphics

			pgUpsert('Medal', { characterID, graphics, ...medalData }, [ 'characterID', 'medalID' ])
		})
	}).catch((error: Error) => {
		throw new Error('Medals API error\n', { cause: error })
	})
}
