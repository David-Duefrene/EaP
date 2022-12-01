import ESIRequest from '../../axiosRequests/ESIRequest'
import pgUpsert from '../../../Postgres/pgUpsert'
import CharacterAuthData from '../../../Types/APIResponses/EveOfficial/axiosTypes/characterAuthData.type'
import Title from '../../../Types/APIResponses/EveOfficial/Title.types'

export default (characterAuthData: CharacterAuthData) => {
	const { characterID, accessToken } = characterAuthData

	return ESIRequest(`characters/${characterID}/titles`, accessToken).then((result: { data: Array<Title> }) => {
		result.data.forEach(async (title) => {
			const { titleID, name } = title

			await pgUpsert('Title', { characterID, titleID, name }, [ 'characterID', 'titleID' ])
		})
	}).catch((error: Error) => {
		throw new Error('Title API error\n', { cause: error })
	})
}
