import React from 'react'
import { useNavigate } from 'react-router-dom'

import { useTranslation } from 'react-i18next'

import Nav from '../Nav/Nav'

const BackButton = () => {
	const { t } = useTranslation('navigation')
	const navigate = useNavigate()

	return (
		<Nav URL='' onClick={() => navigate(-1)} >{t('Back')}</Nav>
	)
}

export default BackButton
