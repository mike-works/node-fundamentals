var lint = require('mocha-eslint');
var config = require('../.eslintrc.json');
// Array of paths to lint 
// Note: a seperate Mocha test will be run for each path and each file which 
const paths = [
  'src/**/*.js',
  'tests/**/*.test.js'
];

lint(paths, Object.assign({
  alwaysWarn: true,
  strict: true,
  contextName: 'ESlint',
}, config));