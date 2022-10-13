import {
	expect, test, afterEach, describe, vi,
} from 'vitest'

import corpRoles from '../CorpRoles'
import ESIRequest from '../../../axiosRequests/ESIRequest'
import prisma from '../../../../prisma/PrismaClient'

describe('corpRoles', () => {
	afterEach(() => {
		vi.restoreAllMocks()
	})

	test('should be able to get corp roles', async () => {
		vi.mock('../../../axiosRequests/ESIRequest', () => ({
			default: vi.fn().mockResolvedValue({
				data: {
					roles: [ 'Director' ],
					rolesAtBase: [ 'Director' ],
					rolesAtHQ: [ 'Director' ],
					rolesAtOther: [ 'Director' ],
				},
			}),
		}))

		vi.mock('../../../../prisma/PrismaClient', () => ({
			default: {
				CorpRoles: {
					upsert: vi.fn().mockResolvedValue(null),
				},
			},
		}))

		await corpRoles({ characterID: '1', accessToken: 'Token' })

		expect(ESIRequest).toBeCalledTimes(1)
		expect(ESIRequest).toBeCalledWith('characters/1/roles', 'Token')
		expect(prisma.CorpRoles.upsert).toBeCalledTimes(1)
		const mockData = {
			roles: '["Director"]',
			rolesAtBase: '["Director"]',
			rolesAtHQ: '["Director"]',
			rolesAtOther: '["Director"]',
		}

		expect(prisma.CorpRoles.upsert).toBeCalledWith({
			where: { characterID: '1' },
			update: { ...mockData, characterID: '1' },
			create: { ...mockData, characterID: '1' },
		})
	})
})
