import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import CharacterQuery from '../../../Types/APIResponses/PrismaQueries/Character/CharacterSheetQueries.type'

const Character = () => {
	const [ character, setCharacter ] = useState<CharacterQuery>()
	const { characterID = '' } = useParams<{ characterID: string }>()

	useEffect(() => {
		window.getCharacter.characterSheet(BigInt(characterID)).then((char) => {
			setCharacter(char)
		})
	}, [ characterID ])

	return character ?
		<>
			<h1>{character.name}</h1>
		</> : <h1>Loading...</h1>
}

export default Character
