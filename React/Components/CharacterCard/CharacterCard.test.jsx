// @vitest-environment jsdom
import React from 'react'
import {
	createBrowserRouter, createRoutesFromElements, RouterProvider, Route,
} from 'react-router-dom'

import '../../i18n'

import {
	expect, test, afterEach, describe, beforeEach,
} from 'vitest'
import {
	cleanup, render, screen,
} from '@testing-library/react'

import CharacterCard from './CharacterCard'

describe('CharacterCard', () => {
	const character = {
		characterID: 123,
		name: 'Test Name',
		alliance: 456,
		birthday: '2021-01-01',
		bloodlineName: 'Jin-Mei',
		corporation: 901,
		description: 'Test Description',
		gender: 'male',
		raceName: 'Gallente',
		securityStatus: 10,
	}

	beforeEach(() => {
		/*
		 * This is a workaround for the following issue:
		 * Link needs to be rendered inside a Router
		 * // TODO: Remove this workaround when link is refactored into the home page
		 */
		const router = createBrowserRouter(createRoutesFromElements(
			<Route path='/' element={<CharacterCard character={character} />} />,
		))
		render(<RouterProvider router={router}></RouterProvider>)
	})

	afterEach(cleanup)

	test('should render the character name', () => {
		expect(screen.getByText(`Name: ${character.name}`)).toBeTruthy()
	})

	test('should render the character ID', () => {
		expect(screen.getByText(`Character ID: ${character.characterID}`)).toBeTruthy()
	})

	test('should render the character Alliance ID', () => {
		expect(screen.getByText(`Alliance: ${character.alliance}`)).toBeTruthy()
	})

	test('should render the character birthday', () => {
		expect(screen.getByText(`Birthday: ${character.birthday}`)).toBeTruthy()
	})

	test('should render the character Bloodline ID', () => {
		expect(screen.getByText(`Bloodline: ${character.bloodlineName}`)).toBeTruthy()
	})

	test('should render the character Corp ID', () => {
		expect(screen.getByText(`Corporation: ${character.corporation}`)).toBeTruthy()
	})

	test('should render the character Gender', () => {
		expect(screen.getByText('Gender: Male')).toBeTruthy()
	})

	test('should render the character Race', () => {
		expect(screen.getByText(`Race: ${character.raceName}`)).toBeTruthy()
	})

	test('should render the character Security Status', () => {
		expect(screen.getByText(`Security Status: ${character.securityStatus.toFixed(2)}`)).toBeTruthy()
	})
})
