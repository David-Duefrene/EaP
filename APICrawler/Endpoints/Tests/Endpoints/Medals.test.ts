import {
	expect, test, afterEach, describe, vi,
} from 'vitest'

import medals from '../../Endpoints/Character/Medals'
import ESIRequest from '../../axiosRequests/ESIRequest'
import pgUpsert from '../../../Postgres/pgUpsert'

describe('medals', () => {
	afterEach(() => {
		vi.restoreAllMocks()
	})

	test('should be able to get medals', async () => {
		vi.mock('../../axiosRequests/ESIRequest', () => ({
			default: vi.fn().mockResolvedValue({
				data: [ {
					medal_id: 1,
					reason: 'reason',
					status: 'status',
					issuer_id: 1,
					issued: new Date('2022-10-06T02:09:38.981Z'),
					title: 'title',
					description: 'description',
					corporation_id: 1,
					graphics: {
						color: 1,
						graphic: 'graphic',
						layer: 1,
						part: 1,
					},
				} ],
			}),
		}))

		vi.mock('../../../Postgres/pgUpsert', () => ({
			default: vi.fn().mockResolvedValue(null),
		}))

		await medals({ characterID: BigInt(1), accessToken: 'Token' })

		expect(ESIRequest).toBeCalledTimes(1)
		expect(ESIRequest).toBeCalledWith('characters/1/medals', 'Token')
		expect(pgUpsert).toBeCalledTimes(1)
		const mockData = {
			medal_id: 1,
			reason: 'reason',
			status: 'status',
			issuer_id: 1,
			issued: new Date('2022-10-06T02:09:38.981Z'),
			title: 'title',
			description: 'description',
			corporation_id: 1,
			characterID: BigInt(1),
			graphics: JSON.stringify({
				color: 1,
				graphic: 'graphic',
				layer: 1,
				part: 1,
			}),

		}
		expect(pgUpsert).toBeCalledWith('medal', mockData, [ 'character_id', 'medal_id' ])
	})
})
