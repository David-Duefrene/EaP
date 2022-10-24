import React from 'react'

import CharacterQuery from '../../../Types/APIResponses/PrismaQueries/Character/CharacterSheetQueries.type'

const CharacterCard = (props: CharacterQuery) => {
	const {
		characterID, name, allianceID, birthday, bloodlineID, corporationID, gender, raceID, securityStatus,
	} = props

	return (
		<div key={characterID} className='Card'>
			<img alt={`${name}'s character portrait`} className='Portrait' src={`https://images.evetech.net/characters/${characterID}/portrait?tenant=tranquility&size=256`} />
			<ul className='CardBody'>
				<li>{name}</li>
				<li>Character ID: {characterID}</li>
				<li>Alliance ID: {allianceID}</li>
				<li>Character birthday: {`${birthday}`}</li>
				<li>Bloodline ID: {bloodlineID}</li>
				<li>Corp ID:{corporationID}</li>
				<li>Gender: {gender}</li>
				<li>Race ID: {raceID}</li>
				<li>Security Status: {securityStatus}</li>
			</ul>
		</div>
	)
}

export default CharacterCard
