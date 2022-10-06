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
				update: { ...corpHistory, characterID },
				create: { ...corpHistory, characterID },
			}).catch((error: Error) => {
				// eslint-disable-next-line no-console
				console.log('CorpHistory prisma error\n', error)
			})
		})
	}).catch((error: Error) => {
		// eslint-disable-next-line no-console
		console.error('CorpHistory network error\n', error)
	})
}
