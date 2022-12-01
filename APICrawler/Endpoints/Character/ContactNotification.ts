import pgUpsert from '../../../Postgres/pgUpsert'
import ESIRequest from '../../axiosRequests/ESIRequest'

import CharacterAuthData from '../../../Types/APIResponses/EveOfficial/axiosTypes/characterAuthData.type'
import ContactNotification from '../../../Types/APIResponses/EveOfficial/ContactNotifications.types'

export default (characterAuthData: CharacterAuthData) => {
	const { characterID, accessToken } = characterAuthData

	return ESIRequest(`characters/${characterID}/notifications/contacts`, accessToken).then((result: { data: Array<ContactNotification>}) => {
		result.data.forEach(async (notification: ContactNotification) => {
			pgUpsert('ContactNotification', { characterID, ...notification }, [ 'characterID', 'notificationID' ])
		})
	}).catch((error: Error) => {
		throw new Error('ContactNotifications API error\n', { cause: error })
	})
}
