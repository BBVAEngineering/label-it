import o_o from 'yield-yield';
import compare from '../helpers/compare';
import entries from '../helpers/entries';
import checkFile from '../helpers/check-file';
import loadFile from '../helpers/load-file';
import flattenObject from '../helpers/flatten-object';

export default o_o(function * validateCommandGenerator(file, options) {
	yield checkFile(file);

	const totalPercentage = 100;
	const defaultThreshold = 1;
	const threshold = options.threshold ? options.threshold / totalPercentage : defaultThreshold;
	const data = yield loadFile(file);
	const flatten = flattenObject(data);

	for (const [keyA, valueA] of entries(flatten)) {
		delete flatten[keyA];

		for (const [keyB, valueB] of entries(flatten)) {
			const similarity = compare(valueA, valueB);

			if (similarity >= threshold) {
				const percentage = Math.round(similarity * totalPercentage, 2);

				console.log(`[${percentage}] ${keyA} <=> ${keyB}`);
			}
		}
	}
});
