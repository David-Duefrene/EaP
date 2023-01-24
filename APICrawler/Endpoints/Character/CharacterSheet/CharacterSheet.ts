import pgUpsert from '../../../../Postgres/pgUpsert'
import ESIRequest from '../../../axiosRequests/ESIRequest'

import CharacterAuthData from '../../CharacterAuthData.type'

export default async (characterAuthData: CharacterAuthData) => {
	try {
		const { characterID } = characterAuthData

		const charSheet = await ESIRequest(`characters/${characterID}`)
		const { name, corporation_id, alliance_id } = charSheet.data

		await pgUpsert('character', { name, updatedAt: new Date, characterID }, [ 'character_id' ])
		await pgUpsert('character_sheet', { ...charSheet.data, characterID }, [ 'character_id' ])
	} catch (error) {
		throw new Error('public character sheet API error\n', { cause: error })
	}
}
