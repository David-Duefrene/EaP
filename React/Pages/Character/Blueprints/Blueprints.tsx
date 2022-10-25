import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import prisma from '../../../../prisma/PrismaClient'
import Blueprint from '../../../../Types/APIResponses/EveOfficial/Blueprints.types'

const Blueprints = () => {
	const [ blueprints, setBlueprints ] = useState<Blueprint[]>([])
	const { characterID } = useParams<{ characterID: string }>()

	useEffect(() => {
		prisma.blueprint.findMany({ where: { character: { every: { characterID } } } })
			.then((d: Blueprint[]) => setBlueprints(d))
	})

	return (
		<ul>
			{blueprints.map((el, key) => {
				return (
					<li key={key}>
						<ul>
							<li key={`${key}-item`}>Item ID: {el.itemID}</li>
							<li key={`${key}-locFlag`}>Location Flag: {el.locationFlag}</li>
							<li key={`${key}-locID`}>Location ID: {el.locationID}</li>
							<li key={`${key}-ME`}>ME: {el.materialEfficiency}</li>
							<li key={`${key}-quantity`}>Quantity: {el.quantity}</li>
							<li key={`${key}-runs`}>Runs: {el.runs}</li>
							<li key={`${key}-TE`}>TE: {el.timeEfficiency}</li>
							<li key={`${key}-typeID`}>Type ID: {el.typeID}</li>
						</ul>
					</li>
				)
			})}
		</ul>
	)
}

export default Blueprints
