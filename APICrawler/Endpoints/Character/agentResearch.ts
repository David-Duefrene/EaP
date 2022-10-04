import prisma from '../../../prisma/PrismaClient'
import ESIRequest from '../../axiosRequests/ESIRequest'
import CharacterAuthData from '../../../Types/APIResponses/EveOfficial/axiosTypes/characterAuthData.type'
import AgentResearch from '../../../Types/APIResponses/PrismaQueries/Character/AgentResearch.types'

export default (characterAuthData: CharacterAuthData) => {
	const { characterID, accessToken } = characterAuthData

	return ESIRequest(`characters/${characterID}/agents_research`, accessToken)
		.then((result: { data: Array<AgentResearch> }) => {
			result.data.forEach((researchSlot) => {
				const {
					agentId, pointsPerDay, remainderPoints, skillTypeId, startedAt,
				} = researchSlot
				const agentData = {
					agentId, pointsPerDay, remainderPoints, skillTypeId, startedAt,
				}

				return prisma.AgentResearch.upsert({
					where: { characterID },
					update: {
						data: { ...agentData },
					},
					create: {
						data: { ...agentData },
					},
				})
			})
		}).catch((error: Error) => {
			// eslint-disable-next-line no-console
			console.log('Agent research error\n', error)
		})
}
