import React, { useState, useEffect } from 'react'

import AddCharacter from '../../Components/Buttons/AddCharacter/AddCharacter'
import CharacterCard from '../../Components/CharacterCard/CharacterCard'
import CSS from './Home.module.css'
import { FindAllCharacters } from '../../../Electron/preload.d'

const Home = () => {
	const [ characters, setCharacters ] = useState<FindAllCharacters[]>([])
	const [ isLoading, setIsLoading ] = useState(true)

	useEffect(() => {
		window.findAll.characters().then((charList) => {
			setCharacters(charList)
			setIsLoading(false)
		})
	}, [])

	// TODO: Need to determine if no characters exist and display a message to the user
	if (isLoading) {
		return <AddCharacter />
	}
	const cardList = characters.map((el, key) => {
		return (
			<CharacterCard
				key={key}
				character={{ ...el }}
			/>
		)
	})

	return (
		<>
			<AddCharacter />
			<div className={CSS.Content}>
				{cardList}
			</div>
		</>
	)
}

export default Home
