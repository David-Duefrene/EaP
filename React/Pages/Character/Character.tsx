import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import CharacterQuery from '../../../Types/APIResponses/PrismaQueries/Character/CharacterSheetQueries.type'

import CSS from './Character.module.css'

const {
	Island, Portrait, AllianceLogo, CorpLogo, Data,
} = CSS

const Character = () => {
	const [ character, setCharacter ] = useState<CharacterQuery>()
	const { characterID = '' } = useParams<{ characterID: string }>()

	useEffect(() => {
		window.getCharacter.characterSheet(BigInt(characterID)).then((char) => {
			setCharacter(char)
		})
	}, [ characterID ])

	const {
		name, allianceID, corporationID, birthday, bloodlineName, gender, raceName, securityStatus,
	} = character || {}
	return character ?
		<>
			<div className={Island}>
				<img className={Portrait} alt={`${name}'s character portrait`} src={`https://images.evetech.net/characters/${characterID}/portrait?tenant=tranquility&size=256`} />
				<img className={AllianceLogo} alt={'Alliance Logo'} src={`https://images.evetech.net/Alliance/${allianceID}_128.png`} />
				<img className={CorpLogo} alt={'Corporation Logo'} src={`https://images.evetech.net/Corporation/${corporationID}_128.png`} />
				<div className={Data}>
					<ul>
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
				</div>
			</div>
		</> : <h1>Loading...</h1>
}

export default Character
