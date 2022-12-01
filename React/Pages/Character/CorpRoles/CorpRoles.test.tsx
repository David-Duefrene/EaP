// @vitest-environment jsdom
import React from 'react'

import {
	expect, test, afterEach, describe, beforeEach, vi,
} from 'vitest'

import {
	cleanup, render, screen, waitForElementToBeRemoved,
} from '@testing-library/react'

import { Roles } from '../../../../Types/APIResponses/EveOfficial/CorpRoles.types'
import CorpRolesList from './CorpRoles'

describe('CorpRolesList', () => {
	beforeEach(() => {
		window.getCharacter = {
			corpRoles: () => Promise.resolve([{
				roles: [ Roles.Account_Take_1 ],
				rolesAtBase: [ Roles.Account_Take_1 ],
				rolesAtHQ: [ Roles.Account_Take_1 ],
				rolesAtOther: [ Roles.Account_Take_1 ],
			}]),
		}

		render(<CorpRolesList />)
	})

	afterEach(() => {
		cleanup()
	})

	test('should render a table with a header and a body', async () => {
		await waitForElementToBeRemoved(() => screen.getByText('Loading...'))
		expect(screen.getByRole('table')).toBeTruthy()
		expect(screen.getAllByRole('row')).toHaveLength(4)
		expect(screen.getAllByRole('cell')).toHaveLength(8)
	})
})
