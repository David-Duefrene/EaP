import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import prisma from '../../../../prisma/PrismaClient'
import BackButton from '../../../Components/Buttons/BackButton/BackButton'
import SortableList from '../../../Components/SortableList/SortableList'
import Standing from '../../../../Types/APIResponses/EveOfficial/Standings.types'

const Standings = () => {
	const [ standings, setStandings ] = useState<Standing>()
	const { characterID } = useParams<{ characterID: string }>()

	useEffect(() => {
		prisma.Standings.findMany(
			{ where: { character: { every: { characterID } } } },
		).then((d: Standing) => {
			setStandings(d)
		})
	}, [ characterID ])

	return standings ?
		<>
			<h1>Standings</h1>
			<BackButton />
			<SortableList data={standings} />
		</> : <h1>Loading...</h1>
}

export default Standings
