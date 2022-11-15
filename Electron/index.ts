/* eslint-disable no-console */
require('dotenv').config()

const { fork } = require('node:child_process')

const {
	app, BrowserWindow, ipcMain, safeStorage,
} = require('electron')
const Store = require('electron-store')
const electronStore = new Store()

import MessageController from './MessagingSystem/MessageController'
import PrismaClient from '../prisma/PrismaClient'

import type { Character } from '@prisma/client'

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

	if (characterIDList.length > 0) {
		const charDict: Record<string, Character> = {}
		characterIDList.forEach((char: Character) => {
			const buffer = Buffer.from(electronStore.get(char.name))
			const decryptedBuffer = safeStorage.decryptString(buffer)
			charDict[char.name] = decryptedBuffer
		})
		child.send({ type: 'CharList', message: charDict })
	}

	// Messaging system
	const messageController = MessageController(child)
	child.on('message', messageController)

	ipcMain.on('Login', (event: Event) => {
		event.preventDefault()
		console.log('Login')
		child.send({ type: 'Login', message: 'Login' })
	})

	// TODO check if in dev or build
	win.loadURL('http://localhost:3000')
}

app.whenReady().then(() => {
	createWindow()
}).catch((err: Error) => {
	console.log('app.whenReady error\n', err)
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

export {}
