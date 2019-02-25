const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const pify = require('pify');
const utils = require('./utils');

let generator;

beforeAll(async () => {
  await pify(helpers.testDirectory)(path.join(__dirname, 'temp'));
  generator = helpers.createGenerator('gemod:app', ['../'], null, {
    skipInstall: true,
    yarn: true,
    npm: false,
    bower: false
  });
  return generator;
});

describe('Mod Generator', () => {
  it('generates expected files', async () => {
    helpers.mockPrompt(generator, {
      moduleName: 'test',
      githubUsername: 'test',
      website: 'test.com'
    });
    await pify(generator.run.bind(generator))();
    assert.file([
      '.git',
      '.gitignore',
      '.travis.yml',
      'index.js',
      'license',
      'package.json',
      'readme.md',
      'index.test.js',
      '.npmrc'
    ]);
  });
  it('codecoverage option', async () => {
    helpers.mockPrompt(generator, {
      moduleName: 'test',
      githubUsername: 'test',
      website: 'test.com',
      codecoverage: true,
      codecov: false
    });

    await pify(generator.run.bind(generator))();

    assert.fileContent('.gitignore', /coverage/);
    assert.fileContent('package.json', /"xo && jest --coverage"/);
    assert.noFileContent('package.json', /"codecov":/);
    assert.noFileContent('.travis.yml', /codecov/);
  });

  it('codecov option', async () => {
    helpers.mockPrompt(generator, {
      moduleName: 'test',
      githubUsername: 'test',
      website: 'test.com',
      codecoverage: true,
      codecov: true
    });

    await pify(generator.run.bind(generator))();

    assert.fileContent('.gitignore', /coverage/);
    assert.fileContent('package.json', /"xo && jest --coverage"/);
    assert.fileContent('package.json', /"codecov":/);
    assert.fileContent('.travis.yml', /codecov/);
  });

  it('prompts for description', async () => {
    helpers.mockPrompt(generator, {
      moduleName: 'test',
      moduleDescription: 'foo',
      githubUsername: 'test',
      website: 'test.com',
      nyc: true,
      codecov: true
    });

    await pify(generator.run.bind(generator))();

    assert.fileContent('package.json', /"description": "foo",/);
    assert.fileContent('readme.md', /> foo/);
  });

  it('defaults to superb description', async () => {
    helpers.mockPrompt(generator, {
      moduleName: 'test',
      githubUsername: 'test',
      website: 'test.com',
      nyc: true,
      codecov: true
    });

    await pify(generator.run.bind(generator))();

    assert.fileContent('package.json', /"description": "My .+ module",/);
    assert.fileContent('readme.md', /> My .+ module/);
  });

  it('parse scoped package names', () => {
    expect(utils.slugifyPackageName('author/thing')).toEqual('author-thing');
    expect(utils.slugifyPackageName('@author/thing')).toEqual('@author/thing');
    expect(utils.slugifyPackageName('@author/hi/there')).toEqual(
      'author-hi-there'
    );
  });
});
