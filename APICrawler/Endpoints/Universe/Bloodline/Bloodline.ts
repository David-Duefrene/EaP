import pgUpsert from '../../../../Postgres/pgUpsert'
import ESIRequest from '../../../axiosRequests/ESIRequest'

import Bloodline from './Bloodline.d'

export default async (): Promise<void> => {
	const result = await ESIRequest('universe/bloodlines')
	result.data.forEach((bloodline: Bloodline) => {
		pgUpsert('bloodlines', bloodline, [ 'bloodline_id' ])
	})
}
