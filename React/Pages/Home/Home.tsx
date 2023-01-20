import React from 'react'

import useSuspense from '../../Hooks/useSuspense'

import AddCharacter from '../../Components/Buttons/AddCharacter/AddCharacter'
import CharacterCard from '../../Components/CharacterCard/CharacterCard'

import CSS from './Home.module.css'

import { FindAllCharacters } from '../../../Electron/preload.d'

const loadCharacters = useSuspense(window.findAll.characters)

const Home = () => {
	const characters:FindAllCharacters[] = loadCharacters.read()

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
