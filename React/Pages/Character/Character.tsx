import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useTranslation } from 'react-i18next'

import SortableList from '../../Components/SortableList/SortableList'

import { FindAllCharacters } from '../../../Electron/preload.d'
import Clones from '../../../APICrawler/Endpoints/Clones/Clones/Clones.d'

import CSS from './Character.module.css'

const {
	Island, Portrait, AllianceLogo, CorpLogo, Data, Bio,
} = CSS

const Character = () => {
	const { t } = useTranslation([ 'keys', 'enums' ])
	const [ character, setCharacter ] = useState<FindAllCharacters>()
	const [ clones, setClones ] = useState<Clones[]>()
	const { characterID = '' } = useParams<{ characterID: string }>()

	useEffect(() => {
		window.getCharacter.characterSheet(BigInt(characterID)).then((char) => {
			setCharacter(char)
		})
		window.getCharacter.clones(BigInt(characterID)).then((clone) => {
			setClones(clone)
		})
	}, [ characterID ])

	if (!character) {
		return <h1>Loading...</h1>
	}
	const {
		name, alliance, corporation, allianceID, corporationID, birthday, bloodlineName, gender, raceName,
		securityStatus, titleName, description,
	} = character

	return clones ?
		<>
			<div className={Island}>
				<img className={Portrait} alt={`${name}'s character portrait`} src={`https://images.evetech.net/characters/${characterID}/portrait?tenant=tranquility&size=256`} />
				<img className={AllianceLogo} alt={'Alliance Logo'} src={`https://images.evetech.net/Alliance/${allianceID}_128.png`} />
				<img className={CorpLogo} alt={'Corporation Logo'} src={`https://images.evetech.net/Corporation/${corporationID}_128.png`} />
				<ul className={Data}>
					<li>{`${t('name')}: ${name}`}</li>
					<li>{`${t('characterID')}: ${characterID}`}</li>
					<li dangerouslySetInnerHTML={ { __html: titleName } }></li>
					<li>{`${t('alliance')}: ${alliance}`}</li>
					<li>{`${t('birthday')}: ${birthday.toLocaleString()}`}</li>
					<li>{`${t('bloodline')}: ${bloodlineName}`}</li>
					<li>{`${t('corporation')}: ${corporation}`}</li>
					<li>{`${t('gender')}: ${gender}`}</li>
					<li>{`${t('race')}: ${raceName}`}</li>
					<li>{`${t('securityStatus')}: ${securityStatus.toFixed(2)}`}</li>
				</ul>
			</div>
			<SortableList data={clones} ignore={[ 'characterID' ]} />
			<div className={Bio} dangerouslySetInnerHTML={{ __html: description }} />
		</> : <h1>Loading...</h1>
}

export default Character
