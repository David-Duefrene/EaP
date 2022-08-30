import Auth from './Auth/auth'
import publicCharacterData from './Endpoints/Character/publicCharacterData'

import Character from '../Types/APIResponses/EveOfficial/character.type'

type Message = { type: string, message: string };
type SendMessage = (message: Message) => void;

//* Checks for process.send & sends it, this is to prevent Typescript errors
const defaultSendMessage: SendMessage = (message: Message) => {
	if (process.send) {
		process.send(message)
	}
}

//* Sends a message to the main process
const defaultReceiveMessage = (processMessages: (arg0: Message) => void) => {
	process.on('message', (message: Message) => {
		// eslint-disable-next-line no-console
		console.log(message)
		processMessages(message)
	})
}

const crawler = (sendMessage = defaultSendMessage, receiveMessage = defaultReceiveMessage) => {
	const auth = new Auth(sendMessage, receiveMessage)

	receiveMessage((message: Message) => {
		if (message.type === 'refreshAPI') {
			Object.entries(auth.characterList).forEach(([ name, { characterID } ]) => {
				publicCharacterData(characterID).then((result: Character) => {
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
