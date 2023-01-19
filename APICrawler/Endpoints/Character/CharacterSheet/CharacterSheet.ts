import pgUpsert from '../../../../Postgres/pgUpsert'
import ESIRequest from '../../../axiosRequests/ESIRequest'
import CharacterSheet from './CharacterSheet.type'
import CharacterAuthData from '../../CharacterAuthData.type'

export default (characterAuthData: CharacterAuthData) => {
	const { characterID } = characterAuthData

	return ESIRequest(`characters/${characterID}`).then(async (result: { data: CharacterSheet }) => {
		await pgUpsert('character', { name: result.data.name, updatedAt: new Date, characterID }, [ 'character_id' ])
		await pgUpsert('character_sheet', { ...result.data, characterID }, [ 'character_id' ])
	}).catch((error: Error) => {
		throw new Error('public character sheet API error\n', { cause: error })
	})
}
