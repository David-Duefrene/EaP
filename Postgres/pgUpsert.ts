import pgClient from './postgresClient'

export default async (tableName: string, data: { [x: string]: any }, uniqueColumns: string[]) => {
	const convertKeys = (obj: string[]) => {
		return obj.map((key) => key.replace(/[A-Z]{1,2}/g, (letter) => {
			if (letter === 'ID') return '_id'
			else if (letter === 'HQ') return '_hq'

			return '_' + letter.toLowerCase()
		}))
	}

	let keys = Object.keys(data)
	const columns = convertKeys(keys).join(', ')
	const values = keys.map((key) => data[key as keyof typeof data])
	const uniqueColumnsString = uniqueColumns.join(', ')
	keys = convertKeys(keys)

	const query = /*SQL*/`
	INSERT INTO ${tableName} (${columns})
	VALUES (${keys.map((key, index) => `$${index + 1}`).join(', ')})
	ON CONFLICT (${uniqueColumnsString}) DO UPDATE SET ${keys.map((key) => `"${key}" = $${keys.indexOf(key) + 1}`).join(', ')}`
	await pgClient.query(query, [ ...values ]).catch((error: Error) => {
		throw new Error(`${tableName} SQL error\n`, { cause: error })
	})
}
