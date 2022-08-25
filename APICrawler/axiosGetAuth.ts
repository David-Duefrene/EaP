// eslint-disable-next-line @typescript-eslint/no-var-requires
const axios = require('axios')

//* Sends a payload to Eve's auth API
export default (payload: any) => {
	return axios({
		method: 'POST',
		url: 'https://login.eveonline.com/v2/oauth/token',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		data: payload,
	})
}
