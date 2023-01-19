import pgUpsert from '../../../../Postgres/pgUpsert'
import ESIRequest from '../../../axiosRequests/ESIRequest'

import CharacterAuthData from '../../CharacterAuthData.type'
import Medal from './Medal.type'

export default (characterAuthData: CharacterAuthData) => {
	const { characterID, accessToken } = characterAuthData

	return ESIRequest(`characters/${characterID}/medals`, accessToken).then((result: { data: Array<Medal>}) => {
		result.data.forEach(async (medal: Medal) => {
			const medalData = { ...medal }
			const graphics = JSON.stringify(medalData.graphics)
			delete medalData.graphics

			pgUpsert('medal', { characterID, graphics, ...medalData }, [ 'character_id', 'medal_id' ])
		})
	}).catch((error: Error) => {
		throw new Error('Medals API error\n', { cause: error })
	})
}
