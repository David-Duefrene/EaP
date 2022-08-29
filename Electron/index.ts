/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config()

const { fork } = require('node:child_process')

const { ApolloServer, gql } = require('apollo-server')

const {
	app, BrowserWindow, shell, ipcMain, safeStorage,
} = require('electron')
const Store = require('electron-store')
const electronStore = new Store()
// GraphQL code
const typeDefs = gql`
    type Book {
        title: String
        author: String
    }

    type Query {
        books: [Book]
    }
`
// Example data
const books = [
	{
		title: 'The Awakening',
		author: 'Kate Chopin',
	},
	{
		title: 'City of Glass',
		author: 'Paul Auster',
	},
]

/*
 * Resolvers define the technique for fetching the types defined in the
 * schema. This resolver retrieves books from the "books" array above.
 */
const resolvers = {
	Query: {
		books: () => books,
	},
}

/*
 * The ApolloServer constructor requires two parameters: your schema
 * definition and your set of resolvers.
 */
const server = new ApolloServer({
	typeDefs,
	resolvers,
	csrfPrevention: true,
})

/*
 * The `listen` method launches a web server.
 * TODO do something better than console log
 */
server.listen().then(({ url }) => {
	console.log(`🚀  Server ready at ${url}`)
})

// Electron code
const createWindow = () => {
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

	// Pull all tokens from the store
	const characterList = electronStore.get('characters', '')
	if (characterList.length > 1) {
		const charDict = {}
		for (const character of characterList) {
			const buffer = Buffer.from(electronStore.get(character))
			const decryptedBuffer = safeStorage.decryptString(buffer)
			charDict[character] = decryptedBuffer
		}
		child.send({ type: 'CharList', message: charDict })
	}

	// TODO create a proper message system
	child.on('message', (message) => {
		if (message.type === 'url') {
			shell.openExternal(message.message)
		} else if (message.type === 'token') {
			const name = message.message.name
			const token = safeStorage.encryptString(message.message.refreshToken)
			const charList = electronStore.get('characters', '')

			if (!charList.includes(name)) {
				charList[name] = token
				electronStore.set('characters', charList)
			}
			electronStore.set(name, token)
		} else if (message.type === 'tokenExpired') {
			const name = message.message.characterName
			const charList = electronStore.get('characters', '')

			if (name in charList) {
				delete charList[name]
				electronStore.set('characters', charList)
			}
		}
	})

	ipcMain.on('Login', (event) => {
		event.preventDefault()
		console.log('Login')
		child.send({ type: 'Login', message: 'Login' })
		/*
		 * Child.on('error', (err) => {
		 * 	console.log(err);
		 * });
		 * controller.abort(); // Stops the child process
		 */
	})

	/*
	 * TODO check if in dev or build
	 */
	win.loadURL('http://localhost:3000')
}

app.whenReady().then(() => {
	createWindow()
}).catch((err) => {
	console.log(err)
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})
