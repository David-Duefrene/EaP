import pgUpsert from '../../../../Postgres/pgUpsert'
import ESIRequest from '../../../axiosRequests/ESIRequest'

import CharacterAuthData from '../../CharacterAuthData.type'
import Clones from './Clones.d'

export default (characterAuthData: CharacterAuthData) => {
	const { characterID, accessToken } = characterAuthData

	return ESIRequest(`/characters/${characterID}/clones/`, accessToken).then((result: { data: Clones[] }) => {
		result.data.forEach(async (clone: Clones) => {
			const cloneData = { ...clone }
			pgUpsert('clone', cloneData, [ 'character_id', 'jump_clone_id' ])
		})
	}).catch((error: Error) => {
		throw new Error('Clones API error\n', { cause: error })
	})
}
