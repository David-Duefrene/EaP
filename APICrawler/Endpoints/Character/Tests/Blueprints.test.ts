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
		vi.mock('../../../axiosRequests/ESIRequest', () => ({
			default: vi.fn().mockResolvedValue({
				data: [ {
					itemID: 1,
					locationID: 1,
					typeID: 1,
					quantity: 1,
					timeEfficiency: 1,
					materialEfficiency: 1,
					runs: 1,
				} ],
			},
			),
		}))

		vi.mock('../../../../prisma/PrismaClient', () => ({
			default: {
				Blueprint: {
					upsert: vi.fn().mockResolvedValue(null),
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
			update: {
				...mockData,
				owner: { connect: { characterID: '1' } },
			},
			create: {
				...mockData,
				owner: { connect: { characterID: '1' } },
			},
		})
	})
})
