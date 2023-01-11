import pgClient from './postgresClient'

const convertKeys = (obj: Record<string, any>) => {
	const newResult = Object.entries(obj).map(([ key, value ]) => {
		key = key.replace(/([-_][a-z]{2})/ig, (letter) => {
			if (letter === '_id') return 'ID'
			else if (letter === '_hq') return 'HQ'

			return letter[1].toUpperCase() + letter[2]
		})
		return [ key, value ]
	})
	return Object.fromEntries(newResult)
}

export default async (query: string, values: any[] = []) => {
	const result = await pgClient.query(query, [ ...values ]).catch((error: Error) => {
		throw new Error('pgQuery SQL error\n', { cause: error })
	})
	return result.rows.map((el: Record<string, any>) => convertKeys(el))
}
