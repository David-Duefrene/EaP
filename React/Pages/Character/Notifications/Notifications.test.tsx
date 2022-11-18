// @vitest-environment jsdom
import React from 'react'
import {
	expect, test, afterEach, describe, beforeEach, vi,
} from 'vitest'

import {
	cleanup, render, screen, waitForElementToBeRemoved,
} from '@testing-library/react'
import { SenderType, NotificationType } from '../../../../Types/APIResponses/EveOfficial/Notifications.types'
import Notifications from './Notifications'

describe('Notifications', () => {
	beforeEach(() => {
		window.getCharacter = {
			notifications: () => Promise.resolve([
				{
					isRead: false,
					notificationID: 1,
					senderID: 1,
					senderType: SenderType.character,
					text: 'Notification 1',
					timestamp: new Date(),
					type: NotificationType.CharAppAcceptMsg,
				},
			]),
		}

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
