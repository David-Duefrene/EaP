import Auth from './Auth/auth'
import publicCharacterData from './Endpoints/Character/publicCharacterData'

import Character from '../Types/APIResponses/EveOfficial/character.type'
const { PrismaClient } = require('@prisma/client')

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
			Object.entries(auth.characterList).forEach(([ name, { characterID } ]) => {
				if (characterID < 0) {
					return
				}
				publicCharacterData(characterID).then((result: Character) => {
					const prisma = new PrismaClient()

					prisma.Character.create({
						data: {
							name,
						},
					})
				}).catch((error: Error) => {
					// eslint-disable-next-line no-console
					console.log(error)
				})
			})
		}
	})
}

export default crawler
