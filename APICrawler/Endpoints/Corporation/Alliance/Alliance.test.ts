import {
	expect, test, afterEach, describe, vi,
} from 'vitest'

import ESIRequest from '../../../axiosRequests/ESIRequest'
import pgUpsert from '../../../../Postgres/pgUpsert'

import Alliance from './Alliance'

describe('Alliance', () => {
	afterEach(() => {
		vi.restoreAllMocks()
	})

	test('should be able to get alliance data', async () => {
		vi.mock('../../../axiosRequests/ESIRequest', () => ({
			default: vi.fn().mockResolvedValue({
				name: 'name',
				ticker: 'ticker',
				creator_id: 1,
				creator_corporation_id: 1,
				date_founded: new Date('2022-10-06T02:09:38.981Z'),
				executor_corporation_id: 1,
				faction_id: 1,
				tax_rate: 1,
				url: 'url',
				description: 'description',
			}),
		}))

		vi.mock('../../../../Postgres/pgUpsert', () => ({
			default: vi.fn().mockResolvedValue(null),

		}))

		await Alliance(1)
		expect(ESIRequest).toBeCalledTimes(1)
		expect(ESIRequest).toBeCalledWith('alliances/1')
		expect(pgUpsert).toBeCalledTimes(1)
		const mockData = {
			allianceID: 1,
			name: 'name',
			ticker: 'ticker',
			creator_id: 1,
			creator_corporation_id: 1,
			date_founded: new Date('2022-10-06T02:09:38.981Z'),
			executor_corporation_id: 1,
			faction_id: 1,
			tax_rate: 1,
			url: 'url',
			description: 'description',
		}

		expect(pgUpsert).toBeCalledWith('alliance', mockData, [ 'alliance_id' ])
	})
})
