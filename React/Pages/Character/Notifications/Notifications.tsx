import React, {	useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import SortableList from '../../../Components/SortableList/SortableList'
import Notification from '../../../../Types/APIResponses/EveOfficial/Notifications.types'

const Notifications = () => {
	const [ notifications, setNotifications ] = useState<Notification[]>()
	const { characterID = '' } = useParams<{ characterID: string }>()

	useEffect(() => {
		window.getCharacter.notifications(BigInt(characterID)).then((d: Notification[]) => {
			setNotifications(d)
		})
	}, [ characterID ])

	return notifications ?
		<>
			<h1>Notifications</h1>
			<SortableList data={notifications} />
		</> : <h1>Loading...</h1>
}

export default Notifications
