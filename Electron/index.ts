require('dotenv').config()

const path = require('path')
const { existsSync, readdirSync } = require('node:fs')
const { fork, execSync, exec } = require('node:child_process')

const { app, BrowserWindow, ipcMain, safeStorage } = require('electron')
const Store = require('electron-store')
const electronStore = new Store()

import MessageController from './MessagingSystem/MessageController'

// eslint-disable-next-line dot-notation
const isDev = process.env['DEV_MODE'] === 'true'
const postgresMigrationLocation: string = isDev ? './Postgres/' : path.join(process.resourcesPath, 'Postgres')
const postgresBinLocation: string = path.join(postgresMigrationLocation, 'pgsql', 'bin')
// eslint-disable-next-line dot-notation
const dataDirectory: string = path.join(process.env['ProgramData'], 'EAP', isDev ? 'dev-data' : 'data')

const port = isDev ? 5555 : 7856
const { Client } = require('pg')
const pgClient = new Client({
	host: 'localhost',
	port: port,
	user: 'postgres',
	password: 'password',
	database: 'DATABASE',
})

import type Character from '../APICrawler/Endpoints/Character/CharacterSheet/CharacterSheet.type'

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

	const checkPostgres = async () => {
		try {
			await execSync(path.join(postgresBinLocation, `pg_isready.exe -p ${port}`))
			return
		} catch (err) {
			// If pg_isready return 1 pg is not ready, wait and try again
			await new Promise((resolve) => setTimeout(resolve, 5000))
			await checkPostgres()
		}
	}

	// Check if the database directory has bPlug 'shmup/vim-sql-syntax'een created
	const logger = (error: Error, stdout: Buffer, stderr: Buffer) => console.log(`Error: ${error}\nstdout: ${stdout}\nstderr: ${stderr}`)
	if (!existsSync(dataDirectory)) {
		execSync(path.join(postgresBinLocation, `initdb.exe -E UTF8 -U postgres -D ${dataDirectory}`), logger)
		exec(path.join(postgresBinLocation, `pg_ctl.exe start -U postgres -o" -p ${port}" -D ${dataDirectory}`), logger)
		await checkPostgres()
		execSync(path.join(postgresBinLocation, `createdb.exe -p ${port} -U postgres DATABASE`), logger)
		const files = readdirSync(`${postgresMigrationLocation}/SQL/`)
		// Create a function that sores the files by the forst 3 numbers in their name
		const sortFiles = (a: string, b: string) => {
			const aNum = parseInt(a.slice(0, 3))
			const bNum = parseInt(b.slice(0, 3))
			if (aNum < bNum) return -1
			if (aNum > bNum) return 1
			return 0
		}
		files.sort(sortFiles)
		files.forEach((file) => {
			execSync(path.join(postgresBinLocation, `psql.exe -p ${port} -U postgres -d DATABASE -f ${path.join(postgresMigrationLocation, 'SQL', file)}`), logger)
		})
	} else {
		exec(path.join(postgresBinLocation, `pg_ctl.exe start -U postgres -o" -p ${port}" -D ${dataDirectory}`), logger)
		await checkPostgres()
	}

	pgClient.connect()

	const controller = new AbortController()
	const { signal } = controller

	const crawlerLocation = isDev ? './APICrawler/vite-build/Auth.cjs' : path.join(process.resourcesPath, 'APICrawler', 'vite-build', 'ElectronEntry.es.js')
	const child = fork(crawlerLocation, { signal })
	const characterIDList = await pgClient.query('SELECT * FROM character')

	pgClient.end()

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
	// Kill the postgres process
	execSync(path.join(postgresBinLocation, `pg_ctl.exe stop -U postgres -D ${dataDirectory} -m immediate`))
})

export {}
