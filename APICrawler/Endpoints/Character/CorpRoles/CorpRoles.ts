import pgUpsert from '../../../../Postgres/pgUpsert'
import ESIRequest from '../../../axiosRequests/ESIRequest'

import CharacterAuthData from '../../CharacterAuthData.type'

export default async (characterAuthData: CharacterAuthData) => {
	try {
		const { characterID, accessToken } = characterAuthData
		const result = await ESIRequest(`characters/${characterID}/roles`, accessToken)
		const {
			roles, roles_at_base, roles_at_hq, roles_at_other,
		} = result

		const defaultRoles = {
			roles: roles.length === 0 ? [ 'None' ] : roles,
			rolesAtBase: roles_at_base.length === 0 ? [ 'None' ] : roles_at_base,
			rolesAtHQ: roles_at_hq.length === 0 ? [ 'None' ] : roles_at_hq,
			rolesAtOther: roles_at_other.length === 0 ? [ 'None' ] : roles_at_other,
		}
		return pgUpsert('corp_roles', { characterID, ...defaultRoles }, [ 'character_id' ])
	} catch (error) {
		if (error === '304') return Promise.resolve()
		throw new Error('CorpRoles API error\n', { cause: error })
	}
}
