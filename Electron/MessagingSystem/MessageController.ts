const { shell, safeStorage } = require('electron')
const Store = require('electron-store')
const electronStore = new Store()

import PrismaClient from '../../prisma/PrismaClient'

import { ChildProcess } from 'node:child_process'

type Message = { type: string; message: { name: string; refreshToken: string; characterName: string } }

const MessageController = (apiChild: ChildProcess) => {
	return async (message: Message) => {
		if (message.type === 'url') {
			shell.openExternal(message.message)
		} else if (message.type === 'token') {
			// @ts-ignore
			BigInt.prototype.toJSON = function () {
				// Allows electron to store the characterID
				return this.toString()
			}

			const name = message.message.name
			const token = safeStorage.encryptString(message.message.refreshToken)
			const charList = await PrismaClient.character.findMany()

			if (!charList.includes(name)) {
				charList[name] = token
				electronStore.set('characters', charList)
			}
			electronStore.set(name, token)
			apiChild.send({ type: 'refreshAPI', message: '' })
		} else if (message.type === 'tokenExpired') {
			const name = message.message.characterName
			const charList = electronStore.get('characters', '')

			if (name in charList) {
				delete charList[name]
				electronStore.set('characters', charList)
			}
		} else if (message.type === 'log') {
			console.log('Electron log')
			console.log(message)
		}
	}
}

export default MessageController
