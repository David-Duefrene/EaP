import pgClient from '../postgres/postgresClient'

export default async (tableName: string, data: { [x: string]: any }, uniqueColumns: string[]) => {
	const keys = Object.keys(data)
	const columns = keys.join('", "')
	const values = keys.map((key) => data[key as keyof typeof data])
	const uniqueColumnsString = uniqueColumns.join('", "')

	await pgClient.query(/*SQL*/`
		INSERT INTO public."${tableName}" ("${columns}")
		VALUES (${keys.map((key, index) => `$${index + 1}`).join(', ')})
		ON CONFLICT ("${uniqueColumnsString}") DO UPDATE SET ${keys.map((key) => `"${key}" = $${keys.indexOf(key) + 1}`).join(', ')}`,
	[ ...values ],
	).catch((error: Error) => {
		throw new Error(`${tableName} SQL error\n`, { cause: error })
	})
}
