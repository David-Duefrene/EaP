import pgUpsert from '../../../../Postgres/pgUpsert'
import ESIRequest from '../../../axiosRequests/ESIRequest'

import Race from './Race.d'

export default async (): Promise<void> => {
	const result = await ESIRequest('universe/races')
	result.data.forEach((race: Race) => {
		pgUpsert('races', race, [ 'race_id' ])
	})
}
