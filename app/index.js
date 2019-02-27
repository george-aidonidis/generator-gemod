const superb = require('superb');
const normalizeUrl = require('normalize-url');
const humanizeUrl = require('humanize-url');
const Generator = require('yeoman-generator');
const camelize = require('camelcase');
const slugify = require('@sindresorhus/slugify');

const {
	createRepoName,
	slugifyPackageName,
	validate,
	hasCoverage,
} = require('./lib');

module.exports = class extends Generator {
	constructor(...args) {
		super(...args);

		this.option('org', {
			type: String,
			description: 'Publish to a GitHub organization account',
		});

		this.option('coverage', {
			type: Boolean,
			description: 'Add code coverage with jest and upload to codecov.io',
		});
	}

	init() {
		return this.prompt([
			{
				name: 'moduleName',
				message: 'What do you want to name your module?',
				default: slugify(this.appname),
				filter: slugifyPackageName,
			},
			{
				name: 'moduleDescription',
				message: 'What is your module description?',
				default: `My ${superb.random()} module`,
			},
			{
				name: 'githubUsername',
				message: 'What is your GitHub username?',
				store: true,
				validate: validate('username'),
				when: () => !this.options.org,
			},
			{
				name: 'website',
				message: 'What is the URL of your website?',
				store: true,
				validate: validate('website URL'),
				filter: normalizeUrl,
			},
			{
				name: 'coverage',
				message: 'Do you need code coverage?',
				type: 'confirm',
				default: Boolean(this.options.coverage),
				when: () => this.options.coverage === undefined,
			},
		]).then(props => {
			const coverage = hasCoverage(this.options, props);

			const repoName = createRepoName(props.moduleName);

			const tpl = {
				moduleName: props.moduleName,
				moduleDescription: props.moduleDescription,
				camelModuleName: camelize(repoName),
				githubUsername: this.options.org || props.githubUsername,
				repoName,
				name: this.user.git.name(),
				email: this.user.git.email(),
				website: props.website,
				humanizedWebsite: humanizeUrl(props.website),
				coverage,
			};

			const mv = (from, to) => {
				this.fs.move(this.destinationPath(from), this.destinationPath(to));
			};

			this.fs.copyTpl(
				[`${this.templatePath()}/**`],
				this.destinationPath(),
				tpl,
			);

			mv('gitignore', '.gitignore');
			mv('prettierrc', '.prettierrc');
			mv('travis.yml', '.travis.yml');
			mv('npmrc', '.npmrc');
			mv('_package.json', 'package.json');
		});
	}

	git() {
		this.spawnCommandSync('git', ['init']);
	}

	install() {
		this.installDependencies({
			npm: false,
			bower: false,
			yarn: true,
		});
	}
};
