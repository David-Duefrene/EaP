import React from 'react'
import { useNavigate } from 'react-router-dom'

import CSS from './BackButton.module.css'

const BackButton = () => {
	const navigate = useNavigate()

	return (
		<a className={CSS.Button} onClick={() => navigate(-1)}>Back</a>
	)
}

export default BackButton
