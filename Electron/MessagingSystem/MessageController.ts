// Electron
const { shell, safeStorage } = require('electron')
const Store = require('electron-store')
const electronStore = new Store()

// Types
import { ChildProcess } from 'node:child_process'

import type Log from './Message.types'

const MessageController = (apiChild: ChildProcess) => {
	return (message: Log) => {
		if (message.type === 'url') {
			shell.openExternal(message.log.url)
		} else if (message.type === 'token') {
			// @ts-ignore
			BigInt.prototype.toJSON = function () {
				// Allows electron to store the characterID
				return this.toString()
			}

			const name = message.message.name
			const token = safeStorage.encryptString(message.message.refreshToken)

			electronStore.set(name, token)
			apiChild.send({ type: 'refreshAPI', message: '' })
		} else if (message.type === 'tokenExpired') {
			const name = message.log.characterName
			// TODO: Alert user that their token has expired
			console.log('tokenExpired', name)
		} else if (message.type === 'log') {
			console.log('Electron log')
			console.dir(message)
		}
	}
}

export default MessageController
