const {
	slugifyPackageName,
	createRepoName,
	validate,
	hasCoverage,
} = require('./lib');

describe('slugifyPackageName', () => {
	it('parses scoped package names', () => {
		expect(slugifyPackageName('author/thing')).toEqual('author-thing');
		expect(slugifyPackageName('@author/thing')).toEqual('@author/thing');
		expect(slugifyPackageName('@author/hi/there')).toEqual('author-hi-there');
	});
});

describe('validate', () => {
	it('returns error message with the provided option when input is empty', () => {
		const actual = validate('username');
		const expected = 'You have to provide a username';

		expect(actual('')).toEqual(expected);
	});

	it('returns true when input is a string', () => {
		const actual = validate('username');
		const expected = true;

		expect(actual('username')).toEqual(expected);
	});
});

describe('createRepoName', () => {
	it('parses scoped package names', () => {
		expect(createRepoName('@sindresorhus/df')).toEqual('df');
		expect(createRepoName('my-unknown-super-amazing-thing')).toEqual(
			'my-unknown-super-amazing-thing',
		);
	});
});

describe('hasCoverage', () => {
	it('returns true when coverage is included in first input', () => {
		expect(hasCoverage({coverage: 1}, {})).toEqual(true);
	});
	it('returns true when coverage is included in second input', () => {
		expect(hasCoverage({}, {coverage: 1})).toEqual(true);
	});
	it('returns false when coverage is not included in any input', () => {
		expect(hasCoverage({}, {})).toEqual(false);
	});
});
