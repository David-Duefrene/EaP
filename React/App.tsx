import React, { useState, useEffect } from 'react'

const { PrismaClient } = require('@prisma/client')

import AddCharacter from './AddCharacter/AddCharacter'
import './App.css'
import CharacterQuery from '../Types/APIResponses/PrismaQueries/Character/CharacterSheetQueries.type'

const prisma = new PrismaClient()

const App = () => {
	const [ characters, setCharacters ] = useState<CharacterQuery[]>([])
	const [ characterSheets, setCharacterSheets ] = useState<CharacterQuery[]>([])

	useEffect(() => {
		prisma.character.findMany().then((d: CharacterQuery[]) => setCharacters(d))
		prisma.characterSheet.findMany().then((d: CharacterQuery[]) => setCharacterSheets(d))
	}, [])

	// if (characterSheets.length === 0) {
	// 	return <div>Loading...</div>
	// }

	const cardList = characters.map((el, key) => {
		const {
			allianceID, birthday, bloodLineID, corporationID, gender, raceID, securityStatus,
		} = characterSheets[key]
		return (
			<div key={key} className='Card'>
				<img className='Portrait' src={`https://images.evetech.net/characters/${el.characterID}/portrait?tenant=tranquility&size=256`} />
				<ul className='CardBody'>
					<li>{el.name}</li>
					<li>Character ID: {el.characterID}</li>
					<li>Alliance ID: {allianceID}</li>
					<li>Character birthday: {`${birthday}`}</li>
					<li>Bloodline ID: {bloodLineID}</li>
					<li>Corp ID:{corporationID}</li>
					<li>Gender: {gender}</li>
					<li>Race ID: {raceID}</li>
					<li>Security Status: {securityStatus}</li>
				</ul>
			</div>
		)
	})

	return (
		<div className='App'>
			<AddCharacter />
			{cardList}
		</div>
	)
}

export default App
