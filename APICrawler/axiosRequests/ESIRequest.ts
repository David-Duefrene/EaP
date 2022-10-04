const axios = require('axios')

export default (path: string, accessToken = '', server='tranquility') => {
	// Create an axios.create object that converts the response data to camelCase
	const esiAxios = axios.create({
		baseURL: `https://esi.evetech.net/latest/${path}`,
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	})

	const convertKeys = (obj: any) => {
		const newData = {}

		Object.keys(obj).forEach((key) => {
			newData[key.replace(/([-_][a-z])/ig, (letter) => {
				return letter.toUpperCase().replace('_', '')
			})] = obj[key]
		})
		return newData
	}

	esiAxios.interceptors.response.use((response) => {
		if (Array.isArray(response.data)) {
			response.data = response.data.map((item: any) => {
				return convertKeys(item)
			})
		} else if (typeof response.data === 'object' && !Array.isArray(response.data) && response.data !== null) {
			response.data = convertKeys(response.data)
		}
		return response
	}, (error: Error) => {
		console.log(error)
		return Promise.reject(error)
	})

	return esiAxios.get(`?datasource=${server}`)
}
