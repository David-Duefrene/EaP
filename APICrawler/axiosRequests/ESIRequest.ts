const axios = require('axios')

export default (path: string, accessToken = '', server='tranquility') => {
	// Create an axios.create object that converts the response data to camelCase
	const esiAxios = axios.create({
		baseURL: `https://esi.evetech.net/latest/${path}`,
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	})

	return esiAxios.get(`?datasource=${server}`)
}
