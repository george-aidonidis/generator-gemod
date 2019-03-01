# <%= repoName %>

[![Build Status](https://travis-ci.org/<%= githubUsername %>/<%= repoName %>.svg?branch=master)](https://travis-ci.org/<%= githubUsername %>/<%= repoName %>) <% if (coverage) { %> [![codecov](https://codecov.io/gh/<%= githubUsername %>/<%= repoName %>/badge.svg?branch=master)](https://codecov.io/gh/<%= githubUsername %>/<%= repoName %>?branch=master)<% } %> [![NPM version](https://img.shields.io/npm/v/<%= repoName %>.svg?style=flat)](https://www.npmjs.com/package/<%= repoName %>)

> <%= moduleDescription %>

## Install

```
$ yarn add <%= moduleName %>
```

## Usage

```js
const <%= camelModuleName %> = require('<%= moduleName %>');

<%= camelModuleName %>('monkeys');
//=> 'monkeys & raccoons'
```

## API

### <%= camelModuleName %>(input, [options])

#### input

Type: `string`

Lorem ipsum.

#### options

Type: `Object`

##### foo

Type: `boolean`<br>
Default: `false`

Lorem ipsum.

## Contributing

1. Fork it (<https://github.com/<%= githubUsername %>/<%= repoName %>/fork>)
2. Create your feature branch (git checkout -b feature/fooBar)
3. Commit your changes (git commit -am 'Add some fooBar')
4. Push to the branch (git push origin feature/fooBar)
5. Create a new Pull Request

## License

[MIT](./license) © [<%= name %>](<%= website %>)
