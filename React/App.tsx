import React, { useState, useEffect } from 'react'

const { PrismaClient } = require('@prisma/client')

import AddCharacter from './AddCharacter/AddCharacter'
import './App.css'

const prisma = new PrismaClient()

type CharacterQuery = {
	characterID: string,
	name: string,
}

const App = () => {
	const [ characters, setCharacters ] = useState<CharacterQuery[]>([])

	useEffect(() => {
		prisma.character.findMany().then((d: CharacterQuery[]) => setCharacters(d))
	}, [])

	return (
		<div className='App'>
			<AddCharacter />
			{characters.map((el, key) => {
				return (
					<div className='Card' key={key}>
						<h2 className='CharacterName'>{el.name}</h2>
						<p className='CharacterID'>{el.characterID}</p>
					</div>
				)
			}) }
		</div>
	)
}

export default App
