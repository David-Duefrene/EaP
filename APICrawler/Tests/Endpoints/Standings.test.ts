import {
	expect, test, afterEach, describe, vi,
} from 'vitest'

import standings from '../APICrawler/Endpoints/Character/Standings'
import ESIRequest from '../APICrawler/axiosRequests/ESIRequest'
import pgUpsert from '../Postgres/pgUpsert'

describe('standings', () => {
	afterEach(() => {
		vi.restoreAllMocks()
	})

	test('should be able to get standings', async () => {
		vi.mock('../../../axiosRequests/ESIRequest', () => ({
			default: vi.fn().mockResolvedValue({
				data: [ {
					from_id: 1,
					from_type: 'agent',
					standing: 1,
				} ],
			}),
		}))

		vi.mock('../../../../Postgres/pgUpsert', () => ({
			default: vi.fn().mockResolvedValue(null),
		}))

		await standings({ characterID: BigInt(1), accessToken: 'Token' })

		expect(ESIRequest).toBeCalledTimes(1)
		expect(ESIRequest).toBeCalledWith('characters/1/standings', 'Token')
		expect(pgUpsert).toBeCalledTimes(1)
		const mockData = {
			from_id: 1,
			from_type: 'agent',
			standing: 1,
			characterID: BigInt(1),
		}
		expect(pgUpsert).toBeCalledWith('standings', mockData, [ 'character_id', 'from_id' ])
	})
})
