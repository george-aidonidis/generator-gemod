const superb = require('superb');
const normalizeUrl = require('normalize-url');
const humanizeUrl = require('humanize-url');
const Generator = require('yeoman-generator');
const _s = require('underscore.string');
const utils = require('./utils');

module.exports = class extends Generator {
	constructor(...args) {
		super(...args);

		this.option('coverage', {
			type: Boolean,
			description: 'Add code coverage with jest',
		});

		this.option('codecov', {
			type: Boolean,
			description: 'Upload coverage to codecov.io (implies coverage)',
		});
	}

	init() {
		return this.prompt([
			{
				name: 'moduleName',
				message: 'What do you want to name your module?',
				default: _s.slugify(this.appname),
				filter: x => utils.slugifyPackageName(x),
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
				validate: x => (x.length > 0 ? true : 'You have to provide a username'),
			},
			{
				name: 'website',
				message: 'What is the URL of your website?',
				store: true,
				validate: x =>
					x.length > 0 ? true : 'You have to provide a website URL',
				filter: x => normalizeUrl(x),
			},
			{
				name: 'codecoverage',
				message: 'Do you need code coverage?',
				type: 'confirm',
				default: Boolean(this.options.codecov || this.options.coverage),
				when: () =>
					this.options.coverage === undefined &&
					this.options.codecov === undefined,
			},
			{
				name: 'codecov',
				message: 'Upload coverage to codecov.io?',
				type: 'confirm',
				default: false,
				when: x =>
					(x.codecoverage || this.options.coverage) &&
					this.options.codecov === undefined,
			},
		]).then(props => {
			const or = (option, prop) =>
				this.options[option] === undefined
					? props[prop || option]
					: this.options[option];

			const codecov = or('codecov');
			const codecoverage = codecov || or('coverage', 'codecoverage');

			const repoName = utils.repoName(props.moduleName);

			const tpl = {
				moduleName: props.moduleName,
				moduleDescription: props.moduleDescription,
				camelModuleName: _s.camelize(repoName),
				githubUsername: props.githubUsername,
				repoName,
				name: this.user.git.name(),
				email: this.user.git.email(),
				website: props.website,
				humanizedWebsite: humanizeUrl(props.website),
				codecoverage,
				codecov,
			};

			const mv = (from, to) => {
				this.fs.move(this.destinationPath(from), this.destinationPath(to));
			};

			this.fs.copyTpl(
				[`${this.templatePath()}/**`, '!**/cli.js'],
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
