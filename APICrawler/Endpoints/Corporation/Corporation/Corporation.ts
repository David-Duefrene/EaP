import pgUpsert from '../../../../Postgres/pgUpsert'
import ESIRequest from '../../../axiosRequests/ESIRequest'
import Alliance from '../Alliance/Alliance'

export default async (corporationID: number) => {
	try {
		const corp = await ESIRequest(`corporations/${corporationID}`)

		if (corp.alliance_id) await Alliance(corp.alliance_id)

		await pgUpsert('corporation', { corporationID, ...corp }, [ 'corporation_id' ])
	} catch (error) {
		throw new Error('corporation crawler error', { cause: error })
	}
}
