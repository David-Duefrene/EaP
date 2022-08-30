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
							name: name,
							// eslint-disable-next-line @typescript-eslint/ban-ts-comment
							// @ts-ignore - This is showing in typescript as a number, but it is actually a string
							characterID: parseInt(characterID),
							characterSheet: {
								create: {
									name: result.name,
									corporationID: result.corporation_id,
									allianceID: result.alliance_id,
									securityStatus: result.security_status,
									birthday: result.birthday,
									bloodLineID: result.bloodline_id,
									description: result.description,
									gender: result.gender,
									raceID: result.race_id,
								},
							},
						},
					}).catch((error: Error) => {
						console.error(error)
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
