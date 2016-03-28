#!/usr/bin/env node

'use strict';
var klass = require('../index');
var instance = new klass({
	cwd: process.cwd()
});

instance.start();
