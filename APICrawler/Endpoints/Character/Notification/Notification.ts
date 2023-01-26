import pgUpsert from '../../../../Postgres/pgUpsert'
import ESIRequest from '../../../axiosRequests/ESIRequest'

import CharacterAuthData from '../../CharacterAuthData.type'
import Notification from './Notification.type'

export default async (characterAuthData: CharacterAuthData) => {
	try {
		const { characterID, accessToken } = characterAuthData
		const result = await ESIRequest(`characters/${characterID}/notifications`, accessToken)
		result.forEach(async (notification: Notification) => {
			pgUpsert('notification', { characterID, ...notification }, [ 'character_id', 'notification_id' ])
		})
	} catch (error) {
		throw new Error('Notifications API error\n', { cause: error })
	}
}
