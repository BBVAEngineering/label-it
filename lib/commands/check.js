import o_o from 'yield-yield';
import checkFile from '../helpers/check-file';
import loadFile from '../helpers/load-file';
import flattenObject from '../helpers/flatten-object';
import async from 'async';
import { difference } from 'lodash/array';

function diffObjects(master, slave) {
	master = flattenObject(master);
	slave = flattenObject(slave);

	const masterKeys = Object.keys(master);
	const slaveKeys = Object.keys(slave);

	return difference(masterKeys, slaveKeys);
}

export default o_o(function * formatCommandGenerator(master, slaves) {
	yield async.each(slaves.concat(master), o_o(checkFile), yield);

	const masterData = yield loadFile(master);

	for (const slave of slaves) {
		const slaveData = yield loadFile(slave);

		let diff = diffObjects(masterData, slaveData);

		if (diff.length !== 0) {
			console.log(`Keys on ${master} not in ${slave}`);

			for (const key of diff) {
				console.log(`  ${key}`);
			}
		}

		diff = diffObjects(slaveData, masterData);

		if (diff.length !== 0) {
			console.log(`Keys on ${slave} not in ${master}`);

			for (const key of diff) {
				console.log(`  ${key}`);
			}
		}
	}
});
