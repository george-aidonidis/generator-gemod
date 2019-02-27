const {
	T,
	has,
	ifElse,
	pipe,
	length,
	lt,
	split,
	identity,
	unary,
} = require('ramda');
const slugify = require('@sindresorhus/slugify');
const isScoped = require('is-scoped');

const uSlugify = unary(slugify);
exports.createRepoName = ifElse(
	isScoped,
	pipe(
		split('/'),
		arr => arr[1],
	),
	identity,
);

exports.slugifyPackageName = ifElse(isScoped, identity, uSlugify);

exports.validate = option =>
	ifElse(
		pipe(
			length,
			lt(0),
		),
		T,
		() => `You have to provide a ${option}`,
	);

exports.hasCoverage = ifElse(has('coverage'), T, (_, props) =>
	has('coverage')(props),
);
