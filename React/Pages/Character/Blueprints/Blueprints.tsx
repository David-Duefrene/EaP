import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import SortableList from '../../../Components/SortableList/SortableList'

import Blueprint from '../../../../APICrawler/Endpoints/Character/Blueprint/Blueprint.d'

import './Blueprints.css'

const Blueprints = () => {
	const [ blueprints, setBlueprints ] = useState<Blueprint[]>([])
	const { characterID = '' } = useParams<{ characterID: string }>()

	useEffect(() => {
		window.getCharacter.blueprints(BigInt(characterID)).then((d: Blueprint[]) => {
			setBlueprints(d)
		})
	}, [ characterID ])

	return blueprints.length ?
		<>
			<h1>Blueprints</h1>
			<SortableList data={blueprints} ignore={[ 'characterID' ]} />
		</> : <h1>Loading...</h1>
}

export default Blueprints
