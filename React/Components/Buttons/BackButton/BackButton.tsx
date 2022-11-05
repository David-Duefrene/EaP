import React from 'react'
import { useNavigate } from 'react-router-dom'

import CSS from '../Nav/Nav.module.css'

const BackButton = () => {
	const navigate = useNavigate()

	return (
		<a
			tabIndex={0}
			className={`Button ${CSS.Nav}`}
			onClick={() => navigate(-1)} >
				Back
		</a>
	)
}

export default BackButton
