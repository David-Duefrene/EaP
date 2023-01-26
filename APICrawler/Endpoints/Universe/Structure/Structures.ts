import pgUpsert from '../../../../Postgres/pgUpsert'
import ESIRequest from '../../../axiosRequests/ESIRequest'

import CharacterAuthData from '../../CharacterAuthData.type'

export default async (auth: CharacterAuthData, structureID: bigint): Promise<void> => {
	if (structureID < BigInt(100000000)) {
		const result = await ESIRequest(`universe/stations/${structureID.toString()}`, auth.accessToken)
		const station = result.data
		const push = {
			structureID: station.station_id,
			name: station.name,
			ownerID: station.owner,
			solarSystemID: station.system_id,
			typeID: station.type_id,
		}

		await pgUpsert('structure', push, [ 'structure_id' ])
	} else {
		const result = await ESIRequest(`universe/structures/${structureID.toString()}`, auth.accessToken)
		const pos = {
			position_x: result.data.position.x,
			position_y: result.data.position.y,
			position_z: result.data.position.z,
		}
		delete result.data.position
		await pgUpsert('structure', { ...pos, ...result.data, structureID }, [ 'structure_id' ])
	}
}
