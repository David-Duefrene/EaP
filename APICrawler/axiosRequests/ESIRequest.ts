import axios from 'axios'

import pgQuery from '../../Postgres/pgQuery'
import pgUpsert from '../../Postgres/pgUpsert'

export default async (path: string, accessToken = '', server='tranquility') => {
	try {
		const etag = await pgQuery(`SELECT etag FROM etag_cache WHERE url = '${path}'`)
		const esiAxios = axios.create({
			baseURL: `https://esi.evetech.net/latest/${path}`,
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'If-None-Match': etag.length > 0 ? etag[0].etag : null,
			},
		})

		const result = await esiAxios.get(`?datasource=${server}`)
		await pgUpsert('etag_cache', { url: path, etag: result.headers.etag }, [ 'url' ])
		return result.data
	} catch (error) {
		if ('response' in error && error.response.status === 304) throw '304'
		throw new Error('ESI API error\n', { cause: error })
	}
}
