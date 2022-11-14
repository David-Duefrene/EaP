import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import prisma from '../../../../prisma/PrismaClient'
import SortableList from '../../../Components/SortableList/SortableList'
import Title from '../../../../Types/APIResponses/EveOfficial/Title.types'

const Titles = () => {
	const [ titles, setTitles ] = useState<Title>()
	const { characterID = '' } = useParams<{ characterID: string }>()

	useEffect(() => {
		prisma.Title.findMany(
			{ where: { characterID: BigInt(characterID) } },
		).then((d: Title) => {
			setTitles(d)
		})
	}, [ characterID ])

	return titles ?
		<>
			<h1>Titles</h1>
			<SortableList data={titles} />
		</> : <h1>Loading...</h1>
}

export default Titles
