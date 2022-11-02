// @vitest-environment jsdom
import React from 'react'

import {
	expect, test, describe,
} from 'vitest'
import { render, screen } from '@testing-library/react'

import AddCharacter from './AddCharacter'

describe('AddCharacter', () => {
	test('should render a button with a tab index of 0', async () => {
		render(<AddCharacter />)
		const button = await screen.findByAltText('Add new character')
		expect(button.tabIndex).toEqual(0)
	})
})
