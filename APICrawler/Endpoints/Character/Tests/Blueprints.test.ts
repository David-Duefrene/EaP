import {
	expect, test, afterEach, describe, vi,
} from 'vitest'

import blueprints from '../Blueprints'
import ESIRequest from '../../../axiosRequests/ESIRequest'
import prisma from '../../../../prisma/PrismaClient'

describe('blueprints', () => {
	afterEach(() => {
		vi.restoreAllMocks()
	})

	test('should be able to get blueprints', async () => {
		vi.mock('../../../axiosRequests/ESIRequest', async () => ({
			default: vi.fn().mockResolvedValue(
				Promise.resolve({
					data: [ {
						itemID: 1,
						locationID: 1,
						typeID: 1,
						quantity: 1,
						timeEfficiency: 1,
						materialEfficiency: 1,
						runs: 1,
					} ],
				}),
			),
		}))

		vi.mock('../../../../prisma/PrismaClient', async () => ({
			default: {
				Blueprint: {
					upsert: vi.fn().mockResolvedValue(Promise.resolve()),
				},
			},
		}))

		await blueprints({ characterID: '1', accessToken: 'Token' })

		expect(ESIRequest).toBeCalledTimes(1)
		expect(ESIRequest).toBeCalledWith('characters/1/blueprints', 'Token')
		expect(prisma.Blueprint.upsert).toBeCalledTimes(1)
		const mockData = {
			itemID: 1,
			locationID: 1,
			typeID: 1,
			quantity: 1,
			timeEfficiency: 1,
			materialEfficiency: 1,
			runs: 1,
		}
		expect(prisma.Blueprint.upsert).toBeCalledWith({
			where: { itemID: 1 },
			update: { ...mockData, characterID: '1' },
			create: { ...mockData, characterID: '1' },
		})
	})
})
