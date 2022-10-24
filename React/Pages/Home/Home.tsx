import React, { useState, useEffect } from 'react'

const { PrismaClient } = require('@prisma/client')

import AddCharacter from '../../Components/AddCharacter/AddCharacter'
import CharacterCard from '../../Components/CharacterCard/CharacterCard'
import './Home.css'
import CharacterQuery from '../../../Types/APIResponses/PrismaQueries/Character/CharacterSheetQueries.type'

const prisma = new PrismaClient()

const Home = () => {
	const [ characters, setCharacters ] = useState<CharacterQuery[]>([])
	const [ characterSheets, setCharacterSheets ] = useState<CharacterQuery[]>([])

	useEffect(() => {
		prisma.character.findMany().then((d: CharacterQuery[]) => setCharacters(d))
		prisma.characterSheet.findMany().then((d: CharacterQuery[]) => setCharacterSheets(d))
	}, [])

	// TODO: Need to determine if no characters exist and display a message to the user
	if (characterSheets.length === 0) {
		return <div><AddCharacter /></div>
	}

	const cardList = characters.map((el, key) => {
		const {
			allianceID, birthday, bloodlineID, corporationID, gender, raceID, securityStatus, description,
		} = characterSheets[key]
		return (
			<CharacterCard
				key={key}
				characterID={el.characterID}
				name={el.name}
				allianceID={allianceID}
				birthday={birthday}
				bloodlineID={bloodlineID}
				corporationID={corporationID}
				gender={gender}
				raceID={raceID}
				securityStatus={securityStatus}
				description={description}
			/>
		)
	})

	return (
		<div className='App'>
			<AddCharacter />
			{cardList}
		</div>
	)
}

export default Home
