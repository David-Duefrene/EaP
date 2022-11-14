import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import prisma from '../../../../prisma/PrismaClient'
import SortableList from '../../../Components/SortableList/SortableList'
import Medal from '../../../../Types/APIResponses/EveOfficial/Medals.types'

const MedalList = () => {
	const [ medals, setMedals ] = useState<Medal>()
	const { characterID } = useParams<{ characterID: string }>()
	if (characterID === undefined) return <h1>Character ID invalid</h1>

	useEffect(() => {
		prisma.Medal.findMany(
			{ where: { characterID: BigInt(characterID) } },
		).then((d: Medal) => {
			setMedals(d)
		})
	}, [ characterID ])

	return medals ?
		<>
			<h1>Medals</h1>
			<SortableList data={medals} />
		</> : <h1>Loading...</h1>
}

export default MedalList
