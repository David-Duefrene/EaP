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

import CorpRolesList from './CorpRoles'

describe('CorpRolesList', () => {
	beforeEach(() => {
		vi.mock('../../../../prisma/PrismaClient', () => ({
			default: {
				corpRoles: {
					findUnique: vi.fn().mockResolvedValue({
						roles: [ 'Director' ],
						rolesAtBase: [ 'BaseDirector' ],
						rolesAtHQ: [ 'HQDirector' ],
						rolesAtOther: [ 'OtherDirector' ],
					}),
				},
			},
		}))

		const router = createBrowserRouter(createRoutesFromElements(
			<Route path='/' element={<CorpRolesList />} />,
		))

		render(<RouterProvider router={router} />)
	})

	afterEach(() => {
		cleanup()
	})

	test('should render a table with a header and a body', async () => {
		await waitForElementToBeRemoved(() => screen.getByText('Loading...'))
		expect(screen.getByRole('table')).toBeTruthy()
		expect(screen.getAllByRole('row')).toHaveLength(4)
		expect(screen.getAllByRole('cell')).toHaveLength(8)
	})
})
