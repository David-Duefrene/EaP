import {
	expect, test, afterEach, describe, vi,
} from 'vitest'

import PublicCharacterData from '../../Endpoints/Character/PublicCharacterSheet'
import ESIRequest from '../../axiosRequests/ESIRequest'
import pgUpsert from '../../../Postgres/pgUpsert'

describe('PublicCharacterData', () => {
	afterEach(() => {
		vi.restoreAllMocks()
	})

	test('should be able to get public character data', async () => {
		vi.mock('../../../axiosRequests/ESIRequest', () => ({
			default: vi.fn().mockResolvedValue({
				data: {
					name: 'name',
					race_id: 1,
					birthday: new Date('2022-10-06T02:09:38.981Z'),
					bloodline_id: 1,
					corporation_id: 1,
					description: 'description',
				},
			}),
		}))

		vi.mock('../../../../Postgres/pgUpsert', () => ({
			default: vi.fn().mockResolvedValue(null),
		}))

		await PublicCharacterData({ characterID: BigInt(1), accessToken: 'Token' })
		expect(ESIRequest).toBeCalledTimes(1)
		expect(ESIRequest).toBeCalledWith('characters/1')
		expect(pgUpsert).toBeCalledTimes(2)
		const mockData = {
			name: 'name',
			characterID: 1n,
			race_id: 1,
			birthday: new Date('2022-10-06T02:09:38.981Z'),
			bloodline_id: 1,
			corporation_id: 1,
			description: 'description',
		}

		expect(pgUpsert).toBeCalledWith('character_sheet', mockData, [ 'character_id' ])
	})
})
