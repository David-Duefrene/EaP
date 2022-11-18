// Electron
const {
	shell, safeStorage, BrowserWindow,
} = require('electron')
const Store = require('electron-store')
const electronStore = new Store()

// Types
import { ChildProcess } from 'node:child_process'

import type Log from './Message.types'

const MessageController = (apiChild: ChildProcess, win: typeof BrowserWindow) => {
	return (message: Log) => {
		if (message.type === 'url') {
			shell.openExternal(message.log.url)
		} else if (message.type === 'token') {
			// @ts-ignore
			BigInt.prototype.toJSON = function () {
				// Allows electron to store the characterID
				return this.toString()
			}

			const name = message.log.name
			const token = safeStorage.encryptString(message.log.refreshToken)

			electronStore.set(name, token)
			apiChild.send({ type: 'refreshAPI' })
		} else if (message.type === 'tokenExpired') {
			const name = message.log.characterName
			win.webContents.send('Notification', {
				type: 'tokenExpired',
				message: `The token for ${name} has expired. Please log in again.`,
			})
		} else if (message.type === 'log') {
			win.webContents.send('Notification', {
				type: 'log',
				message: message.log,
			})
		}
	}
}

export default MessageController
