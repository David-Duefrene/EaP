import {
	expect, test, afterEach, describe, vi,
} from 'vitest'

import contactNotification from './ContactNotification'
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
					notification_id: 1,
					sent_date: new Date('2022-10-06T02:09:38.981Z'),
					sender_character_id: 1,
					standing_level: -5.5,
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
			notification_id: 1,
			sent_date: new Date('2022-10-06T02:09:38.981Z'),
			sender_character_id: 1,
			standing_level: -5.5,
		}
		expect(pgUpsert).toBeCalledWith('contact_notification', mockData, [ 'character_id', 'notification_id' ])
	})
})
