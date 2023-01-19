import React from 'react'
import { Link } from 'react-router-dom'

import { FindAllCharacters } from '../../../Electron/preload.d'
import './CharacterCard.css'

const CharacterCard = (props: { character: FindAllCharacters }) => {
	const {
		characterID, name, allianceID, birthday, bloodlineName, corporationID, gender, raceName, securityStatus,
	} = props.character

	return (
		<Link key={characterID} className='Card' to={`character/${characterID}`}>
			<img alt={`${name}'s character portrait`} className='Portrait' src={`https://images.evetech.net/characters/${characterID}/portrait?tenant=tranquility&size=256`} />
			<ul className='CardBody'>
				<li>{`Name: ${name}`}</li>
				<li>{`Character ID: ${characterID}`}</li>
				<li>{`Alliance: ${allianceID}`}</li>
				<li>{`Birthday: ${birthday.toLocaleString()}`}</li>
				<li>{`Bloodline: ${bloodlineName}`}</li>
				<li>{`Corporation: ${corporationID}`}</li>
				<li>{`Gender: ${gender}`}</li>
				<li>{`Race: ${raceName}`}</li>
				<li>{`Security Status: ${securityStatus.toFixed(2)}`}</li>
			</ul>
		</Link>
	)
}

export default CharacterCard
