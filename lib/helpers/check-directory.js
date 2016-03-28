import fs from 'fs';

export default function * checkDirectory(dir) {
	try {
		const fileStat = yield fs.stat(dir, yield);

		if (!fileStat.isDirectory()) {
			throw new Error(`'${dir}' is not a directory`);
		}
	} catch (e) {
		throw new Error(`Directory ${dir} does not exist`);
	}
}
