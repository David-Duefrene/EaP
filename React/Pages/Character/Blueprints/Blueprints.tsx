import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import prisma from '../../../../prisma/PrismaClient'
import BackButton from '../../../Components/Buttons/BackButton/BackButton'
import './Blueprints.css'
import Blueprint from '../../../../Types/APIResponses/EveOfficial/Blueprints.types'

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
			<table>
				<caption>Blueprints</caption>
				<thead>
					<tr>
						<th>Item ID</th>
						<th>Location Flag</th>
						<th>Location ID</th>
						<th>ME</th>
						<th>Quantity</th>
						<th>Runs</th>
						<th>TE</th>
						<th>Type ID</th>
					</tr>
				</thead>
				<tbody>
					{blueprints.map((el, key) => {
						return (
							<tr key={key}>
								<td>{el.itemID.toString()}</td>
								<td>{el.locationFlag}</td>
								<td>{el.locationID.toString()}</td>
								<td>{el.materialEfficiency}</td>
								<td>{el.quantity}</td>
								<td>{el.runs}</td>
								<td>{el.timeEfficiency}</td>
								<td>{el.typeID}</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</>
	)
}

export default Blueprints
