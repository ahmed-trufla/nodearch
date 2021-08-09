import Mocha from 'mocha';


export const nycOptions = {
  _: [ 'node' ],
  // cwd: '/workspaces/cov-lab',
  cwd: process.cwd(),
  all: true,
  a: true,
  checkCoverage: false,
  extension: [ '.ts' ],
  e: [ '.ts' ],
  include: [ 'src/**/**.ts' ],
  n: [ 'src/**/**.ts' ],
  // exclude: [ 'node_modules', 'src/**/**.spec.js' ],
  // x: [ 'node_modules', 'src/**/**.spec.js' ],
  reporter: [ 'lcov', 'text' ],
  r: [ 'lcov', 'text' ],
  reportDir: './coverage',
  skipFull: false,
  tempDir: './.nyc_output',
  t: './.nyc_output',
  nycrcPath: undefined,
  excludeNodeModules: true,
  ignoreClassMethods: [],
  autoWrap: true,
  esModules: true,
  parserPlugins: [
    'asyncGenerators',
    'bigInt',
    'classProperties',
    'classPrivateProperties',
    'classPrivateMethods',
    'dynamicImport',
    'importMeta',
    'numericSeparator',
    'objectRestSpread',
    'optionalCatchBinding',
    'topLevelAwait'
  ],
  compact: true,
  preserveComments: true,
  produceSourceMap: true,
  sourceMap: true,
  require: [],
  i: [],
  instrument: true,
  excludeAfterRemap: true,
  branches: 0,
  functions: 0,
  lines: 90,
  statements: 0,
  perFile: false,
  showProcessTree: false,
  skipEmpty: false,
  silent: false,
  s: false,
  eager: false,
  cache: true,
  c: true,
  cacheDir: undefined,
  babelCache: false,
  useSpawnWrap: false,
  hookRequire: true,
  hookRunInContext: false,
  hookRunInThisContext: false,
  clean: true,
  inPlace: false,
  exitOnError: false,
  delete: false,
  completeCopy: false,
  instrumenter: './lib/instrumenters/istanbul'
};

export const mochaOptions: Mocha.MochaOptions = {
  'allow-uncaught': false,
  'async-only': false,
  bail: false,
  'check-leaks': false,
  color: true,
  delay: false,
  diff: true,
  exit: false, // could be expressed as "'no-exit': true"
  extension: ['js'],
  // fgrep: something, // fgrep and grep are mutually exclusive
  file: ['/path/to/some/file', '/path/to/some/other/file'],
  'forbid-only': false,
  'forbid-pending': false,
  'full-trace': false,
  global: ['jQuery', '$'],
  // grep: something, // fgrep and grep are mutually exclusive
  growl: false,
  ignore: ['/path/to/some/ignored/file'],
  'inline-diffs': false,
  // invert: false, // needs to be used with grep or fgrep
  jobs: 1,
  'node-option': ['unhandled-rejections=strict'], // without leading "--", also V8 flags
  package: './package.json',
  parallel: false,
  recursive: false,
  reporter: 'spec',
  'reporter-option': ['foo=bar', 'baz=quux'],
  require: '@babel/register',
  retries: 1,
  slow: 75,
  sort: false,
  spec: ['test/**/*.spec.js'], // the positional arguments!
  timeout: '2000', // same as "timeout: '2s'"
  // timeout: false, // same as "'no-timeout': true" or "timeout: 0"
  'trace-warnings': true, // node flags ok
  ui: 'bdd',
  'v8-stack-trace-limit': 100, // V8 flags are prepended with "v8-"
  watch: false,
  'watch-files': ['lib/**/*.js', 'test/**/*.js'],
  'watch-ignore': ['lib/vendor']
};