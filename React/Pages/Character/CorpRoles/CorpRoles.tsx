import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

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
	const { characterID = '' } = useParams<{ characterID: string }>()

	useEffect(() => {
		window.getCharacter.corpRoles(BigInt(characterID)).then((d) => {
			setCorpRoles(d[0])
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
							{<td>{corpRoles.roles}</td>}
						</tr>
						<tr>
							<td>Roles At Base</td>
							{<td>{corpRoles.rolesAtBase}</td>}
						</tr>
						<tr>
							<td>Roles At HQ</td>
							{<td>{corpRoles.rolesAtHQ}</td>}
						</tr>
						<tr>
							<td>Roles At Other</td>
							{<td>{corpRoles.rolesAtOther}</td>}
						</tr>
					</tbody>
				</table>
			</div>
		</>
}

export default CorpRoles
