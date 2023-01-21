import React, { useState, useEffect } from 'react'

import AddCharacter from '../../Components/Buttons/AddCharacter/AddCharacter'
import CharacterCard from '../../Components/CharacterCard/CharacterCard'

import CSS from './Home.module.css'

import { FindAllCharacters } from '../../../Electron/preload.d'

const Home = () => {
	const [ characters, setCharacters ] = useState<FindAllCharacters[]>([])

	useEffect(() => {
		window.findAll.characters().then((d: FindAllCharacters[]) => {
			setCharacters(d)
		})
	}, [])

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
