import ESIRequest from '../../axiosRequests/ESIRequest'
import prisma from '../../../prisma/PrismaClient'

import CharacterAuthData from '../../../Types/APIResponses/EveOfficial/axiosTypes/characterAuthData.type'
import CorpRoles from '../../../Types/APIResponses/EveOfficial/CorpRoles.types'

export default (characterAuthData: CharacterAuthData) => {
	const { characterID, accessToken } = characterAuthData

	return ESIRequest(`characters/${characterID}/roles`, accessToken).then(async (result: { data: CorpRoles }) => {
		await prisma.CorpRoles.upsert({
			where: { characterID },
			update: { ...result.data, characterID },
			create: { ...result.data, characterID },
		}).catch((error: Error) => {
			throw new Error('CorpRoles prisma error\n', { cause: error })
		})
	}).catch((error: Error) => {
		throw new Error('CorpRoles API error\n', { cause: error })
	})
}
