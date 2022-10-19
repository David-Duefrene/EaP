import {
	expect, test, afterEach, describe, vi,
} from 'vitest'

import notifications from '../Notifications'
import ESIRequest from '../../../axiosRequests/ESIRequest'
import prisma from '../../../../prisma/PrismaClient'

describe('notifications', () => {
	afterEach(() => {
		vi.restoreAllMocks()
	})

	test('should be able to get notifications', async () => {
		vi.mock('../../../axiosRequests/ESIRequest', () => ({
			default: vi.fn().mockResolvedValue({
				data: [ {
					notificationID: 1,
					senderID: 1,
					senderType: 'senderType',
					sentDate: new Date('2022-10-06T02:09:38.981Z'),
					text: 'text',
					type: 'type',
				} ],
			}),
		}))

		vi.mock('../../../../prisma/PrismaClient', () => ({
			default: {
				Notification: {
					upsert: vi.fn().mockResolvedValue(null),
				},
			},
		}))

		await notifications({ characterID: '1', accessToken: 'Token' })

		expect(ESIRequest).toBeCalledTimes(1)
		expect(ESIRequest).toBeCalledWith('characters/1/notifications', 'Token')
		expect(prisma.Notification.upsert).toBeCalledTimes(1)
		const mockData = {
			notificationID: 1,
			senderID: 1,
			senderType: 'senderType',
			sentDate: new Date('2022-10-06T02:09:38.981Z'),
			text: 'text',
			type: 'type',
		}
		expect(prisma.Notification.upsert).toBeCalledWith({
			where: { notificationID: 1 },
			update: { ...mockData, characterID: '1' },
			create: { ...mockData, characterID: '1' },
		})
	})
})
