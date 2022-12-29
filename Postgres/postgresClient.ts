require('dotenv').config()
const { Client } = require('pg')

// eslint-disable-next-line dot-notation
const isDev = process.env['DEV_MODE']

const port = isDev ? 5555 : 7856

const pgClient = new Client({
	host: 'localhost',
	port: port,
	user: 'postgres',
	password: 'password',
	database: 'DATABASE',
})
pgClient.connect().catch((err: Error) => {
	// eslint-disable-next-line no-console
	console.error(err)
})

export default pgClient
