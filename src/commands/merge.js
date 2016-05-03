import o_o from 'yield-yield';
import async from 'async';
import fs from 'fs';
import { merge } from 'lodash/object';
import checkFile from '../helpers/check-file';
import loadFile from '../helpers/load-file';
import sortKeys from '../helpers/sort-keys';
import stringify from '../helpers/stringify';

export default o_o(function * formatCommandGenerator(master, slaves) {
	yield async.each(slaves.concat(master), o_o(checkFile), yield);

	const masterData = yield loadFile(master);
	const slavesData = yield async.map(slaves, o_o(loadFile), yield);

	merge(masterData, ...slavesData);

	const sorted = sortKeys(masterData);
	const json = stringify(sorted);

	yield fs.writeFile(master, json, yield);
});
