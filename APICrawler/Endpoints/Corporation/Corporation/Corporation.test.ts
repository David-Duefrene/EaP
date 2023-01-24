import {
	expect, test, afterEach, describe, vi,
} from 'vitest'

import ESIRequest from '../../../axiosRequests/ESIRequest'
import pgUpsert from '../../../../Postgres/pgUpsert'

import Corporation from './Corporation'

describe('Corporation', () => {
	afterEach(() => {
		vi.restoreAllMocks()
	})

	test('should be able to get corporation data', async () => {
		vi.mock('../../../axiosRequests/ESIRequest', () => ({
			default: vi.fn().mockResolvedValue({
				data: {
					name: 'name',
					ticker: 'ticker',
					ceo_id: 1,
					creator_id: 1,
					home_station_id: 1,
					creation_date: new Date('2022-10-06T02:09:38.981Z'),
					member_count: 1,
					tax_rate: 1,
					url: 'url',
					description: 'description',
				},
			}),
		}))

		vi.mock('../../../../Postgres/pgUpsert', () => ({
			default: vi.fn().mockResolvedValue(null),

		}))

		await Corporation(1)
		expect(ESIRequest).toBeCalledTimes(1)
		expect(ESIRequest).toBeCalledWith('corporations/1')
		expect(pgUpsert).toBeCalledTimes(1)
		const mockData = {
			corporationID: 1,
			name: 'name',
			ticker: 'ticker',
			ceo_id: 1,
			creator_id: 1,
			home_station_id: 1,
			creation_date: new Date('2022-10-06T02:09:38.981Z'),
			member_count: 1,
			tax_rate: 1,
			url: 'url',
			description: 'description',
		}

		expect(pgUpsert).toBeCalledWith('corporation', mockData, [ 'corporation_id' ])
	})
})
