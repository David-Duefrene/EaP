import {
	expect, test, afterEach, describe, vi,
} from 'vitest'

import standings from '../Standings'
import ESIRequest from '../../../axiosRequests/ESIRequest'
import pgUpsert from '../../../../Postgres/pgUpsert'

describe('standings', () => {
	afterEach(() => {
		vi.restoreAllMocks()
	})

	test('should be able to get standings', async () => {
		vi.mock('../../../axiosRequests/ESIRequest', () => ({
			default: vi.fn().mockResolvedValue({
				data: [ {
					fromID: 1,
					fromType: 'agent',
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
			fromID: 1,
			fromType: 'agent',
			standing: 1,
			characterID: BigInt(1),
		}
		expect(pgUpsert).toBeCalledWith('Standings', mockData, [ 'characterID', 'fromID' ])
	})
})
