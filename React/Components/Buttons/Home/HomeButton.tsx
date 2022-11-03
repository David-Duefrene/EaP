import React from 'react'
import { useNavigate } from 'react-router-dom'

import CSS from './HomeButton.module.css'

const BackButton = () => {
	const navigate = useNavigate()

	return <a tabIndex={0} className={CSS.Button} onClick={() => navigate('./')}>Home</a>
}

export default BackButton
