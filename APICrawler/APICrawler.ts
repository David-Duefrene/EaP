import Auth from './Auth/auth'
import endpoints from './Endpoints/index'
import publicCharacterData from './Endpoints/Character/PublicCharacterSheet'

import Log from '../Electron/MessagingSystem/Message.types'

//* Checks for process.send & sends it, this is to prevent Typescript errors
const defaultSendMessage = (message: Log) => {
	if (process.send) {
		process.send(message)
	}
}

//* Sends a message to the main process
const defaultReceiveMessage = (processMessages: (arg0: Log) => void) => {
	process.on('message', (message: Log) => {
		processMessages(message)
	})
}

const crawler = (sendMessage = defaultSendMessage, receiveMessage = defaultReceiveMessage) => {
	const auth = new Auth(sendMessage, receiveMessage)

	receiveMessage((message: Log) => {
		if (message.type === 'refreshAPI') {
			Object.entries(auth.characterList).forEach(async ([ characterName, characterTokens ]) => {
				if (characterTokens.characterID < 0) {
					return
				}

				publicCharacterData({ ...characterTokens }).then(() => {
					endpoints.forEach((endpoint) => {
						endpoint({ ...characterTokens })
							.catch((error: Error) => {
								const newMessage = {
									type: 'log',
									log: { error: error.toString() },
								}

								sendMessage(newMessage)
							})
					})
				})
			})
		}
	})
}

export default crawler
