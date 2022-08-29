import Auth from './Auth/auth'
import publicCharacterData from './Endpoints/Character/publicCharacterData'

type Message = { type: string, message };
type SendMessage = (message: Message) => void;

//* Checks for process.send & sends it, this is to prevent Typescript errors
const defaultSendMessage: SendMessage = (message) => {
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
			Object.entries(auth.characterList).forEach(([ name, { characterID } ]) => {
				publicCharacterData(characterID).then((result) => {
					// eslint-disable-next-line no-console
					console.log(`Name: ${name}\n${JSON.stringify(result)}`)
				}).catch((error) => {
					// eslint-disable-next-line no-console
					console.log(error)
				})
			})
		}
	})
}

export default crawler
