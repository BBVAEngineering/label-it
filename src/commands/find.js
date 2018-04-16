import o_o from 'yield-yield';
import entries from '../helpers/entries';
import checkFile from '../helpers/check-file';
import loadFile from '../helpers/load-file';
import find from '../helpers/find';

export default o_o(function * findCommandGenerator(file, phrase, options) {
	yield checkFile(file);

	const totalPercentage = 100;
	const defaultThreshold = 0.7;
	const threshold = options.threshold ? options.threshold / totalPercentage : defaultThreshold;
	const data = yield loadFile(file);
	const found = find(data, phrase, threshold);

	for (const [key, result] of entries(found)) {
		const percentage = Math.round(result.similarity * totalPercentage, 2);

		// eslint-disable-next-line no-console
		console.log(`[${percentage}] ${key} => '${result.label}'`);
	}
});
