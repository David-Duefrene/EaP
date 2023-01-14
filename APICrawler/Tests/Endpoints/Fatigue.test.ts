import {
	expect, test, afterEach, describe, vi,
} from 'vitest'

import fatigue from '../../Endpoints/Character/Fatigue'
import ESIRequest from '../../axiosRequests/ESIRequest'
import pgUpsert from '../../../Postgres/pgUpsert'

describe('fatigue', () => {
	afterEach(() => {
		vi.restoreAllMocks()
	})

	test('should be able to get fatigue', async () => {
		vi.mock('../../../axiosRequests/ESIRequest', () => ({
			default: vi.fn().mockResolvedValue({
				data: {
					last_jump_date: new Date('2022-10-06T02:09:38.981Z'),
					last_update_date: new Date('2022-10-06T02:09:38.981Z'),
					jump_fatigue_expire_date: new Date('2022-10-06T02:09:38.981Z'),
				},
			}),
		}))

		vi.mock('../../../../Postgres/pgUpsert', () => ({
			default: vi.fn().mockResolvedValue(null),
		}))

		await fatigue({ characterID: BigInt(1), accessToken: 'Token' })

		expect(ESIRequest).toBeCalledTimes(1)
		expect(ESIRequest).toBeCalledWith('characters/1/fatigue', 'Token')
		expect(pgUpsert).toBeCalledTimes(1)
		const mockData = {
			characterID: BigInt(1),
			last_jump_date: new Date('2022-10-06T02:09:38.981Z'),
			last_update_date: new Date('2022-10-06T02:09:38.981Z'),
			jump_fatigue_expire_date: new Date('2022-10-06T02:09:38.981Z'),
		}
		expect(pgUpsert).toBeCalledWith('fatigue', mockData, [ 'character_id' ])
	})
})
