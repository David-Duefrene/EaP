// @vitest-environment jsdom
import React from 'react'

import {
	cleanup, render, screen,
} from '@testing-library/react'

import ContactNotifications from './ContactNotifications'

import {
	expect, test, describe, vi, beforeEach, afterEach,
} from 'vitest'

describe('ContactNotifications', () => {
	beforeEach(() => {
		vi.mock('../../../../prisma/PrismaClient', () => ({
			default: {
				contactNotification: {
					findMany: vi.fn().mockResolvedValue([
						{
							message: 'messageDataText',
							standingLevel: 'messageTypeText',
							sentDate: 'sentDateText',
							senderCharacterID: 4,
							notificationID: 5,
						},
					]),
				},
			},
		}))

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
