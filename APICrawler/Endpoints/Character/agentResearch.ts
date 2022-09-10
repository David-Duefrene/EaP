import ESIRequest from '../../axiosRequests/ESIRequest'
import CharacterAuthData from '../../../Types/APIResponses/EveOfficial/axiosTypes/characterAuthData.type'

export default (characterAuthData: CharacterAuthData) => {
	const { characterID, accessToken } = characterAuthData

	return ESIRequest(`characters/${characterID}/agents_research`, accessToken)
		.then((result) => {
			// eslint-disable-next-line no-console
			console.log('result', result)
		}).catch((error) => {
			// eslint-disable-next-line no-console
			console.log('Agent research error\n', error)
		})
}
