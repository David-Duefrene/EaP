import React from 'react'
import { useLocation } from 'react-router-dom'

import BackButton from '../Buttons/BackButton/BackButton'
import Home from '../Buttons/Home/HomeButton'
import AddCharacter from '../Buttons/AddCharacter/AddCharacter'
import CharacterNavBar from '../NavBars/CharacterNavBar/CharacterNavBar'
import CSS from './MainNavBar.module.css'

const NavBar = () => {
	const currentSection = useLocation().pathname.split('/')[1]

	const sections: Record<string, JSX.Element> = {
		'': <AddCharacter />,
		character: <CharacterNavBar />,
	}

	return (
		<div className={CSS.NavBar}>
			<BackButton />
			{currentSection !== '' ? <Home /> : null}
			{sections[currentSection]}
		</div>
	)
}

export default NavBar
