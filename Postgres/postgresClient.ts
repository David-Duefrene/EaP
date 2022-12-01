const { Client } = require('pg')

const pgClient = new Client({
	host: 'localhost',
	port: 5432,
	user: 'postgres',
	password: 'password',
	database: 'DATABASE',
})
pgClient.connect()

export default pgClient
