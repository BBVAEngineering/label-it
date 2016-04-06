import fs from 'fs';
import o_o from 'yield-yield';
import checkFile from '../helpers/check-file';
import loadFile from '../helpers/load-file';
import stringify from '../helpers/stringify';

function sortKeys(object) {
	return Object.keys(object).sort().reduce((result, key) => {
		const value = object[key];

		if (typeof value === 'object') {
			result[key] = sortKeys(value);
		} else {
			result[key] = value;
		}

		return result;
	}, {});
}

export default o_o(function * formatCommandGenerator(file) {
	yield checkFile(file);

	const data = yield loadFile(file);
	const sorted = sortKeys(data);
	const json = stringify(sorted);

	yield fs.writeFile(file, json, yield);
});
