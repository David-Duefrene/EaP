import ESIRequest from '../../../axiosRequests/ESIRequest'
import pgUpsert from '../../../../Postgres/pgUpsert'

import CharacterAuthData from '../../CharacterAuthData.type'
import CorpHistory from './CorpHistory.types'

export default (characterAuthData: CharacterAuthData) => {
	const { characterID } = characterAuthData

	return ESIRequest(`characters/${characterID}/corporationhistory`).then((result: { data: Array<CorpHistory> }) => {
		result.data.forEach(async (corpHistory) => {
			await pgUpsert('corporation_history', { characterID, ...corpHistory }, [ 'record_id' ])
		})
	}).catch((error: Error) => {
		throw new Error('CorpHistory API error\n', { cause: error })
	})
}
