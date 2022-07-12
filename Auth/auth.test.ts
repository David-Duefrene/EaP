import { expect, test, beforeEach, describe } from 'vitest';

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
});
