import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import SortableList from '../../../Components/SortableList/SortableList'
import ContactNotification from '../../../../APICrawler/Endpoints/Character/ContactNotification/ContactNotification.type'

const ContactNotifications = () => {
	const [ contactNotifications, setContactNotifications ] = useState<ContactNotification[]>()
	const { characterID = '' } = useParams<{ characterID: string }>()

	useEffect(() => {
		window.getCharacter.contactNotifications(BigInt(characterID)).then((d: ContactNotification[]) => {
			setContactNotifications(d)
		})
	}, [ characterID ])

	return contactNotifications ?
		<>
			<h1>Contact Notifications</h1>
			<SortableList data={contactNotifications} />
		</> : <h1>Loading...</h1>
}

export default ContactNotifications
