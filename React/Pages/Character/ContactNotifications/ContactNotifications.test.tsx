// @vitest-environment jsdom
import React from 'react'
import {
	createBrowserRouter, createRoutesFromElements, RouterProvider, Route,
} from 'react-router-dom'

import {
	expect, test, describe,
} from 'vitest'
import { render, screen } from '@testing-library/react'

import ContactNotifications from './ContactNotifications'

describe('ContactNotifications', () => {
	test('should render a back button', async () => {
		const router = createBrowserRouter(createRoutesFromElements(
			<Route path='/' element={<ContactNotifications />} />,
		))
		render(<RouterProvider router={router}></RouterProvider>)
		const button = await screen.findByText('Back')
		expect(button.tabIndex).toEqual(0)
	})

	test('should render a Table', () => {
		const router = createBrowserRouter(createRoutesFromElements(
			<Route path='/' element={<ContactNotifications />} />,
		))
		render(<RouterProvider router={router}></RouterProvider>)
		const table = screen.findAllByRole('table')
		expect(table).toBeTruthy()
	})
})
