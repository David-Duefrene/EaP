import pgUpsert from '../../pgUpsert'
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
				pgUpsert('AgentResearch', agentData, [ 'characterID', 'agentID' ])
			})
		}).catch((error: Error) => {
			throw new Error('Agent research API error\n', { cause: error })
		})
}
