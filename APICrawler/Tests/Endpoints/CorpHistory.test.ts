import {
	expect, test, afterEach, describe, vi,
} from 'vitest'

import corpHistory from '../CorpHistory'
import ESIRequest from '../../../axiosRequests/ESIRequest'
import pgUpsert from '../../../../Postgres/pgUpsert'

describe('corpHistory', () => {
	afterEach(() => {
		vi.restoreAllMocks()
	})

	test('should be able to get corp history', async () => {
		vi.mock('../../../axiosRequests/ESIRequest', () => ({
			default: vi.fn().mockResolvedValue({
				data: [ {
					record_id: 1,
					corporation_id: 1,
					start_date: new Date('2022-10-06T02:09:38.981Z'),
				} ],
			}),
		}))

		vi.mock('../../../../Postgres/pgUpsert', () => ({
			default: vi.fn().mockResolvedValue(null),
		}))

		await corpHistory({ characterID: BigInt(1), accessToken: 'Token' })

		expect(ESIRequest).toBeCalledTimes(1)
		expect(ESIRequest).toBeCalledWith('characters/1/corporationhistory')
		expect(pgUpsert).toBeCalledTimes(1)
		const mockData = {
			record_id: 1,
			corporation_id: 1,
			start_date: new Date('2022-10-06T02:09:38.981Z'),
			characterID: BigInt(1),
		}
		expect(pgUpsert).toBeCalledWith('corporation_history', mockData, [ 'record_id' ])
	})
})
