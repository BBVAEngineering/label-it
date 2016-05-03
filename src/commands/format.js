import fs from 'fs';
import o_o from 'yield-yield';
import checkFile from '../helpers/check-file';
import loadFile from '../helpers/load-file';
import sortKeys from '../helpers/sort-keys';
import stringify from '../helpers/stringify';

export default o_o(function * formatCommandGenerator(file) {
	yield checkFile(file);

	const data = yield loadFile(file);
	const sorted = sortKeys(data);
	const json = stringify(sorted);

	yield fs.writeFile(file, json, yield);
});
