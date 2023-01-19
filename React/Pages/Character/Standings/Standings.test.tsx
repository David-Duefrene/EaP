// @vitest-environment jsdom
import React from 'react'

import {
	expect, test, afterEach, describe, beforeEach, vi,
} from 'vitest'

import {
	cleanup, render, screen, waitForElementToBeRemoved,
} from '@testing-library/react'

import { FromType } from '../../../../APICrawler/Endpoints/Character/Standing/Standing.type'
import Standings from './Standings'

describe('Standings', () => {
	beforeEach(() => {
		window.getCharacter = {
			standings: () => Promise.resolve([
				{
					fromID: 1,
					fromType: FromType.agent,
					standing: 1,
				},
			]),
		}

		render(<Standings />)
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
