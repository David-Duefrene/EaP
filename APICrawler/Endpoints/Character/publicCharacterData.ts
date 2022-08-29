/* eslint-disable @typescript-eslint/no-var-requires */
const axios = require('axios')

export default (characterID: string) => {
	return axios.get(`https://esi.evetech.net/latest/characters/${characterID}/?datasource=tranquility`).then((result) => {
		return result.data
	})
}
