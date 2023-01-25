// @vitest-environment jsdom
import React from 'react'

import {
	expect, test, afterEach, describe, beforeEach,
} from 'vitest'

import {
	cleanup, render, screen, waitForElementToBeRemoved,
} from '@testing-library/react'

import { BlueprintLocationFlags } from '../../../../APICrawler/Endpoints/Character/Blueprint/Blueprint.d'

import Blueprints from './Blueprints'

describe('Blueprint', () => {
	beforeEach(() => {
		window.getCharacter = {
			blueprints: () => Promise.resolve([
				{
					itemID: '1',
					locationFlag: BlueprintLocationFlags.Cargo,
					locationID: '2',
					materialEfficiency: 3,
					quantity: 4,
					runs: 5,
					timeEfficiency: 6,
					typeID: 7,
				},
			]),
		}

		render(<Blueprints />)
	})

	afterEach(cleanup)

	test('loads loading... on initial state', () => {
		expect(screen).toBeTruthy()
		expect(screen.getByText('Loading...')).toBeTruthy()
	})

	test('renders a table', async () => {
		await waitForElementToBeRemoved(() => screen.getByText('Loading...'))
		expect(screen.findAllByRole('table')).toBeTruthy()
	})
})
