import fs from 'fs';
import o_o from 'yield-yield';
import formatJSON from '../helpers/format-json';
import compareId from '../helpers/compare-id';

var spanishKeys;
var sourceJsonFile;

export default o_o(function * multilanguageAppCommand(filepath, jsonFile) {
	spanishKeys = formatJSON(jsonFile);
	sourceJsonFile = jsonFile;
	getFilesRecursive(filepath);
});

	function getFilesRecursive (filepath) {
		var fileContents = fs.readdirSync(filepath), stats;
		fileContents.forEach(function (fileName) {
			stats = fs.lstatSync(filepath + '/' + fileName);
			if (stats.isDirectory()) {
				getFilesRecursive(filepath + '/' + fileName);
			} else {
				if (fileName === "route.js" || fileName === "controller.js") {
					trataFicheroJS(filepath + '/' + fileName);
				}
				else if (fileName === "template.hbs") {
					trataFicheroHBS(filepath + '/' + fileName);
				}
			}
		});
	}

	function trataFicheroJS(fileName) {
		fs.readFile(fileName, 'utf8', (err, data) => {
			var patron = /Ember.I18n.t\('[A-Za-z\.]+'/g;
			var  matches;
			var array = [];
			while ((matches = patron.exec(data)) != null) {
				matches = JSON.stringify(matches);
				matches = matches.replace(/Ember.I18n.t/g, '').replace(/[^aA-zZ\.+0-9]/g, '').replace(/[\[+\]]/g, '');
				array.push(matches);
			}
			compareId(array, spanishKeys, fileName, sourceJsonFile);
		});
	}

	function trataFicheroHBS(fileName) {
		fs.readFile(fileName, 'utf8', (err, data) => {
			var patron = /\{\{t\s'[A-Za-z0-9.]+'\}\}/g;
			var matches;
			var array = [];
			while ( (matches = patron.exec(data) ) != null )
			{
				matches = JSON.stringify(matches);
				matches = matches.replace(/\{+t\s/g, '').replace(/[^aA-zZ\.+0-9]/g, '').replace(/[\[+\]]/g, '');
				array.push(matches);
			}
			compareId(array, spanishKeys, fileName, sourceJsonFile);
		});
	}


