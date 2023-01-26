const axios = require('axios')

export default async (path: string, accessToken = '', server='tranquility') => {
	const esiAxios = axios.create({
		baseURL: `https://esi.evetech.net/latest/${path}`,
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	})

	const result = await esiAxios.get(`?datasource=${server}`)
	// return async () => {
	// 	const result = await esiAxios.get(`?datasource=${server}`)
	return result.data
	// }
}
