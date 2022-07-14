import { expect, test, beforeEach, describe, vi } from 'vitest';

import Auth from './auth';

describe('Auth', () => {
	let auth: Auth;

	beforeEach(() => {
		auth = new Auth();
	});

	test('should be instantiated with default values', () => {
		expect(auth).toBeDefined();
		expect(auth.service).toBe('EaP-Auth');
		expect(auth.characterList).toEqual({});
	});

	test('should update token', () => {
		auth.characterList = {
			'character1': {
				access_token: '',
				refresh_token: '',
				expiration: ''
			}
		};

		const testDate = new Date('2020-01-01T00:00:00.000Z')
		vi.useFakeTimers();
		vi.setSystemTime(testDate);
		testDate.setMinutes(19)

		auth['updateToken']('refresh_token', 'character1', 'access_token');

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
		vi.mock('./axiosGetAuth', () => {
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
});
