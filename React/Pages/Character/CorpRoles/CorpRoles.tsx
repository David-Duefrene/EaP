import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import prisma from '../../../../prisma/PrismaClient'
import BackButton from '../../../Components/Buttons/BackButton/BackButton'
import CorpRoles, { Roles } from '../../../../Types/APIResponses/EveOfficial/CorpRoles.types'
import CSS from './CorpRoles.module.css'

const CorpRolesList = () => {
	const [ corpRoles, setCorpRoles ] = useState<CorpRoles>({
		roles: [ Roles.None ],
		rolesAtHQ: [ Roles.None ],
		rolesAtBase: [ Roles.None ],
		rolesAtOther: [ Roles.None ],
	})
	const [ isLoading, setIsLoading ] = useState(true)
	const { characterID } = useParams<{ characterID: string }>()

	useEffect(() => {
		prisma.corpRoles.findUnique(
			{ where: { characterID } },
		).then((d: CorpRoles) => {
			setCorpRoles(d)
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
			<h1>Corp Roles</h1>
			<BackButton />
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
	)
}

export default CorpRolesList
