require('dotenv').config('./../.env');

const { randomBytes, createHash } = require('crypto');
const net = require('net');

const jwksClient = require('jwks-rsa');
var jwt = require('jsonwebtoken');
const keytar = require('keytar');

const axios = require('axios');
import qs from 'qs';

type Message = { type: string, message: string };
type SendMessage = (message: Message) => void;

class Auth {
	service: string;
	sendMessage: SendMessage;
	characterList: {};

	constructor(sendMessage = (message: Message) => { console.log(message); }) {
		this.service = 'EaP-Auth';
		this.sendMessage = sendMessage;
		this.characterList = {}
	}

	updateTokens(accessToken: string, refreshToken: string, characterName: string, expiresIn: number) {
		this.characterList[characterName] = { 'access_token': accessToken, 'refresh_token': refreshToken, 'expiration': expiresIn };
		keytar.setPassword(this.service, characterName, JSON.stringify(refreshToken));
	};

	addNewCharacter() {
		// https://docs.esi.evetech.net/docs/sso/native_sso_flow.html
		const clientID = process.env['CLIENT_ID'];
		const baseURL = 'https://login.eveonline.com/v2/oauth/authorize';
		const redirectURL = 'http://localhost/authenticated/';
		const scope = 'publicData esi-calendar.respond_calendar_events.v1 esi-calendar.read_calendar_events.v1 esi-location.read_location.v1 esi-location.read_ship_type.v1 esi-mail.organize_mail.v1 esi-mail.read_mail.v1 esi-mail.send_mail.v1 esi-skills.read_skills.v1 esi-skills.read_skillqueue.v1 esi-wallet.read_character_wallet.v1 esi-wallet.read_corporation_wallet.v1 esi-search.search_structures.v1 esi-clones.read_clones.v1 esi-characters.read_contacts.v1 esi-universe.read_structures.v1 esi-bookmarks.read_character_bookmarks.v1 esi-killmails.read_killmails.v1 esi-corporations.read_corporation_membership.v1 esi-assets.read_assets.v1 esi-planets.manage_planets.v1 esi-fleets.read_fleet.v1 esi-fleets.write_fleet.v1 esi-ui.open_window.v1 esi-ui.write_waypoint.v1 esi-characters.write_contacts.v1 esi-fittings.read_fittings.v1 esi-fittings.write_fittings.v1 esi-markets.structure_markets.v1 esi-corporations.read_structures.v1 esi-characters.read_loyalty.v1 esi-characters.read_opportunities.v1 esi-characters.read_chat_channels.v1 esi-characters.read_medals.v1 esi-characters.read_standings.v1 esi-characters.read_agents_research.v1 esi-industry.read_character_jobs.v1 esi-markets.read_character_orders.v1 esi-characters.read_blueprints.v1 esi-characters.read_corporation_roles.v1 esi-location.read_online.v1 esi-contracts.read_character_contracts.v1 esi-clones.read_implants.v1 esi-characters.read_fatigue.v1 esi-killmails.read_corporation_killmails.v1 esi-corporations.track_members.v1 esi-wallet.read_corporation_wallets.v1 esi-characters.read_notifications.v1 esi-corporations.read_divisions.v1 esi-corporations.read_contacts.v1 esi-assets.read_corporation_assets.v1 esi-corporations.read_titles.v1 esi-corporations.read_blueprints.v1 esi-bookmarks.read_corporation_bookmarks.v1 esi-contracts.read_corporation_contracts.v1 esi-corporations.read_standings.v1 esi-corporations.read_starbases.v1 esi-industry.read_corporation_jobs.v1 esi-markets.read_corporation_orders.v1 esi-corporations.read_container_logs.v1 esi-industry.read_character_mining.v1 esi-industry.read_corporation_mining.v1 esi-planets.read_customs_offices.v1 esi-corporations.read_facilities.v1 esi-corporations.read_medals.v1 esi-characters.read_titles.v1 esi-alliances.read_contacts.v1 esi-characters.read_fw_stats.v1 esi-corporations.read_fw_stats.v1 esi-characterstats.read.v1';

		const base64URLEncode = (str) => {
			return str.toString('base64')
				.replace(/\+/g, '-')
				.replace(/\//g, '_')
				.replace(/=/g, '');
		};
		const verifier = base64URLEncode(randomBytes(32));
		const hashVerifier = base64URLEncode(createHash('sha256').update(verifier).digest());

		const url = `${baseURL}?response_type=code&redirect_uri=${redirectURL}&client_id=${clientID}&scope=${scope}&code_challenge=${hashVerifier}&code_challenge_method=S256&state=uniqueString`;
		process.send({ type: 'url', message: url });

		const server = net.createServer();
		let auth_code = '';
		server.listen(80, 'localhost',  () => {
			console.log('connected to server!');
		});

		server.on('connection', (socket) => {
			socket.on('data', (data) => {
				auth_code = data.toString().split(' ')[1].match(/(?<=code=).*(?=&)/)[0];
				const postData = qs.stringify({
					'grant_type': 'authorization_code',
					'code': `${auth_code}`,
					'code_verifier': `${verifier}`,
					'client_id': `${process.env['CLIENT_ID']}`,
				});
				const options = {
					method: 'POST',
					url: 'https://login.eveonline.com/v2/oauth/token',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
					data: postData,
				};
				axios(options).then((response) => {
					const access_token = response.data['access_token'];
					const refresh_token = response.data['refresh_token'];

					const jwtVerifier = jwksClient({
						jwksUri: 'https://login.eveonline.com/oauth/jwks',
						requestHeaders: {}, // Optional
						timeout: 30000 // Defaults to 30s
					});
					jwtVerifier.getSigningKey("JWT-Signature-Key").then(key => {
						// if jwt.verify is true, need to save the refresh token to keytar,
						const decoded = jwt.verify(access_token, key.getPublicKey(),  { algorithms: ['RS256'] });
						const charName = decoded.name;
						const expiration = decoded.exp;
						this.updateTokens(access_token, refresh_token, charName, expiration);
						// if jwt.verify is false, need to send a message to the user that they have been denied access
					});
				}).catch((error) => {
					console.log(`error: ${error}`);
					console.log(error.response.data);
				});
				socket.end('<h1>You may close this tab now.</h1>');
				server.close();
			});

		});
	}
}

const auth = new Auth();
auth.addNewCharacter();
