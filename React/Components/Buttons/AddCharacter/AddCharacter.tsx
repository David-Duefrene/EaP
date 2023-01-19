import React from 'react'

import { useTranslation } from 'react-i18next'

import LoginWhite from './eve-sso-login-white-large.png'

const AddCharacter = () => {
	const { t } = useTranslation('navigation')

	return (
		<img tabIndex={0} src={LoginWhite} alt={t('Add new character')!} onClick={() => window.auth.login()} />
	)
}

export default AddCharacter
