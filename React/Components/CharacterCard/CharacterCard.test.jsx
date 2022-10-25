// @vitest-environment jsdom
import React from 'react'

import {
	expect, test, afterEach, describe, beforeEach,
} from 'vitest'
import { cleanup, render } from '@testing-library/react'

import CharacterCard from './CharacterCard'

describe('CharacterCard', () => {
	let wrapper
	const character = {
		characterID: 123,
		name: 'Test Name',
		allianceID: 456,
		birthday: '2021-01-01',
		bloodlineID: 789,
		corporationID: 901,
		description: 'Test Description',
		gender: 'male',
		raceID: 234,
		securityStatus: 10,
	}

	beforeEach(() => {
		wrapper = render(<CharacterCard character={character} />)
	})

	afterEach(cleanup)

	test('should render the character card', () => {
		expect(wrapper).toMatchSnapshot()
	})

	test('should render the character name', () => {
		expect(wrapper.getByText(character.name)).toBeTruthy()
	})

	test('should render the character ID', () => {
		expect(wrapper.getByText(`Character ID: ${character.characterID}`)).toBeTruthy()
	})

	test('should render the character Alliance ID', () => {
		expect(wrapper.getByText(`Alliance ID: ${character.allianceID}`)).toBeTruthy()
	})

	test('should render the character birthday', () => {
		expect(wrapper.getByText(`Character birthday: ${character.birthday}`)).toBeTruthy()
	})

	test('should render the character Bloodline ID', () => {
		expect(wrapper.getByText(`Bloodline ID: ${character.bloodlineID}`)).toBeTruthy()
	})

	test('should render the character Corp ID', () => {
		expect(wrapper.getByText(`Corp ID: ${character.corporationID}`)).toBeTruthy()
	})

	test('should render the character Gender', () => {
		expect(wrapper.getByText(`Gender: ${character.gender}`)).toBeTruthy()
	})

	test('should render the character Race ID', () => {
		expect(wrapper.getByText(`Race ID: ${character.raceID}`)).toBeTruthy()
	})

	test('should render the character Security Status', () => {
		expect(wrapper.getByText(`Security Status: ${character.securityStatus}`)).toBeTruthy()
	})
})
