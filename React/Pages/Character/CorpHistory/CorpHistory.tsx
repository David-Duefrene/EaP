import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import SortableList from '../../../Components/SortableList/SortableList'
import CorpHistory from '../../../../APICrawler/Endpoints/Character/CorpHistory/CorpHistory.type'

const CorpHistoryList = () => {
	const [ corpHistory, setCorpHistory ] = useState<CorpHistory[]>()
	const { characterID = '' } = useParams<{ characterID: string }>()

	useEffect(() => {
		window.getCharacter.corpHistory(BigInt(characterID)).then((d: CorpHistory[]) => {
			setCorpHistory(d)
		})
	}, [ characterID ])

	return corpHistory ?
		<>
			<h1>Corp History</h1>
			<SortableList data={corpHistory} />
		</> : <h1>Loading...</h1>
}

export default CorpHistoryList
