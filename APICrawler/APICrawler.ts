import Auth from './Auth/auth'

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
			Object.entries(auth.characterList).forEach(([ name, {
				accessToken, refreshToken, expiration, characterID,
			} ]) => {
				// eslint-disable-next-line no-console
				console.log(`Name: ${name}:\naccess token: ${accessToken}\nrefresh token: ${refreshToken}\nexpiration: ${expiration}\nID: ${characterID}`)
			})
		}
	})
}

export default crawler
