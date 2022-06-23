/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
const { ApolloServer, gql } = require('apollo-server');
const { app, BrowserWindow, shell, ipcMain } = require('electron');
const { fork } = require('node:child_process');

// GraphQL code
const typeDefs = gql`
    type Book {
        title: String
        author: String
    }

    type Query {
        books: [Book]
    }
`;

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
];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
	Query: {
		books: () => books,
	},
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
	typeDefs,
	resolvers,
	csrfPrevention: true,
});

// The `listen` method launches a web server.
// TODO do something better than console log
server.listen().then(({ url }) => {
	console.log(`🚀  Server ready at ${url}`);
});

// Electron code
const createWindow = () => {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			nodeIntegrationInWorker: true,
			// preload: path.join(__dirname, 'preload.js'),
		},
	});

	ipcMain.on('Login', (event) => {
		event.preventDefault();
		const controller = new AbortController();
		const { signal } = controller;
		const child = fork('./Auth/vite-build/auth.build.js.es.js', { signal });
		child.on('message', (message) => {
			shell.openExternal(message.url);
		});
		// child.on('error', (err) => {
		// 	console.log(err);
		// });
		// controller.abort(); // Stops the child process
	});

	// TODO process.env.NODE_ENV seems to not be set dev despite it needing to be set to dev
	// Check if we are in development mode
	const isDev = process.env.NODE_ENV === 'dev' ||
    process.env.NODE_ENV === 'development';
	// building with vite appears to show up as undefined instead of production
	process.env.NODE_ENV === undefined;
	// eslint-disable-next-line no-constant-condition
	true ?
		win.loadURL('http://localhost:3000') :
		win.loadFile('vite-build/index.html');
};

app.whenReady().then(() => {
	createWindow();
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});
