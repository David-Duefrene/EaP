// @vitest-environment jsdom
import React from 'react'

import {
	cleanup, render, screen,
} from '@testing-library/react'

import ContactNotifications from './ContactNotifications'

import {
	expect, test, describe, beforeEach, afterEach,
} from 'vitest'

describe('ContactNotifications', () => {
	beforeEach(() => {
		window.getCharacter = {
			contactNotifications: () => Promise.resolve([
				{
					message: 'messageDataText',
					standingLevel: 5,
					sendDate: new Date(),
					senderCharacterID: 4,
					notificationID: 5,
				},
			]),
		}

		afterEach(() => {
			cleanup()
		})

		render(<ContactNotifications />)
	})

	test('should render a Table', () => {
		const table = screen.findAllByRole('table')
		expect(table).toBeTruthy()
	})
})
