import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import BackButton from '../Buttons/BackButton/BackButton'
import Home from '../Buttons/Home/HomeButton'
import AddCharacter from '../Buttons/AddCharacter/AddCharacter'

const NavBar = () => {
	const currentSection = useLocation().pathname.split('/')[1]

	const sections = {
		'': <AddCharacter />,
		character: <h2>Char Sub</h2>,
	}

	return (
		<>
			<BackButton />
			{currentSection !== '' ? <Home /> : null}
			{sections[currentSection]}
		</>
	)
}

export default NavBar
