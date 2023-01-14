import Auth from './Auth/auth'
import endpoints from './Endpoints/index'
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
	try {
		const auth = new Auth(sendMessage, receiveMessage)

		receiveMessage((message: Log) => {
			if (message.type === 'refreshAPI') {
				Object.entries(auth.characterList).forEach(async ([ characterName, characterTokens ]) => {
					if (characterTokens.characterID < 0) {
						return
					}

					for (const [ key, value ] of Object.entries(endpoints.universe)) {
						value({ ...characterTokens })
					}

					await endpoints.character.publicCharacterSheet({ ...characterTokens })

					for (const [ key, value ] of Object.entries(endpoints.character)) {
						if (key === 'publicCharacterData') continue
						value({ ...characterTokens })
					}
				})
			}
		})
	} catch (error) {
		receiveMessage(error)
	}
}

export default crawler
