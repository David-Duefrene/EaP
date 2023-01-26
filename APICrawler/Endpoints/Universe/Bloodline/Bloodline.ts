import pgUpsert from '../../../../Postgres/pgUpsert'
import ESIRequest from '../../../axiosRequests/ESIRequest'

import Bloodline from './Bloodline.d'

export default async (): Promise<void> => {
	try {
		const result = await ESIRequest('universe/bloodlines')
		if (result === undefined) return Promise.resolve()

		result.forEach((bloodline: Bloodline) => {
			pgUpsert('bloodlines', bloodline, [ 'bloodline_id' ])
		})

		return Promise.resolve()
	} catch (error) {
		if (error === '304') return Promise.resolve()
		throw new Error('Bloodlines API error\n', { cause: error })
	}
}
