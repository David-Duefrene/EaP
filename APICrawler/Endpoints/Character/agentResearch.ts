const axios = require('axios')

export default (characterAuthData) => {
	const { characterID, accessToken } = characterAuthData
	const config = {
		headers: {
			'Authorization': `Bearer ${accessToken}`,
		},
	}

	return axios.get(`https://esi.evetech.net/latest/characters/${characterID}/agents_research/?datasource=tranquility`, config)
		.then((result) => {
			// eslint-disable-next-line no-console
			console.log('result', result)
		}).catch((error) => {
			// eslint-disable-next-line no-console
			console.log('Agent research error\n', error)
		})
}
