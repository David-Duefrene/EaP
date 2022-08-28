/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config('./../.env')

const { randomBytes, createHash } = require('crypto')
const net = require('net')

const jwksClient = require('jwks-rsa')
const jwt = require('jsonwebtoken')

import GetAuth from '../axiosGetAuth'

type Message = { type: string, message };
type SendMessage = (message: Message) => void;

//* Checks for process.send & sends it, this is to prevent Typescript errors
const defaultSendMessage: SendMessage = (message) => {
	if (process.send) {
		process.send(message)
	}
}

//* Sends a message to the main process
const defaultReceiveMessage = (processMessages: (arg0: Message) => void) => {
	process.on('message', (message: Message) => {
		processMessages(message)
	})
}

class Auth {
	service: string
	sendMessage: SendMessage
	characterList: Record<string, { accessToken: string, refreshToken, expiration }>

	constructor(sendMessage = defaultSendMessage, receiveMessage = defaultReceiveMessage) {
		this.service = 'EaP-Auth'
		this.sendMessage = sendMessage
		this.characterList = {}

		receiveMessage((message: Message) => {
			if (message.type === 'Login') {
				this.addNewCharacter()
			} else if (message.type === 'CharList') {
				for (const [ name, refreshToken ] of Object.entries(message.message)) {
					this.characterList[name] = {
						accessToken: '', refreshToken: refreshToken, expiration: '',
					}
				}
				this.refreshAllTokens()
			}
		})
	}

	//* Retrieves a character's token
	getToken(characterName: string) {
		if (characterName in this.characterList) {
			return this.refreshToken(characterName).then((result) => {
				return result
			})
		}
		return null
	}

	//* Retrieves the access & refresh tokens for a new character
	addNewCharacter() {
		// https://docs.esi.evetech.net/docs/sso/native_sso_flow.html
		const verifier = this.GeneratePCKEVerifier()

		const server = net.createServer()
		server.listen(80, 'localhost', () => {
			/*
			 * Listening for the response from EVEO
			 * TODO: Make a logging system
			 */
			console.log('connected to server!')
		})

		server.on('connection', (socket) => {
			socket.on('data', (data) => {
				this.handleOAuthCallback(data, verifier)
				socket.end('<h1>You may close this tab now.</h1>')
				server.close()
			})
		})
	}

	// Private Methods

	//* Handles the OAuth callback from EVEO
	private handleOAuthCallback(data, verifier) {
		// Get the authCode from the URL
		const authCode = data.toString().split(' ')[1].match(/(?<=code=).*(?=&)/)[0]
		const postData = `grant_type=authorization_code&code=${authCode}&code_verifier=${verifier}&client_id=${process.env.CLIENT_ID}`

		// Now try and get the full refresh token
		GetAuth(postData).then((response) => {
			const accessToken = response.data.accessToken
			const refreshToken = response.data.refreshToken

			this.verifyJWT(accessToken).then((decodedJWT) => {
				this.updateToken(refreshToken, decodedJWT, accessToken)
			})
		}).catch((error) => {
			// TODO: Make a logging system
			console.log(`error: ${error}`)
			console.log(error.response.data)
		})
	}

