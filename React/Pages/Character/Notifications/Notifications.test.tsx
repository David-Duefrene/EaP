// @vitest-environment jsdom
import React from 'react'
import {
	expect, test, afterEach, describe, beforeEach, vi,
} from 'vitest'

import {
	cleanup, render, screen, waitForElementToBeRemoved,
} from '@testing-library/react'

import Notifications from './Notifications'

describe('Notifications', () => {
	beforeEach(() => {
		vi.mock('../../../../prisma/PrismaClient', () => ({
			default: {
				Notification: {
					findMany: vi.fn().mockResolvedValue([
						{
							notificationID: 1,
							notificationCharacterID: 1,
							notificationType: 'Character',
							notificationText: 'Notification 1',
							notificationSentDate: new Date(),
							notificationRead: false,
						},
						{
							notificationID: 2,
							notificationCharacterID: 1,
							notificationType: 'Character',
							notificationText: 'Notification 2',
							notificationSentDate: new Date(),
							notificationRead: false,
						},
					]),
				},
			},
		}))

		render(<Notifications />)
	})

	afterEach(() => {
		cleanup()
	})

	test('loads loading... on initial state', () => {
		expect(screen).toBeTruthy()
		expect(screen.getByText('Loading...')).toBeTruthy()
	})

	test('renders a table', async () => {
		await waitForElementToBeRemoved(() => screen.getByText('Loading...'))
		expect(screen.findAllByRole('table')).toBeTruthy()
	})
})
