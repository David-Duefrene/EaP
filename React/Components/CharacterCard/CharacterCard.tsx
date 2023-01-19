import React from 'react'
import { Link } from 'react-router-dom'

import { useTranslation } from 'react-i18next'

import { FindAllCharacters } from '../../../Electron/preload.d'
import './CharacterCard.css'

const CharacterCard = (props: { character: FindAllCharacters }) => {
	const { t } = useTranslation('keys')
	const {
		characterID, name, allianceID, birthday, bloodlineName, corporationID, gender, raceName, securityStatus,
	} = props.character

	return (
		<Link key={characterID} className='Card' to={`character/${characterID}`}>
			<img alt={`${name}'s character portrait`} className='Portrait' src={`https://images.evetech.net/characters/${characterID}/portrait?tenant=tranquility&size=256`} />
			<ul className='CardBody'>
				<li>{`${t('name')}: ${name}`}</li>
				<li>{`${t('characterID')}: ${characterID}`}</li>
				<li>{`${t('allianceID')}: ${allianceID}`}</li>
				<li>{`${t('birthday')}: ${birthday.toLocaleString()}`}</li>
				<li>{`${t('bloodlineName')}: ${bloodlineName}`}</li>
				<li>{`${t('corporationID')}: ${corporationID}`}</li>
				<li>{`${t('gender')}: ${gender}`}</li>
				<li>{`${t('raceName')}: ${raceName}`}</li>
				<li>{`${t('securityStatus')}: ${securityStatus.toFixed(2)}`}</li>
			</ul>
		</Link>
	)
}

export default CharacterCard
