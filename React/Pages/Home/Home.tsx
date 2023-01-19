import React from 'react'

import AddCharacter from '../../Components/Buttons/AddCharacter/AddCharacter'
import CharacterCard from '../../Components/CharacterCard/CharacterCard'
import CSS from './Home.module.css'
import { FindAllCharacters } from '../../../Electron/preload.d'

const useSuspense = (promise: () => Promise<any>) => {
	let status = 'pending'
	let result: any
	const suspend = promise().then(
		(res) => {
			status = 'success'
			result = res
		},
		(err) => {
			status = 'error'
			result = err
		},
	)
	return {
		read() {
			if (status === 'pending') {
				throw suspend
			} else if (status === 'error') {
				throw result
			}
			return result
		},
	}
}
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
