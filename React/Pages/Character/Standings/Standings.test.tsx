// @vitest-environment jsdom
import React from 'react'
import {
	createBrowserRouter, createRoutesFromElements, RouterProvider, Route,
} from 'react-router-dom'

import {
	expect, test, afterEach, describe, beforeEach, vi,
} from 'vitest'

import {
	cleanup, render, screen, waitForElementToBeRemoved,
} from '@testing-library/react'

import Standings from './Standings'

describe('Standings', () => {
	beforeEach(() => {
		vi.mock('../../../../prisma/PrismaClient', () => ({
			default: {
				Standings: {
					findMany: vi.fn().mockResolvedValue([
						{
							standingID: 1,
							standingCharacterID: 1,
							standingFromID: 1,
							standingFromType: 'Corporation',
							standingStanding: 1,
						},
					]),
				},
			},
		}))

		const router = createBrowserRouter(createRoutesFromElements(
			<Route path='/' element={<Standings />} />,
		))

		render(<RouterProvider router={router} />)
	})

	afterEach(() => {
		cleanup()
	})

	test('loads loading... on initial state', () => {
		expect(screen).toBeTruthy()
		expect(screen.getByText('Loading...')).toBeTruthy()
	})

	test('renders a back button', async () => {
		await waitForElementToBeRemoved(() => screen.getByText('Loading...'))
		expect(screen.getByText('Back')).toBeTruthy()
	})

	test('renders a table', async () => {
		await waitForElementToBeRemoved(() => screen.getByText('Loading...'))
		expect(screen.getByRole('table')).toBeTruthy()
	})
})
