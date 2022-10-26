// @vitest-environment jsdom
import React from 'react'

import {
	expect, test, afterEach, describe, beforeEach, vi,
} from 'vitest'
import {
	cleanup, render, screen,
} from '@testing-library/react'

import Blueprints from './Blueprints'

describe('Blueprint', () => {
	beforeEach(() => {
		render(<Blueprints />)
		vi.mock('../../../../prisma/PrismaClient', () => ({
			default: {
				blueprint: {
					findMany: vi.fn().mockResolvedValue([
						{
							itemID: 1,
							locationFlag: 'locationFlag',
							locationID: 1,
							materialEfficiency: 1,
							quantity: 1,
							runs: 1,
							timeEfficiency: 1,
							typeID: 1,
						},
					]),
				},
			},
		}))
	})

	afterEach(cleanup)

	test('renders without crashing', () => {
		expect(screen).toBeTruthy()
	})

	test('renders a table', () => {
		expect(screen.getByRole('table')).toBeTruthy()
	})
})
