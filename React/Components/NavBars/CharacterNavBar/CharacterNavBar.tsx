import React from 'react'
import { useLocation } from 'react-router-dom'

import { useTranslation } from 'react-i18next'

import Nav from '../../Buttons/Nav/Nav'

const CharacterNavBar = () => {
	const { t } = useTranslation('navigation')
	const characterID = useLocation().pathname.split('/')[2]

	return (
		<>
			<Nav URL={`./character/${characterID}/`}>{t('Character Sheet')}</Nav>
			<Nav URL={`./character/${characterID}/blueprints`}>{t('Blueprints')}</Nav>
			<Nav URL={`./character/${characterID}/contact-notifications`}>{t('Contact Notifications')}</Nav>
			<Nav URL={`./character/${characterID}/corp-history`}>{t('Corp History')}</Nav>
			<Nav URL={`./character/${characterID}/corp-roles`}>{t('Roles')}</Nav>
			<Nav URL={`./character/${characterID}/medals`}>{t('Medals')}</Nav>
			<Nav URL={`./character/${characterID}/notifications`}>{t('Notifications')}</Nav>
			<Nav URL={`./character/${characterID}/standings`}>{t('Standings')}</Nav>
		</>
	)
}

export default CharacterNavBar
