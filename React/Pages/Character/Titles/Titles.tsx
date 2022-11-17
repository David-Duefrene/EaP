import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import SortableList from '../../../Components/SortableList/SortableList'

import Title from '../../../../Types/APIResponses/EveOfficial/Title.types'

const Titles = () => {
	const [ title, setTitle ] = useState<Title>()
	const { characterID = '' } = useParams<{ characterID: string }>()

	useEffect(() => {
		window.getCharacter.titles(BigInt(characterID)).then((d: Title) => {
			setTitle(d)
		})
	}, [ characterID ])

	return title ?
		<>
			<h1>Titles</h1>
			<SortableList data={title} />
		</> : <h1>Loading...</h1>
}

export default Titles
