import React, { useState } from 'react'

import CSS from './Notification.module.css'

const Notification = () => {
	const [ show, setShow ] = useState(false)
	const [ messages, setMessages ] = useState([])
	window.listen.notification((event, data) => {
		setMessages([ ...messages, data ])
	})

s	return (
		<>
			<button onClick={() => setShow(!show)} className={CSS.NotificationButton} type='button'>!</button>
			<div className={`${CSS.NotificationArea} ${show ? CSS.Active : null}`}>
				<ol className={CSS.NotificationList}>
					{
						messages.length > 0 ?
							messages.map((message, index) => {
								return (
									<li className={CSS.NotificationItem} key={index}>{`Type: ${message.type} Message: ${message.message}`}</li>
								)
							}) :
							<li className={CSS.NotificationItem}>No messages</li>
					}
				</ol>
			</div>
		</>
	)
}

export default Notification
