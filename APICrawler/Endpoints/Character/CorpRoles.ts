import ESIRequest from '../../axiosRequests/ESIRequest'
import prisma from '../../../prisma/PrismaClient'

import CharacterAuthData from '../../../Types/APIResponses/EveOfficial/axiosTypes/characterAuthData.type'
import CorpRoles from '../../../Types/APIResponses/EveOfficial/CorpRoles.types'

export default (characterAuthData: CharacterAuthData) => {
	const { characterID, accessToken } = characterAuthData

	return ESIRequest(`characters/${characterID}/roles`, accessToken).then(async (result: { data: CorpRoles }) => {
		const {
			roles, rolesAtBase, rolesAtHQ, rolesAtOther,
		} = result.data
		const defaultRoles = {
			roles: roles.length === 0 ? [ 'None' ] : roles,
			rolesAtBase: rolesAtBase.length === 0 ? [ 'None' ] : rolesAtBase,
			rolesAtHQ: rolesAtHQ.length === 0 ? [ 'None' ] : rolesAtHQ,
			rolesAtOther: rolesAtOther.length === 0 ? [ 'None' ] : rolesAtOther,
		}

		await prisma.CorpRoles.upsert({
			where: { characterID },
			update: { ...defaultRoles, characterID },
			create: { ...defaultRoles, characterID },
		}).catch((error: Error) => {
			throw new Error('CorpRoles prisma error\n', { cause: error })
		})
	}).catch((error: Error) => {
		throw new Error('CorpRoles API error\n', { cause: error })
	})
}
