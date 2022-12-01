import {
	expect, test, afterEach, describe, vi,
} from 'vitest'

import contactNotification from '../ContactNotification'
import ESIRequest from '../../../axiosRequests/ESIRequest'
import pgUpsert from '../../../../Postgres/pgUpsert'

describe('contactNotification', () => {
	afterEach(() => {
		vi.restoreAllMocks()
	})

	test('should be able to get contactNotification', async () => {
		vi.mock('../../../axiosRequests/ESIRequest', () => ({
			default: vi.fn().mockResolvedValue({
				data: [ {
					message: 'text',
					notificationID: 1,
					sentDate: new Date('2022-10-06T02:09:38.981Z'),
					senderCharacterID: 1,
					standingLevel: -5.5,
				} ],
			}),
		}))

		vi.mock('../../../../Postgres/pgUpsert', () => ({
			default: vi.fn().mockResolvedValue(null),
		}))

		await contactNotification({ characterID: BigInt(1), accessToken: 'Token' })

		expect(ESIRequest).toBeCalledTimes(1)
		expect(ESIRequest).toBeCalledWith('characters/1/notifications/contacts', 'Token')
		expect(pgUpsert).toBeCalledTimes(1)
		const mockData = {
			characterID: BigInt(1),
			message: 'text',
			notificationID: 1,
			sentDate: new Date('2022-10-06T02:09:38.981Z'),
			senderCharacterID: 1,
			standingLevel: -5.5,
		}
		expect(pgUpsert).toBeCalledWith('ContactNotification', mockData, [ 'characterID', 'notificationID' ])
	})
})
