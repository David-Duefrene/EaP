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

import Blueprints from './Blueprints'

describe('Blueprint', () => {
	beforeEach(() => {
		vi.mock('../../../../prisma/PrismaClient', () => ({
			default: {
				blueprint: {
					findMany: vi.fn().mockResolvedValue([
						{
							itemID: 1,
							locationFlag: 'locationFlagText',
							locationID: 2,
							materialEfficiency: 3,
							quantity: 4,
							runs: 5,
							timeEfficiency: 6,
							typeID: 7,
						},
					]),
				},
			},
		}))

		const router = createBrowserRouter(createRoutesFromElements(
			<Route path='/' element={<Blueprints />} />,
		))

		render(<RouterProvider router={router} />)
	})

	afterEach(cleanup)

	test('loads loading... on initial state', () => {
		expect(screen).toBeTruthy()
		expect(screen.getByText('Loading...')).toBeTruthy()
	})

	// test('renders table head', async () => {
	// 	await waitForElementToBeRemoved(() => screen.getByText('Loading...'))
	// 	expect(screen.getByText('Item ID')).toBeTruthy()
	// 	expect(screen.getByText('Location Flag')).toBeTruthy()
	// 	expect(screen.getByText('Location ID')).toBeTruthy()
	// 	expect(screen.getByText('ME')).toBeTruthy()
	// 	expect(screen.getByText('Quantity')).toBeTruthy()
	// 	expect(screen.getByText('Runs')).toBeTruthy()
	// 	expect(screen.getByText('TE')).toBeTruthy()
	// 	expect(screen.getByText('Type ID')).toBeTruthy()
	// })

	test('renders table body', async () => {
		await waitForElementToBeRemoved(() => screen.getByText('Loading...'))
		expect(screen.getByText('1')).toBeTruthy()
		expect(screen.getByText('locationFlagText')).toBeTruthy()
		expect(screen.getByText('2')).toBeTruthy()
		expect(screen.getByText('3')).toBeTruthy()
		expect(screen.getByText('4')).toBeTruthy()
		expect(screen.getByText('5')).toBeTruthy()
		expect(screen.getByText('6')).toBeTruthy()
		expect(screen.getByText('7')).toBeTruthy()
	})
})
