import ESIRequest from '../../axiosRequests/ESIRequest'
import prisma from '../../../prisma/PrismaClient'

import CharacterAuthData from '../../../Types/APIResponses/EveOfficial/axiosTypes/characterAuthData.type'
import Standings from '../../../Types/APIResponses/EveOfficial/Standings.types'

export default (characterAuthData: CharacterAuthData) => {
	const { characterID, accessToken } = characterAuthData

	return ESIRequest(`characters/${characterID}/standings`, accessToken).then((result: { data: Array<Standings> }) => {
		result.data.forEach(async (standing) => {
			const { fromID } = standing

			await prisma.Standings.upsert({
				where: { fromID },
				update: { ...standing, characterID },
				create: { ...standing, characterID },
			}).catch((error: Error) => {
				throw new Error('Standings prisma error\n', { cause: error })
			})
		})
	}).catch((error: Error) => {
		throw new Error('Standings API error\n', { cause: error })
	})
}
