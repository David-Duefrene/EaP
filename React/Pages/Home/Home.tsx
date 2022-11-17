import React, { useState, useEffect } from 'react'

// import AddCharacter from '../../Components/Buttons/AddCharacter/AddCharacter'
import CharacterCard from '../../Components/CharacterCard/CharacterCard'
import './Home.css'
import CharacterQuery from '../../../Types/APIResponses/PrismaQueries/Character/CharacterSheetQueries.type'

const Home = () => {
	const [ characters, setCharacters ] = useState<CharacterQuery[]>([])
	const [ characterSheets, setCharacterSheets ] = useState<CharacterQuery[]>([])
	const [ isLoading, setIsLoading ] = useState(true)

	useEffect(() => {
		window.electronAPI.character().then((charList) => {
			window.electronAPI.characterSheet().then((charSheetList) => {
				setCharacters(charList)
				setCharacterSheets(charSheetList)
				setIsLoading(false)
			})
		})
	}, [])

	// TODO: Need to determine if no characters exist and display a message to the user
	if (isLoading) {
		return <h1>loading</h1> // <AddCharacter />
	}

	const cardList = characters.map((el, key) => {
		return (
			<CharacterCard
				key={key}
				character={{
					...el,
					...characterSheets[key],
				}}
			/>
		)
	})

	return (
		<div className='App'>
			{/* <AddCharacter /> */}
			{cardList}
		</div>
	)
}

export default Home
