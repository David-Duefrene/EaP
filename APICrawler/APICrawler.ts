import Auth from './Auth/auth'
import endpoints from './Endpoints/index'

type Message = { 'type': string, 'message': string | Record<string, string> };
type ErrorMessage = { 'type': string, 'message': Error };

//* Checks for process.send & sends it, this is to prevent Typescript errors
const defaultSendMessage = (message: Message | ErrorMessage) => {
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
					// TODO: fix characterName error - is it needed?
					endpoint({ ...characterTokens, characterName }).catch((error: Error) => {
						const message ={
							type: 'error',
							message: error,
						}
						sendMessage(message)
					})
				})
			})
		}
	})
}

export default crawler
