# generator-gemod

[![Build Status](https://travis-ci.org/george-aidonidis/generator-gemod.svg?branch=master)](https://travis-ci.org/george-aidonidis/generator-gemod) [![codecov](https://codecov.io/gh/george-aidonidis/generator-gemod/badge.svg?branch=master)](https://codecov.io/gh/george-aidonidis/generator-gemod?branch=master) [![NPM version](https://img.shields.io/npm/v/generator-gemod.svg?style=flat)](https://www.npmjs.com/package/generator-gemod)

> Scaffold out a [node module](https://github.com/george-aidonidis/generator-gemod)

Generate files with sane defaults to reduce boilerplate

![gif](https://i.imgur.com/Fg20x4s.gif)

## Install

```
$ yarn global add yo generator-gemod
```

## Usage

With [yo](https://yeoman.io/):

```
$ yo gemod
```

There are multiple command-line options available:

```
$ yo gemod --help

  Usage:
    yo gemod [options]

  Options:
    --help          # Print the generator's options and usage
    --org           # Publish to a GitHub organization account
    --skip-cache    # Do not remember prompt answers                      Default: false
    --skip-install  # Do not automatically install dependencies           Default: false
    --coverage      # Add jest's code coverage (uploads to codecov.io)    Default: false
    --deploy        # Adds a step to travis to deploy the module to npm   Default: false
		    # (needs `$NPM_TOKEN` env variable on travis-ci)
```

## Development tools

- Test things with [jest](https://jestjs.io)
- Lint code with [xo](https://github.com/xojs/xo) and [prettier](https://github.com/xojs/xo)
- Run linting before a git commit
- Run tests before a git push

## Structure

The generated files will look like this:

```
├── .git
├── .gitignore
├── .npmrc
├── .prettierrc
├── .travis.yml
├── .travis.yml
├── .yo-rc.json
├── node_modules
├── index.js
├── index.test.js
├── license
├── package.json
├── readme.md
└── yarn.lock
```

## Contributing

1. Fork it (<https://github.com/George-Aidonidis/generator-gemod/fork>)
2. Create your feature branch (git checkout -b feature/fooBar)
3. Commit your changes (git commit -am 'Add some fooBar')
4. Push to the branch (git push origin feature/fooBar)
5. Create a new Pull Request

## License

[MIT](./license) ©
