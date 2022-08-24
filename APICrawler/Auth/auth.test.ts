import { expect, test, beforeEach, afterEach, describe, vi } from 'vitest';

import Auth from './auth';

describe('Auth', () => {
	let auth: Auth;
	const mockSendFn = vi.fn().mockImplementation(() => {});
	const mockReceiveFn = vi.fn().mockImplementation(() => {});

	beforeEach(() => {
		auth = new Auth(mockSendFn, mockReceiveFn);

		auth.characterList = {
			'character1': {
				access_token: '',
				refresh_token: '',
				expiration: ''
			},
			'character2': {
				access_token: '',
				refresh_token: '',
				expiration: ''
			}
		};
	});

	afterEach(() => {
        vi.restoreAllMocks();
    });

	test('should be instantiated with default values', () => {
		expect(auth).toBeDefined();
		expect(auth.service).toBe('EaP-Auth');
		expect('character1' in auth.characterList).toEqual(true);
		expect('character2' in auth.characterList).toEqual(true);
	});

	// Test to see if it can Generate a PCKE verifier
	test('should be able to generate a PCKE verifier', () => {
		const verifier = auth['GeneratePCKEVerifier']();
		expect(verifier).toBeDefined();
		expect(verifier.length).toBe(43);
	});

	// Test to see if we can refresh all tokens
	test('should be able to refresh all tokens', () => {
		// mock the refreshToken function
		auth['refreshToken'] = vi.fn(() => {});

		// call the refreshAllTokens function
		auth['refreshAllTokens']();

		// check to see if the refreshToken function was called for each character
		expect(auth['refreshToken']).toHaveBeenCalledTimes(2);
	});


	test('should update token', () => {
		const testDate = new Date('2020-01-01T00:00:00.000Z')
		vi.useFakeTimers();
		vi.setSystemTime(testDate);
		testDate.setMinutes(19)

		const decoded = {
			sub: 'CHARACTER:EVE:123123',
			name: 'character1',
		}

		auth['updateToken']('refresh_token', decoded, 'access_token');

		expect(auth.characterList['character1'].access_token).toBe('access_token');
		expect(auth.characterList['character1'].refresh_token).toBe('refresh_token');
		expect(auth.characterList['character1'].expiration).toEqual(testDate);
	});

	test('should refresh token', () => {
		auth.characterList = {
			'character1': {
				access_token: 'access_token',
				refresh_token: 'refresh_token',
				expiration: new Date()
			}
		};
		vi.useFakeTimers();
		vi.mock('../axiosGetAuth', () => {
			return {
				default: vi.fn(() => {
					return Promise.resolve({
						data: {
							access_token: 'access_token2',
							refresh_token: 'refresh_token2',
							expires_in: 3600
						}
					});
				})
			};
		});

		// mock the verifyJWT function
		auth['verifyJWT'] = vi.fn(() => {
			return Promise.resolve({
				name: 'character1'
			});
		});

		auth['refreshToken']('character1').then(() => {
			expect(auth.characterList['character1'].access_token).toBe('access_token2');
			expect(auth.characterList['character1'].refresh_token).toBe('refresh_token2');
			expect(auth.characterList['character1'].expiration).toBeDefined();
		});

	});

	test('should not refresh an expired token', () => {
		auth.characterList = {
			'character1': {
				access_token: 'access_token',
				refresh_token: 'refresh_token',
				expiration: new Date('1995-12-17T03:24:00')
			}
		};

		vi.mock('../axiosGetAuth', () => {
			return {
				default: vi.fn(() => {
					return Promise.resolve({
						data: {
							status: 'fail'
						}
					});
				})
			};
		});

		// mock the verifyJWT function
		auth['verifyJWT'] = vi.fn(() => {
			return Promise.resolve({
				status: 'fail'
			});
		});

		auth['refreshToken']('character1')
		expect(auth.characterList['character1']).toBeUndefined();

		expect(mockSendFn).toHaveBeenCalledWith({
			'type': 'error',
			'message': {
				'characterName': 'character1',
				'title': 'Token Expired',
			}
		});
	});
});
