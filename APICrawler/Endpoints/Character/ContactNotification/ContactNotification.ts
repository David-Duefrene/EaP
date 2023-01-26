import pgUpsert from '../../../../Postgres/pgUpsert'
import ESIRequest from '../../../axiosRequests/ESIRequest'

import CharacterAuthData from '../../CharacterAuthData.type'
import ContactNotification from './ContactNotification.type'

export default async (characterAuthData: CharacterAuthData) => {
	try {
		const { characterID, accessToken } = characterAuthData
		const result = await ESIRequest(`characters/${characterID}/notifications/contacts`, accessToken)
		result.forEach(async (notification: ContactNotification) => {
			pgUpsert('contact_notification', { characterID, ...notification }, [ 'character_id', 'notification_id' ])
		})
	} catch (error) {
		throw new Error('ContactNotifications API error\n', { cause: error })
	}
}
