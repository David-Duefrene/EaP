require('dotenv').config()

const path = require('path')
const { fork } = require('node:child_process')

const { app, BrowserWindow, ipcMain, safeStorage } = require('electron')
const Store = require('electron-store')
const electronStore = new Store()

import MessageController from './MessagingSystem/MessageController'

const { Client } = require('pg')

const pgClient = new Client({
	host: 'localhost',
	port: 5432,
	user: 'postgres',
	password: 'password',
	database: 'DATABASE',
})
pgClient.connect()

import type Character from '../Types/APIResponses/EveOfficial/character.type'

const createWindow = async () => {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: true,
			nodeIntegrationInWorker: true,
			preload: path.join(__dirname, 'index.es2.js'),
		},
	})

	// eslint-disable-next-line dot-notation
	const isDev = process.env['DEV_MODE']
	const controller = new AbortController()
	const { signal } = controller

	const crawlerLocation = isDev ? './APICrawler/vite-build/ElectronEntry.es.js' : './resources/APICrawler/vite-build/ElectronEntry.es.js'
	const child = fork(crawlerLocation, { signal })
	const characterIDList = await pgClient.query('SELECT * FROM public."Character"')

	if (characterIDList.length > 0) {
		const charDict: Record<string, Character> = {}
		characterIDList.forEach((char: Character) => {
			const buffer = Buffer.from(electronStore.get(char.name))
			const decryptedBuffer = safeStorage.decryptString(buffer)
			charDict[char.name] = decryptedBuffer
		})
		child.send({ type: 'CharList', log: charDict })
	}

	// Messaging system
	const messageController = MessageController(child, win)
	child.on('message', messageController)

	ipcMain.on('Login', (event: Event) => {
		event.preventDefault()
		child.send({ type: 'Login', message: 'Login' })
	})

	if (isDev) {
		win.loadURL('http://localhost:3000')
	} else {
		win.loadFile(require('path').join(__dirname, 'index.html'))
	}
	win.webContents.openDevTools()
}

app.whenReady().then(() => {
	createWindow()
}).catch((err: Error) => {
	// eslint-disable-next-line no-console
	console.log('app.whenReady error\n', err)
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

export {}
