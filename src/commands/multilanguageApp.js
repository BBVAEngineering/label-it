import fs from 'fs';
import formatJSON from '../helpers/format-json';
import compareId from '../helpers/compare-id';

let spanishKeys;
let sourceJsonFile;

export default function multilanguageAppCommand(filepath, jsonFile) {
	spanishKeys = formatJSON(jsonFile);
	sourceJsonFile = jsonFile;
	getFilesRecursive(filepath);
}

function getFilesRecursive(filepath) {
	// eslint-disable-next-line no-sync
	const fileContents = fs.readdirSync(filepath);
	let stats;

	fileContents.forEach((fileName) => {
		const path = `${filepath}/${fileName}`;

		// eslint-disable-next-line no-sync
		stats = fs.lstatSync(path);
		if (stats.isDirectory()) {
			getFilesRecursive(path);
		} else if (fileName === 'route.js' || fileName === 'controller.js') {
			trataFicheroJS(path);
		} else if (fileName === 'template.hbs') {
			trataFicheroHBS(path);
		}
	});
}

function trataFicheroJS(fileName) {
	fs.readFile(fileName, 'utf8', (err, data) => {
		if (err) {
			throw Error(err);
		}

		const patron = /Ember.I18n.t\('[A-Za-z\.]+'/g;
		let matches;
		const array = [];

		while ((matches = patron.exec(data)) !== null) {
			matches = JSON.stringify(matches);
			matches = matches.replace(/Ember.I18n.t/g, '').replace(/[^aA-zZ\.+0-9]/g, '').replace(/[\[+\]]/g, '');
			array.push(matches);
		}
		compareId(array, spanishKeys, fileName, sourceJsonFile);
	});
}

function trataFicheroHBS(fileName) {
	fs.readFile(fileName, 'utf8', (err, data) => {
		if (err) {
			throw Error(err);
		}

		const patron = /\{\{t\s'[A-Za-z0-9.]+'\}\}/g;
		let matches;
		const array = [];

		while ((matches = patron.exec(data)) !== null) {
			matches = JSON.stringify(matches);
			matches = matches.replace(/\{+t\s/g, '').replace(/[^aA-zZ\.+0-9]/g, '').replace(/[\[+\]]/g, '');
			array.push(matches);
		}
		compareId(array, spanishKeys, fileName, sourceJsonFile);
	});
}
