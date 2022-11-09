import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import prisma from '../../../../prisma/PrismaClient'
import './Blueprints.css'
import Blueprint from '../../../../Types/APIResponses/EveOfficial/Blueprints.types'
import SortableList from '../../../Components/SortableList/SortableList'

const Blueprints = () => {
	const [ blueprints, setBlueprints ] = useState<Blueprint[]>([])
	const { characterID } = useParams<{ characterID: string }>()

	useEffect(() => {
		prisma.blueprint.findMany({ where: { character: { every: { characterID } } } })
			.then((d: Blueprint[]) => {
				setBlueprints(d)
			})
	}, [ characterID ])

	return blueprints.length ?
		<>
			<h1>Blueprints</h1>
			<SortableList data={blueprints} />
		</> : <h1>Loading...</h1>
}

export default Blueprints
