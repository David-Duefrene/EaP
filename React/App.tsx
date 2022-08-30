import React, { useState, useEffect } from 'react'

const { PrismaClient } = require('@prisma/client')

import AddCharacter from './AddCharacter/AddCharacter'
import logo from './logo.svg'
import './App.css'

const prisma = new PrismaClient()

const App = () => {
	const [ characters, setCharacters ] = useState([])

	useEffect(() => {
		prisma.character.findMany().then((d) => setCharacters(d))
	}, [])

	return (
		<div className='App'>
			<header className='App-header'>
				<img src={logo} className='App-logo' alt='logo' />
				<p>Hello Vite, React, GraphQL, and Electron!</p>
				<p>env is {process.env.NODE_ENV}</p>
				<AddCharacter />
				{characters.map((el, key) => {
					return (
						<div key={key}>
							<div>{el.name}</div>
							<div>{el.characterID}</div>
						</div>
					)
				}) }
			</header>
		</div>
	)
}

export default App
