import o_o from 'yield-yield';
import entries from '../helpers/entries';
import checkFile from '../helpers/check-file';
import loadFile from '../helpers/load-file';
import flattenObject from '../helpers/flatten-object';
import compare from '../helpers/compare';

export default o_o(function * findCommandGenerator(file, phrase, options) {
	yield checkFile(file);

	const totalPercentage = 100;
	const defaultThreshold = 0.7;
	const threshold = options.threshold ? options.threshold / totalPercentage : defaultThreshold;
	const data = yield loadFile(file);
	const flatten = flattenObject(data);

	for (const [key, value] of entries(flatten)) {
		const similarity = compare(phrase, value);

		if (similarity >= threshold) {
			const percentage = Math.round(similarity * totalPercentage, 2);

			console.log(`[${percentage}] ${key} => '${value}'`);
		}
	}
});
