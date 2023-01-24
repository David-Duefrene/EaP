import {
	expect, test, afterEach, describe, vi,
} from 'vitest'

import clones from './Clones'
import ESIRequest from '../../../axiosRequests/ESIRequest'
import pgUpsert from '../../../../Postgres/pgUpsert'

describe('clones', () => {
	afterEach(() => {
		vi.restoreAllMocks()
	})

	test('should be able to get clones', async () => {
		vi.mock('../../../axiosRequests/ESIRequest', () => ({
			default: vi.fn().mockResolvedValue({
				data: {
					characterID: BigInt(1),
					jump_clones: [
						{
							implants: [ 1, 2 ],
							jump_clone_id: 1,
							location_id: BigInt(1),
							location_type: 'station',
							name: 'Clone',
						},
					],
					home_location: {
						location_id: BigInt(1),
						location_type: 'station',
					},
					last_clone_jump_date: '2021-01-01T00:00:00Z',
					last_station_change_date: '2021-01-01T00:00:00Z',
				},
			}),
		}))

		vi.mock('../../../../Postgres/pgUpsert', () => ({
			default: vi.fn().mockResolvedValue(null),
		}))

		await clones({ characterID: BigInt(1), accessToken: 'Token' })

		expect(ESIRequest).toBeCalledTimes(2)
		expect(ESIRequest).toBeCalledWith('characters/1/clones/', 'Token')
		expect(pgUpsert).toBeCalledTimes(2)
		const mockData ={
			characterID: BigInt(1),
			implants: [ 1, 2 ],
			jump_clone_id: 1,
			location_id: BigInt(1),
			location_type: 'station',
			name: 'Clone',
		}
		expect(pgUpsert).toBeCalledWith('clones', mockData, [ 'character_id', 'jump_clone_id' ])
	})
})
