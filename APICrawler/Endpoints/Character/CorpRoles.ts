import ESIRequest from '../../axiosRequests/ESIRequest'
import prisma from '../../../prisma/PrismaClient'

import CharacterAuthData from '../../../Types/APIResponses/EveOfficial/axiosTypes/characterAuthData.type'
import CorpRoles from '../../../Types/APIResponses/EveOfficial/CorpRoles.types'

export default (characterAuthData: CharacterAuthData) => {
	const { characterID, accessToken } = characterAuthData

	return ESIRequest(`characters/${characterID}/roles`, accessToken).then((result: { data: CorpRoles }) => {
		const {
			roles, rolesAtBase, rolesAtHQ, rolesAtOther,
		} = result.data

		prisma.CorpRoles.upsert({
			where: { characterID },
			update: {
				roles: JSON.stringify(roles),
				rolesAtBase: JSON.stringify(rolesAtBase),
				rolesAtHQ: JSON.stringify(rolesAtHQ),
				rolesAtOther: JSON.stringify(rolesAtOther),
				characterID,
			},
			create: {
				roles: JSON.stringify(roles),
				rolesAtBase: JSON.stringify(rolesAtBase),
				rolesAtHQ: JSON.stringify(rolesAtHQ),
				rolesAtOther: JSON.stringify(rolesAtOther),
				characterID,
			},
		}).catch((error: Error) => {
			throw new Error('CorpRoles prisma error\n', { cause: error })
		})
	}).catch((error: Error) => {
		throw new Error('CorpRoles API error\n', { cause: error })
	})
}
