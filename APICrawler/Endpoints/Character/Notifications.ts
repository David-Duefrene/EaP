import pgUpsert from '../../../Postgres/pgUpsert'
import ESIRequest from '../../axiosRequests/ESIRequest'

import CharacterAuthData from '../../../Types/APIResponses/EveOfficial/axiosTypes/characterAuthData.type'
import Notification from '../../../Types/APIResponses/EveOfficial/Notifications.types'

export default (characterAuthData: CharacterAuthData) => {
	const { characterID, accessToken } = characterAuthData

	return ESIRequest(`characters/${characterID}/notifications`, accessToken).then((result: { data: Array<Notification>}) => {
		result.data.forEach(async (notification: Notification) => {
			pgUpsert('notification', { characterID, ...notification }, [ 'character_id', 'notification_id' ])
		})
	}).catch((error: Error) => {
		throw new Error('Notifications API error\n', { cause: error })
	})
}
