import pgUpsert from '../../../Postgres/pgUpsert'
import ESIRequest from '../../axiosRequests/ESIRequest'

import CharacterAuthData from '../../../Types/APIResponses/EveOfficial/axiosTypes/characterAuthData.type'

export default async (characterAuthData: CharacterAuthData): Promise<void> => {
	const { accessToken } = characterAuthData

	ESIRequest('universe/races', accessToken).then((result) => {
		result.data.forEach((race) => {
			pgUpsert('races', race, ['race_id'])
		})
	})
}
