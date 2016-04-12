import fs from 'fs';
import o_o from 'yield-yield';
import { str } from 'dot-object';
import inquirer from 'inquirer';
import checkFile from '../helpers/check-file';
import loadFile from '../helpers/load-file';
import stringify from '../helpers/stringify';
import entries from '../helpers/entries';
import find from '../helpers/find';
import errback from '../helpers/errback';
import eventer from '../core/eventer';

export default o_o(function * addCommandGenerator(file, key, phrase, options) {
	yield checkFile(file);

	const totalPercentage = 100;
	const defaultThreshold = 0.7;
	const threshold = options.threshold ? options.threshold / totalPercentage : defaultThreshold;
	const data = yield loadFile(file);
	const found = find(data, phrase, threshold);

	if (Object.keys(found).length > 0) {
		console.log('Found similarities:');

		for (const [resultKey, result] of entries(found)) {
			const percentage = Math.round(result.similarity * totalPercentage, 2);

			console.log(`  [${percentage}] ${resultKey} => '${result.label}'`);
		}

		eventer.emit('spinner.stop');

		const answers = yield inquirer.prompt([{
			type: 'confirm',
			name: 'confirm',
			message: `Are you sure to add key '${key}'`
		}], errback(yield));

		if (!answers.confirm) {
			return;
		}
	}

	str(key, phrase, data);

	const json = stringify(data);

	yield fs.writeFile(file, json, yield);
});
