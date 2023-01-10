import React from 'react'
import { useLocation } from 'react-router-dom'

import Nav from '../../Buttons/Nav/Nav'

const CharacterNavBar = () => {
	const characterID = useLocation().pathname.split('/')[2]

	return (
		<>
			<Nav URL={`./character/${characterID}/blueprints`}>Blueprints</Nav>
			<Nav URL={`./character/${characterID}/contact-notification`}>Contact Notifications</Nav>
			<Nav URL={`./character/${characterID}/corp-history`}>Corp History </Nav>
			<Nav URL={`./character/${characterID}/corp-roles`}>Roles</Nav>
			<Nav URL={`./character/${characterID}/medal-list`}>Medals</Nav>
			<Nav URL={`./character/${characterID}/notifications`}>Notifications</Nav>
			<Nav URL={`./character/${characterID}/standings`}>Standings</Nav>
		</>
	)
}

export default CharacterNavBar
