// @vitest-environment jsdom
import React from 'react'
import {
	createBrowserRouter, createRoutesFromElements, RouterProvider, Route,
} from 'react-router-dom'

import {
	expect, test, describe,
} from 'vitest'
import { render, screen } from '@testing-library/react'

import BackButton from './BackButton'

describe('BackButton', () => {
	test('should render a button', async () => {
		const router = createBrowserRouter(createRoutesFromElements(
			<Route path='/' element={<BackButton />} />,
		))
		render(<RouterProvider router={router}></RouterProvider>)
		const button = await screen.findByText('Back')
		expect(button.tabIndex).toEqual(0)
	})
})
