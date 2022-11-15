import Log from '../../Electron/MessagingSystem/Message.types'

export type SendMessage = (message: Log) => void;

export type Token = {
	access_token: string,
	refresh_token: string,
}

export type JWT = {
	scp: string[],
	jti: string,
	kid: string,
	sub: string,
	azp: string,
	tenant: string,
	tier: string,
	region: string,
	aud: string,
	name: string,
	owner: string,
	exp: number,
	iat: number,
	iss: string,
}

export default {}
