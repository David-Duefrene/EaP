// @vitest-environment jsdom
import React from 'react'

import {
	expect, test, describe,
} from 'vitest'
import { render, screen } from '@testing-library/react'

import SortableList from './SortableList'

describe('SortableList', () => {
	test('should render a table with a header and a body', () => {
		const data = [
			{ id: 1, name: 'test' },
			{ id: 2, name: 'test2' },
		]

		render(<SortableList data={data} />)

		expect(screen.getByRole('table')).toBeTruthy()
		expect(screen.getAllByRole('row')).toHaveLength(3)
		expect(screen.getAllByRole('columnheader')).toHaveLength(2)
		expect(screen.getAllByRole('cell')).toHaveLength(4)
	})
})
