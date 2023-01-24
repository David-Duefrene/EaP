import React from 'react'
import { Link } from 'react-router-dom'

import { useTranslation } from 'react-i18next'

import { FindAllCharacters } from '../../../Electron/preload.d'
import './CharacterCard.css'

const CharacterCard = (props: { character: FindAllCharacters }) => {
	const { t } = useTranslation([ 'keys', 'enums' ])
	const {
		characterID, name, alliance, birthday, bloodlineName, corporation, gender, raceName, securityStatus,
	} = props.character

	return (
		<Link key={characterID} className='Card' to={`character/${characterID}`}>
			<img alt={`${name}'s character portrait`} className='Portrait' src={`https://images.evetech.net/characters/${characterID}/portrait?tenant=tranquility&size=256`} />
			<ul className='CardBody'>
				<li>{`${t('name')}: ${name}`}</li>
				<li>{`${t('characterID')}: ${characterID}`}</li>
				<li>{`${t('alliance')}: ${alliance}`}</li>
				<li>{`${t('birthday')}: ${birthday.toLocaleString()}`}</li>
				<li>{`${t('bloodline')}: ${bloodlineName}`}</li>
				<li>{`${t('corporation')}: ${corporation}`}</li>
				<li>{`${t('gender')}: ${t(gender, { ns: 'enums' })}`}</li>
				<li>{`${t('race')}: ${raceName}`}</li>
				<li>{`${t('securityStatus')}: ${securityStatus.toFixed(2)}`}</li>
			</ul>
		</Link>
	)
}

export default CharacterCard
