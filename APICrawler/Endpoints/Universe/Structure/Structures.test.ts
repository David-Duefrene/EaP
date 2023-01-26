import {
	expect, test, afterEach, describe, vi,
} from 'vitest'

import pgUpsert from '../../../../Postgres/pgUpsert'
import ESIRequest from '../../../axiosRequests/ESIRequest'

import structures from './Structures'

describe('structures', () => {
	afterEach(() => {
		vi.restoreAllMocks()
	})

	test('should be able to get structures', async () => {
		vi.mock('../../../axiosRequests/ESIRequest', () => ({
			default: vi.fn().mockResolvedValue({
				station_id: 1n,
				name: 'name',
				owner: 1,
				system_id: 1,
				type_id: 1,
			}),
		}))

		vi.mock('../../../../Postgres/pgUpsert', () => ({
			default: vi.fn().mockReturnValue(null),
		}))

		await structures({ characterID: 1n, accessToken: 'Token' }, 1n)

		expect(ESIRequest).toBeCalledTimes(1)
		expect(ESIRequest).toBeCalledWith('universe/stations/1', 'Token')
		expect(pgUpsert).toBeCalledTimes(1)
		const mockData = {
			structureID: 1n,
			name: 'name',
			ownerID: 1,
			solarSystemID: 1,
			typeID: 1,
		}
		expect(pgUpsert).toBeCalledWith('structure', mockData, [ 'structure_id' ])
	})
})

