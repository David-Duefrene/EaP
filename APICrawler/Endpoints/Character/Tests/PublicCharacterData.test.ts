import {
	expect, test, afterEach, describe, vi,
} from 'vitest'

import PublicCharacterData from '../PublicCharacterSheet'
import ESIRequest from '../../../axiosRequests/ESIRequest'
import prisma from '../../../../prisma/PrismaClient'

describe('PublicCharacterData', () => {
	afterEach(() => {
		vi.restoreAllMocks()
	})

	test('should be able to get public character data', async () => {
		vi.mock('../../../axiosRequests/ESIRequest', () => ({
			default: vi.fn().mockResolvedValue({
				data: {
					name: 'name',
					characterID: 1n,
					ancestryID: 1,
					birthday: new Date('2022-10-06T02:09:38.981Z'),
					bloodlineID: 1,
					corporationID: 1,
					description: 'description',
				},
			}),
		}))

		vi.mock('../../../../prisma/PrismaClient', () => ({
			default: { Character: { upsert: vi.fn().mockResolvedValue(null) } },
		}))

		await PublicCharacterData({ characterID: '1', accessToken: 'Token' })
		expect(ESIRequest).toBeCalledTimes(1)
		expect(ESIRequest).toBeCalledWith('characters/1')
		expect(prisma.Character.upsert).toBeCalledTimes(1)
		const mockData = {
			where: { characterID: 1n },
			create: {
				characterID: 1n,
				characterSheet: {
					create: {
						name: 'name',
						characterID: 1n,
						ancestryID: 1,
						birthday: new Date('2022-10-06T02:09:38.981Z'),
						bloodlineID: 1,
						corporationID: 1,
						description: 'description',
					},
				},
				name: 'name',
			},
			update: {
				characterID: 1n,
				characterSheet: {
					update: {
						name: 'name',
						characterID: 1n,
						ancestryID: 1,
						birthday: new Date('2022-10-06T02:09:38.981Z'),
						bloodlineID: 1,
						corporationID: 1,
						description: 'description',
					},
				},
				name: 'name',
			},
		}

		expect(prisma.Character.upsert).toBeCalledWith(mockData)
	})
})
