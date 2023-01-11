import pgQuery from './pgQuery'

export default async (tableName: string, characterID: bigint): Promise<[]> => {
	const result = await pgQuery(/*SQL*/`
		SELECT * FROM ${tableName}
		WHERE character_id = $1
	`, [ characterID ],
	).catch((error: Error) => {
		throw new Error(`${tableName} SQL error\n`, { cause: error })
	})
	return result
}
