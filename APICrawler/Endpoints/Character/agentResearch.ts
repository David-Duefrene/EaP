import prisma from '../../../prisma/PrismaClient'
import ESIRequest from '../../axiosRequests/ESIRequest'
import CharacterAuthData from '../../../Types/APIResponses/EveOfficial/axiosTypes/characterAuthData.type'
import AgentResearch from '../../../Types/APIResponses/EveOfficial/AgentResearch.types'

export default (characterAuthData: CharacterAuthData) => {
	const { characterID, accessToken } = characterAuthData

	return ESIRequest(`characters/${characterID}/agents_research`, accessToken)
		.then((result: { data: Array<AgentResearch> }) => {
			result.data.forEach((researchSlot) => {
				const {
					agent_id: agentID, points_per_day: pointsPerDay, remainder_points: remainderPoints,
					skill_type_id: skillTypeID, started_at: startedAT,
				} = researchSlot
				const agentData = {
					agentID, pointsPerDay, remainderPoints, skillTypeID, startedAT,
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
