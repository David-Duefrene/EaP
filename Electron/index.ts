require('dotenv').config()

const path = require('path')
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
			contextIsolation: true,
			nodeIntegrationInWorker: true,
			preload: path.join(__dirname, 'index.es2.js'),
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
		child.send({ type: 'CharList', log: charDict })
	}

	// Messaging system
	const messageController = MessageController(child, win)
	child.on('message', messageController)

	ipcMain.on('Login', (event: Event) => {
		event.preventDefault()
		child.send({ type: 'Login', message: 'Login' })
	})

	// TODO check if in dev or build
	win.loadURL('http://localhost:3000')
}

app.whenReady().then(() => {
	ipcMain.handle('character', async () => await PrismaClient.character.findMany())
	ipcMain.handle('characterSheet', async () => await PrismaClient.characterSheet.findMany())
	ipcMain.handle('characterTitles', async (event: Event, characterID: bigint) => await PrismaClient.Title.findMany({ where: { characterID } }))
	ipcMain.handle('characterBlueprints', async (event: Event, characterID: bigint) => await PrismaClient.Blueprint.findMany({ where: { ownerID: characterID } }))
	ipcMain.handle('characterContactNotifications', async (event: Event, characterID: bigint) => await PrismaClient.ContactNotification.findMany({ where: { characterID } }))
	ipcMain.handle('characterCorpHistory', async (event: Event, characterID: bigint) => await PrismaClient.corpHistory.findMany({ where: { characterID } }))
	ipcMain.handle('characterCorpRoles', async (event: Event, characterID: bigint) => await PrismaClient.corpRoles.findUnique({ where: { characterID } }))
	ipcMain.handle('characterMedals', async (event: Event, characterID: bigint) => await PrismaClient.Medal.findMany({ where: { characterID } }))
	ipcMain.handle('characterNotifications', async (event: Event, characterID: bigint) => await PrismaClient.Notification.findMany({ where: { characterID } }))
	ipcMain.handle('characterStandings', async (event: Event, characterID: bigint) => await PrismaClient.Standings.findMany({ where: { characterID } }))
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
