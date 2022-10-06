import prisma from '../../../prisma/PrismaClient'
import ESIRequest from '../../axiosRequests/ESIRequest'
import CharacterAuthData from '../../../Types/APIResponses/EveOfficial/axiosTypes/characterAuthData.type'
import AgentResearch from '../../../Types/APIResponses/EveOfficial/AgentResearch.types'

export default (characterAuthData: CharacterAuthData) => {
	const { characterID, accessToken } = characterAuthData

	return ESIRequest(`characters/${characterID}/agents_research`, accessToken)
		.then((result: { data: Array<AgentResearch> }) => {
			result.data.forEach((researchSlot) => {
				const agentData = { ...researchSlot }
				// eslint-disable-next-line multiline-comment-style
				// TODO possible bug here
				// Should loop through an array of agents and send them to the db and not return the promise
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
