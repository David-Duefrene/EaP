import {
	expect, test, afterEach, describe, vi,
} from 'vitest'

import corpHistory from '../CorpHistory'
import ESIRequest from '../../../axiosRequests/ESIRequest'
import prisma from '../../../../prisma/PrismaClient'

describe('corpHistory', () => {
	afterEach(() => {
		vi.restoreAllMocks()
	})

	test('should be able to get corp history', async () => {
		vi.mock('../../../axiosRequests/ESIRequest', () => ({
			default: vi.fn().mockResolvedValue({
				data: [ {
					recordID: 1,
					corporationID: 1,
					startDate: new Date('2022-10-06T02:09:38.981Z'),
				} ],
			}),
		}))

		vi.mock('../../../../prisma/PrismaClient', () => ({
			default: {
				CorpHistory: {
					upsert: vi.fn().mockResolvedValue(null),
				},
			},
		}))

		await corpHistory({ characterID: '1', accessToken: 'Token' })

		expect(ESIRequest).toBeCalledTimes(1)
		expect(ESIRequest).toBeCalledWith('characters/1/corporationhistory')
		expect(prisma.CorpHistory.upsert).toBeCalledTimes(1)
		const mockData = {
			recordID: 1,
			corporationID: 1,
			startDate: new Date('2022-10-06T02:09:38.981Z'),
		}
		expect(prisma.CorpHistory.upsert).toBeCalledWith({
			where: { recordID: 1 },
			update: {
				...mockData,
				character: {
					connect: { characterID: '1' },
				},
			},
			create: {
				...mockData,
				character: {
					connect: { characterID: '1' },
				},
			},
		})
	})
})
