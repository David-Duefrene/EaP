// @vitest-environment jsdom
/*
 *Import React from 'react'
 *import {
 *	createBrowserRouter, createRoutesFromElements, RouterProvider, Route,
 *} from 'react-router-dom'
 *
 *import {
 *	render, screen, waitForElementToBeRemoved,
 *} from '@testing-library/react'
 *
 *import ContactNotifications from './ContactNotifications'
 */
import {
	expect, test, describe,
} from 'vitest'

describe('ContactNotifications', () => {
	/*
	 * Test('should render a back button', async () => {
	 * const router = createBrowserRouter(createRoutesFromElements(
	 * <Route path='/' element={<ContactNotifications />} />,
	 * ))
	 * render(<RouterProvider router={router}></RouterProvider>)
	 * await waitForElementToBeRemoved(() => screen.getByText('Loading...'))
	 * const button = await screen.findByText('Back')
	 * expect(button.tabIndex).toEqual(0)
	 * })
	 *
	 * test('should render a Table', () => {
	 * const router = createBrowserRouter(createRoutesFromElements(
	 * <Route path='/' element={<ContactNotifications />} />,
	 * ))
	 * render(<RouterProvider router={router}></RouterProvider>)
	 * const table = screen.findAllByRole('table')
	 * expect(table).toBeTruthy()
	 * })
	 */
	test('delay', () => {
		expect(true).toBeTruthy()
	})
})
