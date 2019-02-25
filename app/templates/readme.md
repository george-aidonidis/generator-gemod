# <%= repoName %> [![Build Status](https://travis-ci.com/<%= githubUsername %>/<%= repoName %>.svg?branch=master)](https://travis-ci.com/<%= githubUsername %>/<%= repoName %>)<% if (codecov) { %> [![codecov](https://codecov.io/gh/<%= githubUsername %>/<%= repoName %>/badge.svg?branch=master)](https://codecov.io/gh/<%= githubUsername %>/<%= repoName %>?branch=master)<% } %>

> <%= moduleDescription %>

## Install

```
$ yarn install <%= moduleName %>
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

## License

MIT © [<%= name %>](<%= website %>)
