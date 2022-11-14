import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import prisma from '../../../../prisma/PrismaClient'
import CorpRole, { Roles } from '../../../../Types/APIResponses/EveOfficial/CorpRoles.types'
import CSS from './CorpRoles.module.css'

const CorpRoles = () => {
	const [ corpRoles, setCorpRoles ] = useState<CorpRole>({
		roles: [ Roles.None ],
		rolesAtHQ: [ Roles.None ],
		rolesAtBase: [ Roles.None ],
		rolesAtOther: [ Roles.None ],
	})
	const [ isLoading, setIsLoading ] = useState(true)
	const { characterID } = useParams<{ characterID: string }>()
	if (characterID === undefined) return <h1>Character ID invalid</h1>

	useEffect(() => {
		prisma.corpRoles.findUnique(
			{ where: { characterID: BigInt(characterID) } },
		).then((d: CorpRole) => {
			setCorpRoles(d)
			setIsLoading(false)
		})
	}, [ characterID ])

	return isLoading ? <h1>Loading...</h1> :
		<>
			<h1>Corp Roles</h1>
			<div className={CSS.RoleChart}>
				<table>
					<tbody>
						<tr>
							<td>Roles</td>
							{corpRoles.roles.map((el, key) => <td key={key}>{el}</td>)}
						</tr>
						<tr>
							<td>Roles At Base</td>
							{corpRoles.rolesAtBase.map((el, key) => <td key={key}>{el}</td>)}
						</tr>
						<tr>
							<td>Roles At HQ</td>
							{corpRoles.rolesAtHQ.map((el, key) => <td key={key}>{el}</td>)}
						</tr>
						<tr>
							<td>Roles At Other</td>
							{corpRoles.rolesAtOther.map((el, key) => <td key={key}>{el}</td>)}
						</tr>
					</tbody>
				</table>
			</div>
		</>
}

export default CorpRoles
