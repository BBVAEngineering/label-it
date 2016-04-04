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

		const diffMS = diffObjects(masterData, slaveData);

		if (diffMS.length !== 0) {
			console.log(`Keys on ${master} not in ${slave}:`);

			for (const key of diffMS) {
				console.log(`  ${key}`);
			}
		}

		const diffSM = diffObjects(slaveData, masterData);

		if (diffSM.length !== 0) {
			console.log(`Keys on ${slave} not in ${master}:`);

			for (const key of diffSM) {
				console.log(`  ${key}`);
			}
		}

		if (diffMS.length === 0 && diffSM.length === 0) {
			console.log(`${master} and ${slave} contains same keys.`);
		}
	}
});