	//* Generates a PCKE Verifier
	private GeneratePCKEVerifier() {
		const clientID = process.env.CLIENT_ID
		const baseURL = 'https://login.eveonline.com/v2/oauth/authorize'
		const redirectURL = 'http://localhost/authenticated/'
		// Scope is for everything
		const scope = 'publicData esi-calendar.respond_calendar_events.v1 esi-calendar.read_calendar_events.v1 esi-location.read_location.v1 esi-location.read_ship_type.v1 esi-mail.organize_mail.v1 esi-mail.read_mail.v1 esi-mail.send_mail.v1 esi-skills.read_skills.v1 esi-skills.read_skillqueue.v1 esi-wallet.read_character_wallet.v1 esi-wallet.read_corporation_wallet.v1 esi-search.search_structures.v1 esi-clones.read_clones.v1 esi-characters.read_contacts.v1 esi-universe.read_structures.v1 esi-bookmarks.read_character_bookmarks.v1 esi-killmails.read_killmails.v1 esi-corporations.read_corporation_membership.v1 esi-assets.read_assets.v1 esi-planets.manage_planets.v1 esi-fleets.read_fleet.v1 esi-fleets.write_fleet.v1 esi-ui.open_window.v1 esi-ui.write_waypoint.v1 esi-characters.write_contacts.v1 esi-fittings.read_fittings.v1 esi-fittings.write_fittings.v1 esi-markets.structure_markets.v1 esi-corporations.read_structures.v1 esi-characters.read_loyalty.v1 esi-characters.read_opportunities.v1 esi-characters.read_chat_channels.v1 esi-characters.read_medals.v1 esi-characters.read_standings.v1 esi-characters.read_agents_research.v1 esi-industry.read_character_jobs.v1 esi-markets.read_character_orders.v1 esi-characters.read_blueprints.v1 esi-characters.read_corporation_roles.v1 esi-location.read_online.v1 esi-contracts.read_character_contracts.v1 esi-clones.read_implants.v1 esi-characters.read_fatigue.v1 esi-killmails.read_corporation_killmails.v1 esi-corporations.track_members.v1 esi-wallet.read_corporation_wallets.v1 esi-characters.read_notifications.v1 esi-corporations.read_divisions.v1 esi-corporations.read_contacts.v1 esi-assets.read_corporation_assets.v1 esi-corporations.read_titles.v1 esi-corporations.read_blueprints.v1 esi-bookmarks.read_corporation_bookmarks.v1 esi-contracts.read_corporation_contracts.v1 esi-corporations.read_standings.v1 esi-corporations.read_starbases.v1 esi-industry.read_corporation_jobs.v1 esi-markets.read_corporation_orders.v1 esi-corporations.read_container_logs.v1 esi-industry.read_character_mining.v1 esi-industry.read_corporation_mining.v1 esi-planets.read_customs_offices.v1 esi-corporations.read_facilities.v1 esi-corporations.read_medals.v1 esi-characters.read_titles.v1 esi-alliances.read_contacts.v1 esi-characters.read_fw_stats.v1 esi-corporations.read_fw_stats.v1 esi-characterstats.read.v1'

		// Transforms the string into a URL safe Base64 string
		const base64URLEncode = (str) => {
			return str.toString('base64')
				.replace(/\+/g, '-')
				.replace(/\//g, '_')
				.replace(/=/g, '')
		}

		const verifier = base64URLEncode(randomBytes(32))
		const hashVerifier = base64URLEncode(createHash('sha256').update(verifier).digest())
		const url = `${baseURL}?response_type=code&redirect_uri=${redirectURL}&client_id=${clientID}&scope=${scope}&code_challenge=${hashVerifier}&code_challenge_method=S256&state=uniqueString`

		// Send the URL to the user's browser
		this.sendMessage({ type: 'url', message: url })
		return verifier
	}

	//* Refreshes the character's token
	private refreshToken(characterName: string) {
		const expiration = this.characterList[characterName].expiration
		if (expiration < Date.now() || expiration === undefined) {
			this.sendMessage({ type: 'tokenExpired', message: { characterName } })

			delete this.characterList[characterName]
			return false
		}

		let refreshToken = this.characterList[characterName].refreshToken
		const payload = `grant_type=refreshToken&refreshToken=${refreshToken}&client_id=${process.env.CLIENT_ID}`

		return GetAuth(payload).then((response) => {
			const accessToken = response.data.accessToken
			refreshToken = response.data.refreshToken
			return this.verifyJWT(accessToken).then((decoded) => {
				this.updateToken(refreshToken, decoded, accessToken)
				return {
					'name': decoded.name, accessToken, refreshToken,
				}
			}).catch((error) => {
				console.log(`error: ${error}`)
				console.log(error.response.data)
			})
		}).catch((error) => {
			console.log(`error: ${error}`)
			console.log(error.response.data)
		})
	}

	//* Loads all character tokens to the character list
	private refreshAllTokens() {
		for (const characterName of Object.keys(this.characterList)) {
			this.refreshToken(characterName)
		}
	}

	//*	Updates the character to the character list & key chain
	private updateToken(refreshToken: string, decodedJWT, accessToken = '') {
		const expiration = new Date()
		expiration.setMinutes(expiration.getMinutes() + 19)
		this.characterList[decodedJWT.name] = {
			'accessToken': accessToken, 'refreshToken': refreshToken, 'expiration': expiration,
		}
		this.sendMessage({ type: 'token',
			message: {
				'name': decodedJWT.name,
				'refreshToken': refreshToken,
				'char_id': decodedJWT.sub,
			} })
	}

	//* Verifies a JWT token
	private verifyJWT(accessToken) {
		const jwtVerifier = jwksClient({
			jwksUri: 'https://login.eveonline.com/oauth/jwks',
			requestHeaders: {},
			timeout: 30000, // Defaults to 30s
		})
		return jwtVerifier.getSigningKey('JWT-Signature-Key').then((key) => {
			return jwt.verify(accessToken, key.getPublicKey(), { algorithms: [ 'RS256' ] })
		})
	}
}

export default Auth
