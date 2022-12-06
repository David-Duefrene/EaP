require('dotenv').config()

const path = require('path')
const { existsSync } = require('node:fs')
const { fork, spawn, execSync } = require('node:child_process')

const { app, BrowserWindow, ipcMain, safeStorage } = require('electron')
const Store = require('electron-store')
const electronStore = new Store()

import MessageController from './MessagingSystem/MessageController'

// eslint-disable-next-line dot-notation
const isDev = process.env['DEV_MODE']

const port = isDev ? 5555 : 7856
const { Client } = require('pg')
const pgClient = new Client({
	host: 'localhost',
	port: port,
	user: 'postgres',
	password: 'password',
	database: 'DATABASE',
})

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

	// Check if the database directory has been created
	if (!existsSync(path.join(process.env['ProgramData'], '/EAP/data'))) {
		const logger = (error: Error, stdout: Buffer, stderr: Buffer) => error && console.log(error)
		execSync(path.join(__dirname, 'pgsql/bin/initdb.exe -E UTF8 -U postgres -D %PROGRAMDATA%/EAP/data'), logger)
		spawn(path.join(__dirname, '/pgsql/bin/postgres.exe'), [ '-D %PROGRAMDATA%/EAP/data', `-p ${port}` ], { shell: true })
		await new Promise((resolve) => setTimeout(resolve, 5000))

		execSync(path.join(__dirname, 'pgsql/bin/createdb.exe -U postgres DATABASE'), logger)
		execSync(path.join(__dirname, `pgsql/bin/pg_restore --no-privileges --no-owner -U postgres -d DATABASE ${path.join(__dirname, 'postgres-latest.dmp')}`), logger)
		execSync(path.join(__dirname, `pgsql/bin/psql.exe -a -d DATABASE -f ${path.join(__dirname, 'migration.sql')} -U postgres`), logger)
	} else {
		spawn(path.join(__dirname, '/pgsql/bin/postgres.exe'), [ '-D %PROGRAMDATA%/EAP/data', `-p ${port}` ], { shell: true })
		await new Promise((resolve) => setTimeout(resolve, 5000))
	}

	pgClient.connect()

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
