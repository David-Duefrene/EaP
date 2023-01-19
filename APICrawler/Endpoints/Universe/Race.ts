import pgUpsert from '../../../Postgres/pgUpsert'
import ESIRequest from '../../axiosRequests/ESIRequest'

import CharacterAuthData from '../CharacterAuthData.type'
import Race from './Race.type'

export default async (characterAuthData: CharacterAuthData): Promise<void> => {
	const { accessToken } = characterAuthData

	ESIRequest('universe/races', accessToken).then((result: { data: Array<Race> }) => {
		result.data.forEach((race: Race) => {
			pgUpsert('races', race, [ 'race_id' ])
		})
	})
}
