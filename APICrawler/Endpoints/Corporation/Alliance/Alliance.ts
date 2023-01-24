import pgUpsert from '../../../../Postgres/pgUpsert'
import ESIRequest from '../../../axiosRequests/ESIRequest'

export default async (allianceID: number) => {
	try {
		const alliance = await ESIRequest(`alliances/${allianceID}`)
		await pgUpsert('alliance', { allianceID, ...alliance.data }, [ 'alliance_id' ])
	} catch (error) {
		throw new Error('alliance crawler error', { cause: error })
	}
}
