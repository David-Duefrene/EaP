import pgUpsert from '../../../../Postgres/pgUpsert'
import ESIRequest from '../../../axiosRequests/ESIRequest'

export default async (corporationID: number) => {
	try {
		const corp = await ESIRequest(`corporations/${corporationID}`)
		await pgUpsert('corporation', corp.data, [ 'corporation_id' ])
	} catch (error) {
		throw new Error('corporation crawler error', { cause: error })
	}
}
