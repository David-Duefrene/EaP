// @vitest-environment jsdom
import React from 'react'

import {
	expect, test, afterEach, describe, beforeEach, vi,
} from 'vitest'

import {
	cleanup, render, screen, waitForElementToBeRemoved,
} from '@testing-library/react'

import Titles from './Titles'

describe('Titles', () => {
	beforeEach(() => {
		vi.mock('../../../../prisma/PrismaClient', () => ({
			default: {
				Title: {
					findMany: vi.fn().mockResolvedValue([
						{
							titleID: 1,
							titleName: 'Test',
							titleColor: 'Test',
							titlePinned: true,
							titleRoles: [ 'Test' ],
						},
					]),
				},
			},
		}))

		render(<Titles />)
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
