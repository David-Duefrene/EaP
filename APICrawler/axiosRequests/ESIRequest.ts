const axios = require('axios')

export default (path: string, accessToken = '', server='tranquility') => {
	const config = {
		headers: {
			'Authorization': `Bearer ${accessToken}`,
		},
	}

	return axios.get(`https://esi.evetech.net/latest/${path}/?datasource=${server}`, config)
}
