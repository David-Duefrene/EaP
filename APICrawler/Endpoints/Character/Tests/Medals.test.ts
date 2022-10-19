import {
	expect, test, afterEach, describe, vi,
} from 'vitest'

import medals from '../Medals'
import ESIRequest from '../../../axiosRequests/ESIRequest'
import prisma from '../../../../prisma/PrismaClient'

describe('medals', () => {
	afterEach(() => {
		vi.restoreAllMocks()
	})

	test('should be able to get medals', async () => {
		vi.mock('../../../axiosRequests/ESIRequest', () => ({
			default: vi.fn().mockResolvedValue({
				data: [ {
					medalID: 1,
					reason: 'reason',
					status: 'status',
					issuerID: 1,
					issued: new Date('2022-10-06T02:09:38.981Z'),
					title: 'title',
					description: 'description',
					corporationID: 1,
					characterID: 1,
					graphics: {
						color: 1,
						graphic: 'graphic',
						layer: 1,
						part: 1,
					},
				} ],
			}),
		}))

		vi.mock('../../../../prisma/PrismaClient', () => ({
			default: {
				Medal: {
					upsert: vi.fn().mockResolvedValue(null),
				},
			},
		}))

		await medals({ characterID: '1', accessToken: 'Token' })

		expect(ESIRequest).toBeCalledTimes(1)
		expect(ESIRequest).toBeCalledWith('characters/1/medals', 'Token')
		expect(prisma.Medal.upsert).toBeCalledTimes(1)
		const mockData = {
			medalID: 1,
			reason: 'reason',
			status: 'status',
			issuerID: 1,
			issued: new Date('2022-10-06T02:09:38.981Z'),
			title: 'title',
			description: 'description',
			corporationID: 1,
			characterID: 1,
			graphics: JSON.stringify({
				color: 1,
				graphic: 'graphic',
				layer: 1,
				part: 1,
			}),

		}
		expect(prisma.Medal.upsert).toBeCalledWith({
			where: { medalID: 1 },
			update: {
				...mockData,
				character: {
					connect: { characterID: '1' },
				},
			},
			create: { ...mockData, characterID: 1 },
		})
	})
})
