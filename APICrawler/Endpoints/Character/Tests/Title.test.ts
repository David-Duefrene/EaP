import {
	expect, test, afterEach, describe, vi,
} from 'vitest'

import title from '../Title'
import ESIRequest from '../../../axiosRequests/ESIRequest'
import prisma from '../../../../prisma/PrismaClient'

describe('title', () => {
	afterEach(() => {
		vi.restoreAllMocks()
	})

	test('should be able to get title', async () => {
		vi.mock('../../../axiosRequests/ESIRequest', () => ({
			default: vi.fn().mockResolvedValue({
				data: [ {
					name: 'name',
					titleID: 1,
				} ],
			}),
		}))

		vi.mock('../../../../prisma/PrismaClient', () => ({
			default: {
				Title: {
					upsert: vi.fn().mockResolvedValue(null),
				},
			},
		}))

		await title({ characterID: '1', accessToken: 'Token' })

		expect(ESIRequest).toBeCalledTimes(1)
		expect(ESIRequest).toBeCalledWith('characters/1/titles', 'Token')
		expect(prisma.Title.upsert).toBeCalledTimes(1)
		const mockData = {
			name: 'name',
			titleID: 1,
		}
		expect(prisma.Title.upsert).toBeCalledWith({
			where: { titleID: 1 },
			update: { ...mockData },
			create: { ...mockData, characterID: '1' },
		})
	})
})
