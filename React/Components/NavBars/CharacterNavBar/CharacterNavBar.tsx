import React from 'react'
import { useLocation, Link } from 'react-router-dom'

import Nav from '../../Buttons/Nav/Nav'
import CSS from './CharacterNavBar.module.css'
const CharacterNavBar = () => {
	const characterID = useLocation().pathname.split('/')[2]

	return (
		<>
			<Nav className={CSS.Button} URL={`./character/${characterID}/blueprints`}>Blueprints</Nav>
			<Nav className={CSS.Button} URL={`./character/${characterID}/contact-notification`}>Contact Notifications</Nav>
			<Nav className={CSS.Button} URL={`./character/${characterID}/corp-history`}>Corp History </Nav>
			<Nav className={CSS.Button} URL={`./character/${characterID}/corp-roles`}>Roles</Nav>
			<Nav className={CSS.Button} URL={`./character/${characterID}/medal-list`}>Medals</Nav>
			<Nav className={CSS.Button} URL={`./character/${characterID}/notifications`}>Notifications</Nav>
			<Nav className={CSS.Button} URL={`./character/${characterID}/standings`}>Standings</Nav>
			<Nav className={CSS.Button} URL={`./character/${characterID}/titles`}>Titles</Nav>
		</>
	)
}

export default CharacterNavBar
