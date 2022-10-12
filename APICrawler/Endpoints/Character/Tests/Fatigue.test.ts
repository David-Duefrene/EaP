import {
	expect, test, afterEach, describe, vi,
} from 'vitest'

import fatigue from '../Fatigue'
import ESIRequest from '../../../axiosRequests/ESIRequest'
import prisma from '../../../../prisma/PrismaClient'

describe('fatigue', () => {
	afterEach(() => {
		vi.restoreAllMocks()
	})

	test('should be able to get fatigue', async () => {
		vi.mock('../../../axiosRequests/ESIRequest', async () => ({
			default: vi.fn().mockResolvedValue({
				data: {
					lastJumpDate: new Date('2022-10-06T02:09:38.981Z'),
					lastUpdateDate: new Date('2022-10-06T02:09:38.981Z'),
					jumpFatigueExpireDate: new Date('2022-10-06T02:09:38.981Z'),
				},
			}),
		}))

		vi.mock('../../../../prisma/PrismaClient', async () => ({
			default: {
				Fatigue: {
					upsert: vi.fn().mockResolvedValue(null),
				},
			},
		}))

		await fatigue({ characterID: '1', accessToken: 'Token' })

		expect(ESIRequest).toBeCalledTimes(1)
		expect(ESIRequest).toBeCalledWith('characters/1/fatigue', 'Token')
		expect(prisma.Fatigue.upsert).toBeCalledTimes(1)
		const mockData = {
			lastJumpDate: new Date('2022-10-06T02:09:38.981Z'),
			lastUpdateDate: new Date('2022-10-06T02:09:38.981Z'),
			jumpFatigueExpireDate: new Date('2022-10-06T02:09:38.981Z'),
		}
		expect(prisma.Fatigue.upsert).toBeCalledWith({
			where: { characterID: '1' },
			update: { ...mockData, characterID: '1' },
			create: { ...mockData, characterID: '1' },
		})
	})
})
