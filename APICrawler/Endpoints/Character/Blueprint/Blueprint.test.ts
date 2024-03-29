import {
	expect, test, afterEach, describe, vi,
} from 'vitest'

import blueprints from './Blueprint'
import structures from '../../Universe/Structure/Structures'
import ESIRequest from '../../../axiosRequests/ESIRequest'
import pgUpsert from '../../../../Postgres/pgUpsert'

describe('blueprints', () => {
	afterEach(() => {
		vi.restoreAllMocks()
	})

	test('should be able to get blueprints', async () => {
		vi.mock('../../../axiosRequests/ESIRequest', () => ({
			default: vi.fn().mockResolvedValue([ {
				item_id: 1,
				location_id: 1,
				type_id: 1,
				quantity: 1,
				time_efficiency: 1,
				material_efficiency: 1,
				runs: 1,
			} ]),
		}))

		vi.mock('../../../../Postgres/pgUpsert', () => ({
			default: vi.fn().mockResolvedValue(null),
		}))

		vi.mock('../../Universe/Structure/Structures', () => ({
			default: vi.fn().mockReturnValue(null),
		}))

		await blueprints({ characterID: BigInt(1), accessToken: 'Token' })

		expect(ESIRequest).toBeCalledTimes(1)
		expect(ESIRequest).toBeCalledWith('characters/1/blueprints', 'Token')
		expect(structures).toBeCalledTimes(1)
		expect(pgUpsert).toBeCalledTimes(1)
		const mockData = {
			characterID: BigInt(1),
			item_id: 1,
			location_id: 1,
			type_id: 1,
			quantity: 1,
			time_efficiency: 1,
			material_efficiency: 1,
			runs: 1,
		}
		expect(pgUpsert).toBeCalledWith('blueprint', mockData, [ 'character_id', 'item_id' ])
	})
})
