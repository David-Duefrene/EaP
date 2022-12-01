import {
	expect, test, afterEach, describe, vi,
} from 'vitest'

import blueprints from '../Blueprints'
import ESIRequest from '../../../axiosRequests/ESIRequest'
import pgUpsert from '../../../../Postgres/pgUpsert'

describe('blueprints', () => {
	afterEach(() => {
		vi.restoreAllMocks()
	})

	test('should be able to get blueprints', async () => {
		vi.mock('../../../axiosRequests/ESIRequest', () => ({
			default: vi.fn().mockResolvedValue({
				data: [ {
					itemID: 1,
					locationID: 1,
					typeID: 1,
					quantity: 1,
					timeEfficiency: 1,
					materialEfficiency: 1,
					runs: 1,
				} ],
			},
			),
		}))

		vi.mock('../../../../Postgres/pgUpsert', () => ({
			default: vi.fn().mockResolvedValue(null),
		}))

		await blueprints({ characterID: BigInt(1), accessToken: 'Token' })

		expect(ESIRequest).toBeCalledTimes(1)
		expect(ESIRequest).toBeCalledWith('characters/1/blueprints', 'Token')
		expect(pgUpsert).toBeCalledTimes(1)
		const mockData = {
			characterID: BigInt(1),
			itemID: 1,
			locationID: 1,
			typeID: 1,
			quantity: 1,
			timeEfficiency: 1,
			materialEfficiency: 1,
			runs: 1,
		}
		expect(pgUpsert).toBeCalledWith('Blueprint', mockData, [ 'characterID', 'itemID' ])
	})
})
