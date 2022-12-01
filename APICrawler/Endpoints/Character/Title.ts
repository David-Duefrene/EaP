import ESIRequest from '../../axiosRequests/ESIRequest'
import pgClient from '../../../postgres/postgresClient'

import CharacterAuthData from '../../../Types/APIResponses/EveOfficial/axiosTypes/characterAuthData.type'
import Title from '../../../Types/APIResponses/EveOfficial/Title.types'

export default (characterAuthData: CharacterAuthData) => {
	const { characterID, accessToken } = characterAuthData

	return ESIRequest(`characters/${characterID}/titles`, accessToken).then((result: { data: Array<Title> }) => {
		result.data.forEach(async (title) => {
			const { titleID, name } = title

			await pgClient.query(/*SQL*/`
				INSERT INTO public."Title" ("characterID", "titleID", "name")
				VALUES ($1, $2, $3)
				ON CONFLICT ("characterID", "titleID") DO SET name = $3`,
			[ characterID, titleID, name ],
			).catch((error: Error) => {
				throw new Error('Title SQL error\n', { cause: error })
			})
		})
	}).catch((error: Error) => {
		throw new Error('Title API error\n', { cause: error })
	})
}
