// @vitest-environment jsdom
import React from 'react'

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

		render(<Standings />)
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
		expect(screen.getByRole('table')).toBeTruthy()
	})
})
