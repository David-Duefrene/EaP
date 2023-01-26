import ESIRequest from '../../../axiosRequests/ESIRequest'
import pgUpsert from '../../../../Postgres/pgUpsert'
import CharacterAuthData from '../../CharacterAuthData.type'
import Title from './Title.type'

export default async (characterAuthData: CharacterAuthData) => {
	const { characterID, accessToken } = characterAuthData

	try {
		const result = await ESIRequest(`characters/${characterID}/titles`, accessToken)
		result.forEach(async (title: Title) => {
			await pgUpsert('title', { characterID, ...title }, [ 'character_id', 'title_id' ])
		})
		return Promise.resolve()
	} catch (error) {
		if (error === '304') return Promise.resolve()
		throw new Error('Title API error\n', { cause: error })
	}
}
