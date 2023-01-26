import pgUpsert from '../../../../Postgres/pgUpsert'
import ESIRequest from '../../../axiosRequests/ESIRequest'

import Race from './Race.d'

export default async (): Promise<void> => {
	try {
		const result = await ESIRequest('universe/races')
		if (result === undefined) return Promise.resolve()

		result.forEach((race: Race) => {
			pgUpsert('races', race, [ 'race_id' ])
		})
		return Promise.resolve()
	} catch (error) {
		if (error === '304') return Promise.resolve()
		throw new Error('Bloodlines API error\n', { cause: 'error' })
	}
}
