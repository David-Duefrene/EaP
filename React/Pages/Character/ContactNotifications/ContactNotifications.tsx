import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import prisma from '../../../../prisma/PrismaClient'
import BackButton from '../../../Components/Buttons/BackButton/BackButton'
import SortableList from '../../../Components/SortableList/SortableList'
// import './ContactNotifications.css'
import ContactNotification from '../../../../Types/APIResponses/EveOfficial/ContactNotifications.types'

const ContactNotifications = () => {
	const [ contactNotifications, setContactNotifications ] = useState<ContactNotifications[]>([])
	const [ isLoading, setIsLoading ] = useState(true)
	const { characterID } = useParams<{ characterID: string }>()

	useEffect(() => {
		prisma.contactNotification.findMany({ where: { characterID } })
			.then((d: ContactNotification[]) => {
				setContactNotifications(d)
				setIsLoading(false)
			})
	}, [ characterID ])

	if (isLoading) {
		return (
			<div>Loading...</div>
		)
	}

	return (
		<>
			<h1>Contact Notifications</h1>
			<BackButton />
			<SortableList data={contactNotifications} />
		</>
	)
}

export default ContactNotifications
