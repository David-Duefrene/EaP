import {
	expect, test, afterEach, describe, vi,
} from 'vitest'

import notifications from '../Notifications'
import ESIRequest from '../../../axiosRequests/ESIRequest'
import pgUpsert from '../../../../Postgres/pgUpsert'

describe('notifications', () => {
	afterEach(() => {
		vi.restoreAllMocks()
	})

	test('should be able to get notifications', async () => {
		vi.mock('../../../axiosRequests/ESIRequest', () => ({
			default: vi.fn().mockResolvedValue({
				data: [ {
					notification_id: 1,
					sender_id: 1,
					sender_type: 'senderType',
					sent_date: new Date('2022-10-06T02:09:38.981Z'),
					text: 'text',
					type: 'type',
				} ],
			}),
		}))

		vi.mock('../../../../Postgres/pgUpsert', () => ({
			default: vi.fn().mockResolvedValue(null),
		}))

		await notifications({ characterID: BigInt(1), accessToken: 'Token' })

		expect(ESIRequest).toBeCalledTimes(1)
		expect(ESIRequest).toBeCalledWith('characters/1/notifications', 'Token')
		expect(pgUpsert).toBeCalledTimes(1)
		const mockData = {
			character_id: BigInt(1),
			notification_id: 1,
			sender_id: 1,
			sender_type: 'senderType',
			sent_date: new Date('2022-10-06T02:09:38.981Z'),
			text: 'text',
			type: 'type',
		}
		expect(pgUpsert).toBeCalledWith('notification', mockData, [ 'character_id', 'notification_id' ])
	})
})
