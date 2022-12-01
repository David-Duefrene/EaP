import pgUpsert from '../../pgUpsert'
import ESIRequest from '../../axiosRequests/ESIRequest'
import Character from '../../../Types/APIResponses/EveOfficial/character.type'
import CharacterAuthData from '../../../Types/APIResponses/EveOfficial/axiosTypes/characterAuthData.type'

export default (characterAuthData: CharacterAuthData) => {
	const { characterID } = characterAuthData

	return ESIRequest(`characters/${characterID}`).then(async (result: { data: Character }) => {
		await pgUpsert('Character', { name: result.data.name, updatedAt: new Date, characterID }, [ 'characterID' ])
		await pgUpsert('CharacterSheet', { ...result.data, characterID: characterID }, [ 'characterID' ])
	}).catch((error: Error) => {
		throw new Error('public character sheet API error\n', { cause: error })
	})
}
