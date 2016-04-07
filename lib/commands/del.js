import fs from 'fs';
import o_o from 'yield-yield';
import { pick } from 'dot-object';
import inquirer from 'inquirer';
import entries from '../helpers/entries';
import checkFile from '../helpers/check-file';
import loadFile from '../helpers/load-file';
import stringify from '../helpers/stringify';
import errback from '../helpers/errback';
import eventer from '../core/eventer';

function clean(object) {
	for (const [key, value] of entries(object)) {
		if (typeof value === 'object') {
			const keys = Object.keys(value);

			if (keys.length === 0) {
				delete object[key];
			} else {
				clean(value);
			}
		}
	}
}

export default o_o(function * delCommandGenerator(file, key) {
	yield checkFile(file);

	const data = yield loadFile(file);
	const value = pick(key, data, true);

	if (!value) {
		throw new Error(`Key '${key}' does not exist in '${file}'`);
	}

	eventer.emit('spinner.stop');

	const answers = yield inquirer.prompt([{
		type: 'confirm',
		name: 'confirm',
		message: `Are you sure to remove key '${key}'`
	}], errback(yield));

	if (!answers.confirm) {
		return;
	}

	clean(data);

	const json = stringify(data);

	yield fs.writeFile(file, json, yield);
});
