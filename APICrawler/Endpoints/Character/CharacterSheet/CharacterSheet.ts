import pgUpsert from '../../../../Postgres/pgUpsert'
import ESIRequest from '../../../axiosRequests/ESIRequest'
import Corporation from '../../Corporation/Corporation/Corporation'

import CharacterAuthData from '../../CharacterAuthData.type'

export default async (characterAuthData: CharacterAuthData) => {
	try {
		const { characterID } = characterAuthData

		const charSheet = await ESIRequest(`characters/${characterID}`)
		const { name, corporation_id, alliance_id } = charSheet

		await pgUpsert('character', { name, updatedAt: new Date, characterID }, [ 'character_id' ])
		await Corporation(corporation_id)
		return await pgUpsert('character_sheet', { ...charSheet, characterID }, [ 'character_id' ])
	} catch (error) {
		if (error === '304') return Promise.resolve()
		throw new Error('public character sheet API error\n', { cause: error })
	}
}
