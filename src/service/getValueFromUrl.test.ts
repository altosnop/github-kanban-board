import getValueFromUrl from './getValueFromUrl';

describe('getValueFromUrl', () => {
	it('should return the correct value for a valid GitHub URL', () => {
		const url = 'https://github.com/user/repo';
		const expected = 'user/repo';

		const result = getValueFromUrl(url);

		expect(result).toEqual(expected);
	});

	it('should return undefined for an invalid GitHub URL', () => {
		const url = 'https://example.com';
		const expected = undefined;

		const result = getValueFromUrl(url);

		expect(result).toEqual(expected);
	});
});
