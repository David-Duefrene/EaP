import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import prisma from '../../../../prisma/PrismaClient'
import BackButton from '../../../Components/Buttons/BackButton/BackButton'
import SortableList from '../../../Components/SortableList/SortableList'
import CorpHistory from '../../../../Types/APIResponses/EveOfficial/CorpHistory.types'

const CorpHistory = () => {
	const [ corpHistory, setCorpHistory ] = useState<CorpHistory[]>([])
	const [ isLoading, setIsLoading ] = useState(true)
	const { characterID } = useParams<{ characterID: string }>()

	useEffect(() => {
		prisma.corpHistory.findMany({ where: { characterID } })
			.then((d: CorpHistory[]) => {
				setCorpHistory(d)
				setIsLoading(false)
			})
	}, [ characterID ])

	if (isLoading) {
		return (
			<div>Loading...</div>
		)
	}

	return (
		<>
			<h1>Corp History</h1>
			<BackButton />
			<SortableList data={corpHistory} />
		</>
	)
}

export default CorpHistory
