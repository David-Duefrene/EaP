import React from 'react'
import { Link } from 'react-router-dom'

import Print from '../../Language/Print'
import CharacterQuery from '../../../Types/APIResponses/PrismaQueries/Character/CharacterSheetQueries.type'
import './CharacterCard.css'

const CharacterCard = (props: { character: CharacterQuery }) => {
	const {
		characterID, name, allianceID, birthday, bloodlineID, corporationID, gender, raceID, securityStatus,
	} = props.character

	return (
		<Link key={characterID} className='Card' to={`character/${characterID}`}>
			<img alt={`${name}'s character portrait`} className='Portrait' src={`https://images.evetech.net/characters/${characterID}/portrait?tenant=tranquility&size=256`} />
			<ul className='CardBody'>
				<li>{`${Print('name')}: ${name}`}</li>
				<li>{`${Print('characterID')}: ${characterID}`}</li>
				<li>{`${Print('alliance')}: ${allianceID}`}</li>
				<li>{`${Print('birthday')}: ${birthday}`}</li>
				<li>{`${Print('bloodline')}: ${bloodlineID}`}</li>
				<li>{`${Print('corporation')}: ${corporationID}`}</li>
				<li>{`${Print('gender')}: ${gender}`}</li>
				<li>{`${Print('race')}: ${raceID}`}</li>
				<li>{`${Print('securityStatus')}: ${securityStatus}`}</li>
			</ul>
		</Link>
	)
}

export default CharacterCard
