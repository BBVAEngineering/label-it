require('babel-register')({
	only: /label-it\/lib/
});
require('babel-polyfill');

module.exports = require('./lib/label-it').default;
