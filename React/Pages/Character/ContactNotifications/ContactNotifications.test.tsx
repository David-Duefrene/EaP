// @vitest-environment jsdom
import React from 'react'
import {
	createBrowserRouter, createRoutesFromElements, RouterProvider, Route,
} from 'react-router-dom'

import {
	cleanup, render, screen, waitForElementToBeRemoved,
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

		const router = createBrowserRouter(createRoutesFromElements(
			<Route path='/' element={<ContactNotifications />} />,
		))
		render(<RouterProvider router={router}></RouterProvider>)
	})

	test('should render a back button', async () => {
		await waitForElementToBeRemoved(() => screen.getByText('Loading...'))
		const button = await screen.findByText('Back')
		expect(button.tabIndex).toEqual(0)
	})

	test('should render a Table', () => {
		const table = screen.findAllByRole('table')
		expect(table).toBeTruthy()
	})
})
