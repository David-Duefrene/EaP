// @vitest-environment jsdom
import React from 'react'

import {
	expect, test, afterEach, describe, beforeEach, vi,
} from 'vitest'

import {
	cleanup, render, screen, waitForElementToBeRemoved,
} from '@testing-library/react'

import CorpHistory from './CorpHistory'

describe('CorpHistory', () => {
	beforeEach(() => {
		vi.mock('../../../../prisma/PrismaClient', () => ({
			default: {
				corpHistory: {
					findMany: vi.fn().mockResolvedValue([
						{
							corporationID: 1,
							recordID: 2,
							startDate: '2021-01-01',
						},
					]),
				},
			},
		}))

		render(<CorpHistory />)
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
