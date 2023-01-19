import pgUpsert from '../../../../Postgres/pgUpsert'
import ESIRequest from '../../../axiosRequests/ESIRequest'

import CharacterAuthData from '../../CharacterAuthData.type'
import ContactNotification from './ContactNotification.types'

export default (characterAuthData: CharacterAuthData) => {
	const { characterID, accessToken } = characterAuthData

	return ESIRequest(`characters/${characterID}/notifications/contacts`, accessToken).then((result: { data: Array<ContactNotification>}) => {
		result.data.forEach(async (notification: ContactNotification) => {
			pgUpsert('contact_notification', { characterID, ...notification }, [ 'character_id', 'notification_id' ])
		})
	}).catch((error: Error) => {
		throw new Error('ContactNotifications API error\n', { cause: error })
	})
}
