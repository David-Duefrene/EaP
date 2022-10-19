import ESIRequest from '../../axiosRequests/ESIRequest'
import prisma from '../../../prisma/PrismaClient'

import CharacterAuthData from '../../../Types/APIResponses/EveOfficial/axiosTypes/characterAuthData.type'
import CorpHistory from '../../../Types/APIResponses/EveOfficial/CorpHistory.types'

export default (characterAuthData: CharacterAuthData) => {
	const { characterID } = characterAuthData

	return ESIRequest(`characters/${characterID}/corporationhistory`).then((result: { data: Array<CorpHistory> }) => {
		result.data.forEach(async (corpHistory) => {
			const { recordID } = corpHistory

			await prisma.CorpHistory.upsert({
				where: { recordID },
				update: { ...corpHistory, character: { connect: { characterID } } },
				create: { ...corpHistory, character: { connect: { characterID } } },
			}).catch((error: Error) => {
				throw new Error('CorpHistory prisma error\n', { cause: error })
			})
		})
	}).catch((error: Error) => {
		throw new Error('CorpHistory API error\n', { cause: error })
	})
}
