import ESIRequest from '../../../axiosRequests/ESIRequest'
import pgUpsert from '../../../../Postgres/pgUpsert'
import CharacterAuthData from '../../CharacterAuthData.type'
import Title from './Title.type'

export default (characterAuthData: CharacterAuthData) => {
	const { characterID, accessToken } = characterAuthData

	return ESIRequest(`characters/${characterID}/titles`, accessToken).then((result: { data: Array<Title> }) => {
		result.data.forEach(async (title) => {
			await pgUpsert('title', { characterID, ...title }, [ 'character_id', 'title_id' ])
		})
	}).catch((error: Error) => {
		throw new Error('Title API error\n', { cause: error })
	})
}
