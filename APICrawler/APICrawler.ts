import Auth from './Auth/auth'
import endpoints from './Endpoints/index'

type Message = { 'type': string, 'message': string | Record<string, string> };

//* Checks for process.send & sends it, this is to prevent Typescript errors
const defaultSendMessage = (message: Message) => {
	if (process.send) {
		process.send(message)
	}
}

//* Sends a message to the main process
const defaultReceiveMessage = (processMessages: (arg0: Message) => void) => {
	process.on('message', (message: Message) => {
		processMessages(message)
	})
}

const crawler = (sendMessage = defaultSendMessage, receiveMessage = defaultReceiveMessage) => {
	const auth = new Auth(sendMessage, receiveMessage)

	receiveMessage((message: Message) => {
		if (message.type === 'refreshAPI') {
			Object.entries(auth.characterList).forEach(([ characterName, characterTokens ]) => {
				if (characterTokens.characterID < 0) {
					return
				}
				endpoints.forEach((endpoint) => {
					endpoint({ ...characterTokens, characterName }).catch((error: Error) => {
						// eslint-disable-next-line no-console
						console.log(error)
					})
				})
			})
		}
	})
}

export default crawler
