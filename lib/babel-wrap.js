var path = require('path'),
    fs = require('fs')

// remove ourselves from process.argv
process.argv.splice(1, 1)

// install source maps so that stack dumps will be correct
require('source-map-support').install()

// look for config
var config = { };
try {
  config = JSON.parse(fs.readFileSync('./.babelrc').toString())
} catch (e) { }

// install babel polyfill
require('babel-polyfill');

// install babel
require('babel-core/register')(config)

// require the original target file, export its exports
var fullpath = path.join(process.cwd(), process.argv[1])
module.exports = require(fullpath)
