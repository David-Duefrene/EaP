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
					recordID: 1,
					corporationID: 1,
					startDate: new Date('2022-10-06T02:09:38.981Z'),
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
			recordID: 1,
			corporationID: 1,
			startDate: new Date('2022-10-06T02:09:38.981Z'),
			characterID: BigInt(1),
		}
		expect(pgUpsert).toBeCalledWith('CorpHistory', mockData, [ 'recordID' ])
	})
})
