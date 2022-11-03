import React from 'react'
import { useLocation, Link } from 'react-router-dom'

import CSS from './CharacterNavBar.module.css'
const CharacterNavBar = () => {
	const characterID = useLocation().pathname.split('/')[2]

	return (
		<>
			<Link className={CSS.Button} to={`./character/${characterID}/blueprints`}>Blueprints</Link>
			<Link className={CSS.Button} to={`./character/${characterID}/contact-notification`}>Contact Notifications</Link>
			<Link className={CSS.Button} to={`./character/${characterID}/corp-history`}>Corp History </Link>
			<Link className={CSS.Button} to={`./character/${characterID}/corp-roles`}>Roles</Link>
			<Link className={CSS.Button} to={`./character/${characterID}/medal-list`}>Medals</Link>
			<Link className={CSS.Button} to={`./character/${characterID}/notifications`}>Notifications</Link>
			<Link className={CSS.Button} to={`./character/${characterID}/standings`}>Standings</Link>
			<Link className={CSS.Button} to={`./character/${characterID}/titles`}>Titles</Link>
		</>
	)
}

export default CharacterNavBar
