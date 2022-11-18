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
		window.getCharacter = {
			medals: () => Promise.resolve([
				{
					corporationID: 1,
					date: new Date(),
					description: 'Medal 1 Description',
					issuerID: 1,
					medalID: 1,
					reason: 'Medal 1 Reason',
					status: 'public',
					title: 'Medal 1 Title',
				},
			]),
		}

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
