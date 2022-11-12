/* eslint-disable no-console */
require('dotenv').config()

const { fork } = require('node:child_process')

const {
	app, BrowserWindow, shell, ipcMain, safeStorage,
} = require('electron')
const Store = require('electron-store')
const electronStore = new Store()

import PrismaClient from '../prisma/PrismaClient'

const createWindow = async () => {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			nodeIntegrationInWorker: true,
			// Preload: path.join(__dirname, 'preload.js'),
		},
	})
	const controller = new AbortController()
	const { signal } = controller
	const child = fork('./APICrawler/vite-build/ElectronEntry.es.js', { signal })

	const characterIDList = await PrismaClient.character.findMany()
	if (characterIDList.length > 1) {
		const charDict = {}
		characterIDList.forEach((char: { name: string }) => {
			const buffer = Buffer.from(electronStore.get(char.name))
			const decryptedBuffer = safeStorage.decryptString(buffer)
			charDict[char.name] = decryptedBuffer
		})
		child.send({ type: 'CharList', message: charDict })
	}

	// TODO create a proper message system
	child.on('message', async (message: any) => {
		if (message.type === 'url') {
			shell.openExternal(message.message)
		} else if (message.type === 'token') {
			const name = message.message.name
			const token = safeStorage.encryptString(message.message.refreshToken)
			const charList = await PrismaClient.character.findMany()

			if (!charList.includes(name)) {
				charList[name] = token
				electronStore.set('characters', charList)
			}
			electronStore.set(name, token)
			child.send({ type: 'refreshAPI', message: '' })
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
	})

	ipcMain.on('Login', (event: { preventDefault: () => void }) => {
		event.preventDefault()
		console.log('Login')
		child.send({ type: 'Login', message: 'Login' })
	})

	/*
	 * TODO check if in dev or build
	 */
	win.loadURL('http://localhost:3000')
}

app.whenReady().then(() => {
	createWindow()
}).catch((err: Error) => {
	console.log(err)
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

export {}
