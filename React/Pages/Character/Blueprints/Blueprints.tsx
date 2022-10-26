import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import prisma from '../../../../prisma/PrismaClient'
import './Blueprints.css'
import Blueprint from '../../../../Types/APIResponses/EveOfficial/Blueprints.types'

const Blueprints = () => {
	const [ blueprints, setBlueprints ] = useState<Blueprint[]>([])
	const { characterID } = useParams<{ characterID: string }>()

	useEffect(() => {
		prisma.blueprint.findMany({ where: { character: { every: { characterID } } } })
			.then((d: Blueprint[]) => setBlueprints(d))
	}, [ characterID ])

	return (
		<table className=''>
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
							<td>{el.itemID}</td>
							<td>{el.locationFlag}</td>
							<td>{el.locationID}</td>
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
	)
}

export default Blueprints
