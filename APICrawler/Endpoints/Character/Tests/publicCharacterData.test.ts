import {
	expect, test, afterEach, describe, vi,
} from 'vitest'

import publicCharacterData from '../../../../prisma/PrismaClient'
import ESIRequest from '../../../axiosRequests/ESIRequest'

describe('publicCharacterData', () => {
	afterEach(() => {
		vi.restoreAllMocks()
	})

	test('should be able to get public character data', async () => {
		vi.mock('../../../axiosRequests/ESIRequest', async () => ({
			default: vi.fn().mockResolvedValue({
				data: {
					name: 'Test Name',
					corporation_id: 1,
					alliance_id: 1,
					security_status: 1,
					birthday: new Date,
					bloodline_id: 1,
					description: 'description',
					gender: 'male',
					race_id: 1,
				},
			}),
		}))

		vi.mock('../jsIsBas', () => ({
			default: { Character: { upsert: vi.fn().mockResolvedValue({ }) } },
		}))

		await publicCharacterData({ characterID: '1', accessToken: 'Token' })

		expect(ESIRequest).toBeCalledTimes(1)
		expect(ESIRequest).toBeCalledWith('characters/1')
	})
})
