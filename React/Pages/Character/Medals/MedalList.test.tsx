// @vitest-environment jsdom
import React from 'react'

import {
	expect, test, afterEach, describe, beforeEach, vi,
} from 'vitest'

import {
	cleanup, render, screen, waitForElementToBeRemoved,
} from '@testing-library/react'

import MedalList from './MedalList'

describe('MedalList', () => {
	beforeEach(() => {
		vi.mock('../../../../prisma/PrismaClient', () => ({
			default: {
				Medal: {
					findMany: vi.fn().mockResolvedValue([
						{
							medalID: 1,
							medalName: 'Medal 1',
							medalDescription: 'Medal 1 Description',
							medalCorporationID: 1,
							medalCreatorID: 1,
							medalTitle: 'Medal 1 Title',
							medalReason: 'Medal 1 Reason',
							medalStatus: 'public',
							medalCreated: new Date(),
							medalLastUpdated: new Date(),
						},
						{
							medalID: 2,
							medalName: 'Medal 2',
							medalDescription: 'Medal 2 Description',
							medalCorporationID: 1,
							medalCreatorID: 1,
							medalTitle: 'Medal 2 Title',
							medalReason: 'Medal 2 Reason',
							medalStatus: 'public',
							medalCreated: new Date(),
							medalLastUpdated: new Date(),
						},
					]),
				},
			},
		}))

		render(<MedalList />)
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
