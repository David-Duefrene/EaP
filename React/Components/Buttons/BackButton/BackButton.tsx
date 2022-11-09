import React from 'react'
import { useNavigate } from 'react-router-dom'

import Nav from '../Nav/Nav'
import CSS from '../Nav/Nav.module.css'

const BackButton = () => {
	const navigate = useNavigate()

	return (
		<Nav
			URL=''
			onClick={() => navigate(-1)} >
				Back
		</Nav>
	)
}

export default BackButton
