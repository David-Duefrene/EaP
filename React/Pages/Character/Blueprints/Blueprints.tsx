import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import prisma from '../../../../prisma/PrismaClient'
import BackButton from '../../../Components/Buttons/BackButton/BackButton'
import './Blueprints.css'
import Blueprint from '../../../../Types/APIResponses/EveOfficial/Blueprints.types'
import SortableList from '../../../Components/SortableList/SortableList'

const Blueprints = () => {
	const [ blueprints, setBlueprints ] = useState<Blueprint[]>([])
	const [ isLoading, setIsLoading ] = useState(true)
	const { characterID } = useParams<{ characterID: string }>()

	useEffect(() => {
		prisma.blueprint.findMany({ where: { character: { every: { characterID } } } })
			.then((d: Blueprint[]) => {
				setBlueprints(d)
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
			<h1>Blueprints</h1>
			<BackButton />
			<SortableList data={blueprints} />
		</>
	)
}

export default Blueprints
