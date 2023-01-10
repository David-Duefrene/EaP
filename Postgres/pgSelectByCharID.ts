import pgClient from './postgresClient'

export default async (tableName: string, characterID: bigint): Promise<[]> => {
	const result = await pgClient.query(/*SQL*/`
		SELECT * FROM "${tableName}"
		WHERE "characterID" = $1
	`, [ characterID ],
	).catch((error: Error) => {
		throw new Error(`${tableName} SQL error\n`, { cause: error })
	})
	return result.rows
}
