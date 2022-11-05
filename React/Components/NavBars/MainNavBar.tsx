import React from 'react'
import { useLocation } from 'react-router-dom'

import BackButton from '../Buttons/BackButton/BackButton'
import Home from '../Buttons/Home/HomeButton'
import CharacterNavBar from '../NavBars/CharacterNavBar/CharacterNavBar'
import CSS from './MainNavBar.module.css'

const NavBar = () => {
	const currentSection = useLocation().pathname.split('/')[1]

	const sections: Record<string, JSX.Element> = {
		character: <CharacterNavBar />,
	}

	return (
		<div className={CSS.Splash}>
			<ul className={CSS.NavBar}>
				<BackButton />
				<Home />
				{sections[currentSection]}
			</ul>
		</div>
	)
}

export default NavBar
