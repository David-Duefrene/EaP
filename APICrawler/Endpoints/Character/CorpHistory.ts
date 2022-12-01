import ESIRequest from '../../axiosRequests/ESIRequest'
import pgUpsert from '../../../Postgres/pgUpsert'

import CharacterAuthData from '../../../Types/APIResponses/EveOfficial/axiosTypes/characterAuthData.type'
import CorpHistory from '../../../Types/APIResponses/EveOfficial/CorpHistory.types'

export default (characterAuthData: CharacterAuthData) => {
	const { characterID } = characterAuthData

	return ESIRequest(`characters/${characterID}/corporationhistory`).then((result: { data: Array<CorpHistory> }) => {
		result.data.forEach(async (corpHistory) => {
			await pgUpsert('CorpHistory', { characterID, ...corpHistory }, [ 'recordID' ])
		})
	}).catch((error: Error) => {
		throw new Error('CorpHistory API error\n', { cause: error })
	})
}
