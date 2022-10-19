import prisma from '../../../prisma/PrismaClient'
import ESIRequest from '../../axiosRequests/ESIRequest'

import CharacterAuthData from '../../../Types/APIResponses/EveOfficial/axiosTypes/characterAuthData.type'
import ContactNotification from '../../../Types/APIResponses/EveOfficial/ContactNotifications.types'

export default (characterAuthData: CharacterAuthData) => {
	const { characterID, accessToken } = characterAuthData

	return ESIRequest(`characters/${characterID}/notifications/contacts`, accessToken).then((result: { data: Array<ContactNotification>}) => {
		result.data.forEach(async (notification: ContactNotification) => {
			await prisma.ContactNotification.upsert({
				where: { notificationID: notification.notificationID },
				update: { ...notification, characterID },
				create: { ...notification, characterID },
			}).catch((error: Error) => {
				throw new Error('ContactNotifications prisma error\n', { cause: error })
			})
		})
	}).catch((error: Error) => {
		throw new Error('ContactNotifications API error\n', { cause: error })
	})
}
