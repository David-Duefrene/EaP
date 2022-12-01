import {
	expect, test, afterEach, describe, vi,
} from 'vitest'

import title from '../Title'
import ESIRequest from '../../../axiosRequests/ESIRequest'
import pgUpsert from '../../../../Postgres/pgUpsert'

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

		vi.mock('../../../../Postgres/pgUpsert', () => ({
			default: vi.fn().mockResolvedValue(null),
		}))

		await title({ characterID: BigInt(1), accessToken: 'Token' })

		expect(ESIRequest).toBeCalledTimes(1)
		expect(ESIRequest).toBeCalledWith('characters/1/titles', 'Token')
		expect(pgUpsert).toBeCalledTimes(1)

		const mockData = { name: 'name', titleID: 1, characterID: BigInt(1) }
		expect(pgUpsert).toBeCalledWith( 'Title', mockData, [ 'characterID', 'titleID' ])
	})
})
