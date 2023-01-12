import pgUpsert from '../../../Postgres/pgUpsert'
import ESIRequest from '../../axiosRequests/ESIRequest'

import CharacterAuthData from '../../../Types/APIResponses/EveOfficial/axiosTypes/characterAuthData.type'

export default async (characterAuthData: CharacterAuthData): Promise<void> => {
	const { accessToken } = characterAuthData

	ESIRequest('universe/bloodlines', accessToken).then((result) => {
		result.data.forEach((bloodline) => {
			pgUpsert('bloodlines', bloodline, [ 'bloodline_id' ])
		})
	})
}