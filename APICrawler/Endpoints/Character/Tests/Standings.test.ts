import {
	expect, test, afterEach, describe, vi,
} from 'vitest'

import standings from '../Standings'
import ESIRequest from '../../../axiosRequests/ESIRequest'
import prisma from '../../../../prisma/PrismaClient'

describe('standings', () => {
	afterEach(() => {
		vi.restoreAllMocks()
	})

	test('should be able to get standings', async () => {
		vi.mock('../../../axiosRequests/ESIRequest', () => ({
			default: vi.fn().mockResolvedValue({
				data: [ {
					fromID: 1,
					fromType: 'agent',
					standing: 1,
				} ],
			}),
		}))

		vi.mock('../../../../prisma/PrismaClient', () => ({
			default: {
				Standings: {
					upsert: vi.fn().mockResolvedValue(null),
				},
			},
		}))

		await standings({ characterID: '1', accessToken: 'Token' })

		expect(ESIRequest).toBeCalledTimes(1)
		expect(ESIRequest).toBeCalledWith('characters/1/standings', 'Token')
		expect(prisma.Standings.upsert).toBeCalledTimes(1)
		const mockData = {
			fromID: 1,
			fromType: 'agent',
			standing: 1,
		}
		expect(prisma.Standings.upsert).toBeCalledWith({
			where: { fromID: 1 },
			update: { ...mockData, characterID: '1' },
			create: { ...mockData, characterID: '1' },
		})
	})
})
