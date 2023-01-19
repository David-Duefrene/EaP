import pgUpsert from '../../../../Postgres/pgUpsert'
import ESIRequest from '../../../axiosRequests/ESIRequest'
import CharacterAuthData from '../../CharacterAuthData.type'
import AgentResearch from './AgentResearch.type'

export default (characterAuthData: CharacterAuthData) => {
	const { characterID, accessToken } = characterAuthData

	return ESIRequest(`characters/${characterID}/agents_research`, accessToken)
		.then((result: { data: Array<AgentResearch> }) => {
			result.data.forEach((researchSlot) => {
				const agentData = { ...researchSlot }
				// eslint-disable-next-line multiline-comment-style
				// TODO possible bug here
				// Should loop through an array of agents and send them to the db and not return the promise
				pgUpsert('agent_research', agentData, [ 'character_id', 'agent_id' ])
			})
		}).catch((error: Error) => {
			throw new Error('Agent research API error\n', { cause: error })
		})
}
