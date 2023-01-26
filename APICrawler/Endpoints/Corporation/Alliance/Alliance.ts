import pgUpsert from '../../../../Postgres/pgUpsert'
import ESIRequest from '../../../axiosRequests/ESIRequest'

export default async (allianceID: number) => {
	try {
		const alliance = await ESIRequest(`alliances/${allianceID}`)
		return await pgUpsert('alliance', { allianceID, ...alliance }, [ 'alliance_id' ])
	} catch (error) {
		if (error === '304') return Promise.resolve()
		throw new Error('alliance crawler error', { cause: error })
	}
}
