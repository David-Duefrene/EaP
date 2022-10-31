import React, { useState } from 'react'

const SortableList = (props: { data: Record<string, any>[] }) => {
	const { data } = props

	if (data.length === 0) {
		return (
			<div>No data to display</div>
		)
	}

	const keys = Object.keys(data[0])
	const [ sortConfig, setSortConfig ] = useState(keys[0])

	const tableHeader = keys.map((el, key) => {
		return (
			<th key={`Col-label-${key}`}>
				<button type='button' onClick={() => setSortConfig(el)}>
					{el}
				</button>
			</th>
		)
	})

	data.sort((a, b) => {
		if (a[sortConfig] > b[sortConfig]) {
			return 1
		}
		return -1
	})

	const tableBody = data.map((el, key) => {
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
