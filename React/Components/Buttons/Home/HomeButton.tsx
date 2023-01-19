import React from 'react'

import { useTranslation } from 'react-i18next'

import Nav from '../Nav/Nav'

const BackButton = () => {
	const { t } = useTranslation('navigation')

	return <Nav URL='/'>{t('Back')}</Nav>
}

export default BackButton
