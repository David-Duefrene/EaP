import {
	expect, test, afterEach, describe, vi,
} from 'vitest'

import corpRoles from '../../Endpoints/Character/CorpRoles'
import ESIRequest from '../../axiosRequests/ESIRequest'
import pgUpsert from '../../../Postgres/pgUpsert'

describe('corpRoles', () => {
	afterEach(() => {
		vi.restoreAllMocks()
	})

	test('should be able to get corp roles', async () => {
		vi.mock('../../axiosRequests/ESIRequest', () => ({
			default: vi.fn().mockResolvedValue({
				data: {
					roles: [ 'Director' ],
					roles_at_base: [ 'Director' ],
					roles_at_hq: [ 'Director' ],
					roles_at_other: [ 'Director' ],
				},
			}),
		}))

		vi.mock('../../../Postgres/pgUpsert', () => ({
			default: vi.fn().mockResolvedValue(null),
		}))

		await corpRoles({ characterID: BigInt(1), accessToken: 'Token' })

		expect(ESIRequest).toBeCalledTimes(1)
		expect(ESIRequest).toBeCalledWith('characters/1/roles', 'Token')
		expect(pgUpsert).toBeCalledTimes(1)
		const mockData = {
			characterID: BigInt(1),
			roles: [ 'Director' ],
			rolesAtBase: [ 'Director' ],
			rolesAtHQ: [ 'Director' ],
			rolesAtOther: [ 'Director' ],
		}

		expect(pgUpsert).toBeCalledWith('corp_roles', mockData, [ 'character_id' ])
	})
})
