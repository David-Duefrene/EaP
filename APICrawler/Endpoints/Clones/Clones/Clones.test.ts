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
				data: [
					{
						characterID: BigInt(1),
						jumpCloneID: 1,
						locationID: BigInt(1),
						locationType: 'station',
						implants: [ 1, 2 ],
						name: 'Clone',
					},
				],
			}),
		}))

		vi.mock('../../../../Postgres/pgUpsert', () => ({
			default: vi.fn().mockResolvedValue(null),
		}))

		await clones({ characterID: BigInt(1), accessToken: 'Token' })

		expect(ESIRequest).toBeCalledTimes(1)
		expect(ESIRequest).toBeCalledWith('/characters/1/clones/', 'Token')
		expect(pgUpsert).toBeCalledTimes(1)
		const mockData = {
			characterID: BigInt(1),
			jumpCloneID: 1,
			locationID: BigInt(1),
			locationType: 'station',
			implants: [ 1, 2 ],
			name: 'Clone',
		}
		expect(pgUpsert).toBeCalledWith('clone', mockData, [ 'character_id', 'jump_clone_id' ])
	})
})
