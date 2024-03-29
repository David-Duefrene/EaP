import {
	expect, test, beforeEach, afterEach, describe, vi,
} from 'vitest'

import Auth from './auth'

describe('Auth', () => {
	let auth: Auth
	const mockSendFn = vi.fn().mockImplementation(() => { /* Do nothing */ })
	const mockReceiveFn = vi.fn().mockImplementation(() => { /* Do nothing */ })

	beforeEach(() => {
		auth = new Auth(mockSendFn, mockReceiveFn)

		auth.characterList = {
			'character1': {
				accessToken: '',
				refreshToken: '',
				characterID: 1n,
				expiration: new Date,
			},
			'character2': {
				accessToken: '',
				refreshToken: '',
				characterID: 2n,
				expiration: new Date,
			},
		}
	})

	afterEach(() => {
		vi.restoreAllMocks()
	})

	test('should be instantiated with default values', () => {
		expect(auth).toBeDefined()
		expect(auth.service).toBe('EaP-Auth')
		expect('character1' in auth.characterList).toEqual(true)
		expect('character2' in auth.characterList).toEqual(true)
	})

	// Test to see if it can Generate a PCKE verifier
	test('should be able to generate a PCKE verifier', () => {
		const verifier = auth['GeneratePCKEVerifier']()
		expect(verifier).toBeDefined()
		expect(verifier.length).toBe(43)
	})

	// Test to see if we can refresh all tokens
	test('should be able to refresh all tokens', () => {
		//@ts-expect-error vi spyOn doesn't work with private functions
		const spy = vi.spyOn(auth, 'refreshToken')
		auth['refreshAllTokens']()
		expect(spy).toHaveBeenCalledTimes(2)
	})

	test('should update token', () => {
		const testDate = new Date('2020-01-01T00:00:00.000Z')
		vi.useFakeTimers()
		vi.setSystemTime(testDate)
		testDate.setMinutes(19)

		const decoded = {
			scp: [ 'scp' ],
			jti: 'jti',
			kid: 'kid',
			sub: 'CHARACTER:EVE:123123',
			azp: 'azp',
			tenant: 'tranquility',
			tier: 'tier',
			region: 'region',
			aud: 'aud',
			name: 'character1',
			owner: 'owner',
			exp: 1577836800,
			iat: 1577836800,
			iss: 'iss',

		}

		auth['updateToken']('refreshToken', decoded, 'accessToken')

		expect(auth.characterList.character1.accessToken).toBe('accessToken')
		expect(auth.characterList.character1.refreshToken).toBe('refreshToken')
		expect(auth.characterList.character1.expiration).toEqual(testDate)
	})

	test('should refresh token', () => {
		auth.characterList = {
			'character1': {
				accessToken: 'accessToken',
				refreshToken: 'refreshToken',
				characterID: 1n,
				expiration: new Date('5000-01-01'),
			},
		}

		auth['refreshToken']('character1').then(() => {
			expect(auth.characterList.character1.accessToken).toBe('accessToken2')
			expect(auth.characterList.character1.refreshToken).toBe('refreshToken2')
			expect(auth.characterList.character1.expiration).toBeDefined()
		})
	})

	test('should not refresh an expired token', () => {
		auth.characterList = {
			'character1': {
				accessToken: 'accessToken',
				refreshToken: 'refreshToken',
				characterID: 1n,
				expiration: new Date('1995-12-17T03:24:00'),
			},
		}
		auth['refreshToken']('character1')

		expect(auth.characterList.character1).toBeUndefined()
		expect(mockSendFn).toHaveBeenCalledWith({
			'type': 'tokenExpired',
			'log': { characterName: 'character1' },
		})
	})
})
