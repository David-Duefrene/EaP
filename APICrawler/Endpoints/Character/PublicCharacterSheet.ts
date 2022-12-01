import pgClient from '../../../postgres/postgresClient'
import ESIRequest from '../../axiosRequests/ESIRequest'
import Character from '../../../Types/APIResponses/EveOfficial/character.type'
import CharacterAuthData from '../../../Types/APIResponses/EveOfficial/axiosTypes/characterAuthData.type'

export default (characterAuthData: CharacterAuthData) => {
	const { characterID } = characterAuthData

	return ESIRequest(`characters/${characterID}`).then(async (result: { data: Character }) => {
		const keys = Object.keys(result.data)
		const columns = keys.join('", "')
		const values = keys.map((key) => result.data[key as keyof Character])

		await pgClient.query(/*SQL*/`
			INSERT INTO public."Character" (name, "characterID", "updatedAt") VALUES ($1, $2, $3)
			ON CONFLICT ("characterID") DO UPDATE SET name = $1, "updatedAt" = $3`,
		[ result.data.name, characterID, new Date() ])

		await pgClient.query(/*SQL*/`
			INSERT INTO public."CharacterSheet" ("${columns}", "characterID") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
			ON CONFLICT ("characterID") DO UPDATE SET ${keys.map((key) => `"${key}" = $${keys.indexOf(key) + 1}`).join(', ')}`,
		[ ...values, characterID ],
		).catch((error: Error) => {
			throw new Error('public character sheet SQL error\n', { cause: error })
		})
	}).catch((error: Error) => {
		throw new Error('public character sheet API error\n', { cause: error })
	})
}
