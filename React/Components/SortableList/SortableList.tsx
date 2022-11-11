/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'

import CSS from './SortableList.module.css'

const SortableList = (props: { data: Record<string, any>[] | Record<string, any> }) => {
	const { data } = props

	if (data.length === 0) {
		return <div>No data to display</div>
	}

	// @ts-ignore
	const keys = Object.keys(data[0]) // Pulls key from 1st object
	const [ sortConfig, setSortConfig ] = useState(keys[0]) // Sets default sort to first key
	const [ sortDirection, setSortDirection ] = useState('asc') // Sets default sort direction to ascending

	const insertSpace = (str: string) => {
		if (str.slice(-2) === 'ID') {
			str = str.slice(0, -2)
		}

		return str.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => {
			return str.toUpperCase()
		})
	}

	const tableHeader = keys.map((el, key) => {
		return (
			<th className={`Button ${CSS.HeadCell}`} key={`Col-label-${key}`}>
				<button className={CSS.HeadButton} type='button' onClick={() => {
					setSortConfig(el)
					setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
				}}>
					{insertSpace(el)}
				</button>
			</th>
		)
	})

	data.sort((a: Record<string, string | number>, b: Record<string, string | number>) => {
		if (sortDirection === 'asc') {
			if (typeof a[sortConfig] === 'string' && typeof b[sortConfig] === 'string') {
				return a[sortConfig].toLocaleString().localeCompare(b[sortConfig].toLocaleString())
			}

			if (a[sortConfig] > b[sortConfig]) {
				return 1
			}
			return -1
		}
		if (typeof a[sortConfig] === 'string' && typeof b[sortConfig] === 'string') {
			return b[sortConfig].toLocaleString().localeCompare(a[sortConfig].toLocaleString())
		}

		if (a[sortConfig] > b[sortConfig]) {
			return -1
		}
		return 1
	})

	const tableBody = data.map((el: Record<string, any>, key: number) => {
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
		<div className={CSS.Content}>
			<table>
				<thead>
					<tr>{tableHeader}</tr>
				</thead>
				<tbody>{tableBody}</tbody>
			</table>
		</div>
	)
}

export default SortableList
