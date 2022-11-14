import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import prisma from '../../../../prisma/PrismaClient'
import SortableList from '../../../Components/SortableList/SortableList'
import CorpHistory from '../../../../Types/APIResponses/EveOfficial/CorpHistory.types'

const CorpHistoryList = () => {
	const [ corpHistory, setCorpHistory ] = useState<CorpHistory[]>()
	const { characterID } = useParams<{ characterID: string }>()
	if (characterID === undefined) return <h1>Character ID invalid</h1>

	useEffect(() => {
		prisma.corpHistory.findMany({ where: { characterID: BigInt(characterID) } })
			.then((d: CorpHistory[]) => {
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
