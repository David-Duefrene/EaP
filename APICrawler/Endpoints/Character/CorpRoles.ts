import pgUpsert from '../../../Postgres/pgUpsert'
import ESIRequest from '../../axiosRequests/ESIRequest'

import CharacterAuthData from '../../../Types/APIResponses/EveOfficial/axiosTypes/characterAuthData.type'
import CorpRoles from '../../../Types/APIResponses/EveOfficial/CorpRoles.types'

export default (characterAuthData: CharacterAuthData) => {
	const { characterID, accessToken } = characterAuthData

	return ESIRequest(`characters/${characterID}/roles`, accessToken).then(async (result: { data: CorpRoles }) => {
		const {
			roles, roles_at_base, roles_at_hq, roles_at_other,
		} = result.data

		const defaultRoles = {
			roles: roles.length === 0 ? [ 'None' ] : roles,
			rolesAtBase: roles_at_base.length === 0 ? [ 'None' ] : roles_at_base,
			rolesAtHQ: roles_at_hq.length === 0 ? [ 'None' ] : roles_at_hq,
			rolesAtOther: roles_at_other.length === 0 ? [ 'None' ] : roles_at_other,
		}
		pgUpsert('corp_roles', { characterID, ...defaultRoles }, [ 'character_id' ])
	}).catch((error: Error) => {
		throw new Error('CorpRoles API error\n', { cause: error })
	})
}
