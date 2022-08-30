const axios = require('axios')

export default (characterID: number) => {
	return axios.get(`https://esi.evetech.net/latest/characters/${characterID}/?datasource=tranquility`).then((result) => {
		return result.data
	})
}
