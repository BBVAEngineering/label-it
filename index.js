/* eslint-disable */
var pkg = require('./package'), mod;

if (pkg._id) {
    mod = require('./lib/label-it');
} else {
    require('babel-polyfill');
    require('babel-register')({
        only: /label-it\/src/
    });

    mod = require('./src/label-it');
}

module.exports = mod.default;
