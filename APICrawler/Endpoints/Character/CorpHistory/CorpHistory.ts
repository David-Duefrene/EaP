import ESIRequest from '../../../axiosRequests/ESIRequest'
import pgUpsert from '../../../../Postgres/pgUpsert'

import CharacterAuthData from '../../CharacterAuthData.type'
import CorpHistory from './CorpHistory.type'

export default async (characterAuthData: CharacterAuthData) => {
	try {
		const { characterID } = characterAuthData
		const result = await ESIRequest(`characters/${characterID}/corporationhistory`)
		result.forEach(async (corpHistory: CorpHistory) => {
			await pgUpsert('corporation_history', { characterID, ...corpHistory }, [ 'record_id' ])
		})
		return Promise.resolve()
	} catch (error) {
		if (error === '304') return Promise.resolve()
		throw new Error('CorpHistory API error\n', { cause: error })
	}
}
