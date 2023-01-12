import pgClient from './postgresClient'

export default async (tableName: string, data: { [x: string]: any }, uniqueColumns: string[]) => {
	const uniqueColumnsString = uniqueColumns.join(', ')
	const columns: string[] = []
	const values: string[] = []
	const newData: any[] = []

	Object.entries(data).forEach(([ key, value ], index) => {
		columns.push(key.replace(/[A-Z]{1,2}/g, (letter: string) => {
			if (letter === 'ID') return '_id'
			else if (letter === 'HQ') return '_hq'

			return '_' + letter.toLowerCase()
		}))
		values.push(`$${index + 1}`)
		newData.push(value)
	})

	const query = /*SQL*/`
	INSERT INTO ${tableName} (${columns.join(', ')})
	VALUES (${values.join(', ')})
	ON CONFLICT (${uniqueColumnsString}) DO UPDATE SET ${columns.map((key) => `"${key}" = $${columns.indexOf(key) + 1}`).join(', ')}`

	await pgClient.query(query, newData).catch((error: Error) => {
		throw new Error(`${tableName} SQL error\n`, { cause: error })
	})
}
