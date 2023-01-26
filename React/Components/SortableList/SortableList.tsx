/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'

import { useTranslation } from 'react-i18next'

import CSS from './SortableList.module.css'

type Props = {
	data: Record<string, any>[] | Record<string, any>,
	ignore?: string[],
}

const SortableList = (props: Props) => {
	const { t } = useTranslation([ 'keys', 'enums' ])
	const { data, ignore = [] } = props

	if (data.length === 0) {
		return <div>No data to display</div>
	}

	// @ts-ignore
	const keys = Object.keys(data[0]) // Pulls key from 1st object

	if (ignore) {
		ignore.forEach((el) => {
			keys.splice(keys.indexOf(el), 1)
		})
	}
	const [ sortConfig, setSortConfig ] = useState(keys[0]) // Sets default sort to first key
	const [ sortDirection, setSortDirection ] = useState('asc') // Sets default sort direction to ascending

	const tableHeader = keys.map((el, key) => {
		return (
			<th className={`Button ${CSS.HeadCell}`} key={`Col-label-${key}`}>
				<button className={CSS.HeadButton} type='button' onClick={() => {
					setSortConfig(el)
					setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
				}}>
					{t(el)}
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
					if (ignore?.indexOf(key) >= 0) return null
					return (
						<td key={i}>
							{t(String(el[key]), { ns: 'enums' })}
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
