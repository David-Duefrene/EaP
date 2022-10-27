import React from 'react'
import { useNavigate } from 'react-router-dom'

import './BackButton.css'

const BackButton = () => {
	const navigate = useNavigate()

	return (
		<a onClick={() => navigate(-1)}>Back</a>
	)
}

export default BackButton
