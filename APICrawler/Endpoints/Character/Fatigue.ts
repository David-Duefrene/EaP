import prisma from '../../../prisma/PrismaClient'
import ESIRequest from '../../axiosRequests/ESIRequest'

import CharacterAuthData from '../../../Types/APIResponses/EveOfficial/axiosTypes/characterAuthData.type'
import Fatigue from '../../../Types/APIResponses/EveOfficial/Fatigue.type'

export default (characterAuthData: CharacterAuthData) => {
	const { characterID, accessToken } = characterAuthData

	return ESIRequest(`characters/${characterID}/fatigue`, accessToken).then((result: Fatigue) => {
		const { data } = result
		const fatigueData = { ...data }

		return prisma.Fatigue.upsert({
			where: { characterID },
			update: { ...fatigueData, characterID },
			create: { ...fatigueData, characterID },
		}).catch((error: Error) => {
			throw new Error('Fatigue prisma error\n', { cause: error })
		})
	}).catch((error: Error) => {
		throw new Error('Fatigue API error\n', { cause: error })
	})
}
