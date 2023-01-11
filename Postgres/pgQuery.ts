import pgClient from './postgresClient'

const convertKeys = (obj: any) => {
	const newData = {}
	// TODO map this to a new object
	Object.keys(obj).forEach((key) => {
		newData[key.replace(/([-_][a-z]{2})/ig, (letter) => {
			if (letter === '_id') return 'ID'
			else if (letter === '_hq') return 'HQ'

			return letter[1].toUpperCase() + letter[2]
		})] = obj[key]
	})
	return newData
}

export default async (query: string, values: any[] = []) => {
	const result = await pgClient.query(query, [ ...values ]).catch((error: Error) => {
		throw new Error('pgQuery SQL error\n', { cause: error })
	})
	return result.rows.map((el) => convertKeys(el))
}
