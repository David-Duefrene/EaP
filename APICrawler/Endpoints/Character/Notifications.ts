import prisma from '../../../prisma/PrismaClient'
import ESIRequest from '../../axiosRequests/ESIRequest'

import CharacterAuthData from '../../../Types/APIResponses/EveOfficial/axiosTypes/characterAuthData.type'
import Notification from '../../../Types/APIResponses/EveOfficial/Notifications.types'

export default (characterAuthData: CharacterAuthData) => {
	const { characterID, accessToken } = characterAuthData

	return ESIRequest(`characters/${characterID}/notifications`, accessToken).then((result: { data: Array<Notification>}) => {
		result.data.forEach(async (notification: Notification) => {
			await prisma.Notification.upsert({
				where: { notificationID: notification.notificationID },
				update: { ...notification, characterID },
				create: { ...notification, characterID },
			}).catch((error: Error) => {
				throw new Error('Notifications prisma error\n', { cause: error })
			})
		})
	}).catch((error: Error) => {
		throw new Error('Notifications API error\n', { cause: error })
	})
}
