import pgUpsert from '../../../../Postgres/pgUpsert'
import ESIRequest from '../../../axiosRequests/ESIRequest'
import Structure from '../../Universe/Structure/Structures'

import CharacterAuthData from '../../CharacterAuthData.type'
import Clones from './Clones.d'

export default async (characterAuthData: CharacterAuthData) => {
	try {
		const { characterID, accessToken } = characterAuthData

		const jumpClones = await ESIRequest(`characters/${characterID}/clones/`, accessToken)
		jumpClones.jump_clones.forEach(async (clone: Clones) => {
			await Structure(characterAuthData, clone.location_id)
			clone.characterID = characterID
			pgUpsert('clones', clone, [ 'character_id', 'jump_clone_id' ])
		})
		await Structure(characterAuthData, jumpClones.home_location.location_id)

		const currentImplants = await ESIRequest(`characters/${characterID}/implants/`, accessToken)
		const cloneStatus = {
			characterID,
			lastCloneJumpDate: jumpClones.last_clone_jump_date,
			lastStationChangeDate: jumpClones.last_station_change_date,
			homeLocationID: jumpClones.home_location.location_id,
			homeLocationType: jumpClones.home_location.location_type,
			implants: currentImplants,
		}
		pgUpsert('clone_status', cloneStatus, [ 'character_id' ])
	} catch (error) {
		throw new Error('Clones API error\n', { cause: error })
	}
}
