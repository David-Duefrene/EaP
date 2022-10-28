/*
 * Step 1: convert key from camelCase to normal case
 * Step 2: put key in a <thead> <td> tag
 * Step 3: put value from key inside of a <tbody> <td> tag
 * Step 4: TODO: add sort functions to each key
 */
import React from 'react'

const SortableList = (props: any) => {
	const { data } = props

	const keys = Object.keys(data[0])

	const tableHeader = keys.map((el, key) => {
		return (
			<th key={`Col-label-${key}`}>{el}</th>
		)
	})

	const tableBody = data.map((el: any, key: number) => {
		return (
			<tr key={`Row-item-${key}`}>
				{keys.map((key, i) => {
					return (
						<td key={i}>
							{el[key].toString()}
						</td>
					)
				})}
			</tr>
		)
	})

	return (
		<table>
			<thead>
				<tr>
					{tableHeader}
				</tr>
			</thead>
			<tbody>
				{tableBody}
			</tbody>
		</table>
	)
}

export default SortableList
