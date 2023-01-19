import pgUpsert from '../../../Postgres/pgUpsert'
import ESIRequest from '../../axiosRequests/ESIRequest'

import CharacterAuthData from '../CharacterAuthData.type'
import Bloodline from './Bloodline.type'

export default async (characterAuthData: CharacterAuthData): Promise<void> => {
	const { accessToken } = characterAuthData

	ESIRequest('universe/bloodlines', accessToken).then((result: { data: Array<Bloodline> }) => {
		result.data.forEach((bloodline: Bloodline) => {
			pgUpsert('bloodlines', bloodline, [ 'bloodline_id' ])
		})
	})
}
