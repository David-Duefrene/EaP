import ESIRequest from '../../axiosRequests/ESIRequest'

import Character from '../../../Types/APIResponses/EveOfficial/character.type'
import CharacterAuthData from '../../../Types/APIResponses/EveOfficial/axiosTypes/characterAuthData.type'

// Get corporation history from ESIRequest and log the response to console
export default (characterAuthData: CharacterAuthData) => {
	const { characterID } = characterAuthData

	return ESIRequest(`characters/${characterID}/corporationhistory`).then((result: { data: Character }) => {
		// eslint-disable-next-line no-console
		console.log(result.data)
	}).catch((error: Error) => {
		// eslint-disable-next-line no-console
		console.error('public char error\n', error)
	})
}
