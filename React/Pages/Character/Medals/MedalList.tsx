import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import prisma from '../../../../prisma/PrismaClient'
import BackButton from '../../../Components/Buttons/BackButton/BackButton'
import SortableList from '../../../Components/SortableList/SortableList'
import Medal from '../../../../Types/APIResponses/EveOfficial/Medals.types'

const MedalList = () => {
	const [ medals, setMedals ] = useState<Medal>()
	const [ isLoading, setIsLoading ] = useState(true)
	const { characterID } = useParams<{ characterID: string }>()

	useEffect(() => {
		prisma.Medal.findMany(
			{ where: { character: { every: { characterID } } } },
		).then((d: Medal) => {
			setMedals(d)
			setIsLoading(false)
		})
	}, [ characterID ])

	if (isLoading || medals === undefined) {
		return (
			<div>Loading...</div>
		)
	}

	return (
		<>
			<h1>Medals</h1>
			<BackButton />
			<SortableList data={medals} />
		</>
	)
}

export default MedalList
