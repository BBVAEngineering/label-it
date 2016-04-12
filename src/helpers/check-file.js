import fs from 'fs';

export default function * checkFile(file) {
	try {
		const fileStat = yield fs.stat(file, yield);

		if (!fileStat.isFile()) {
			throw new Error(`'${file}' is not a file`);
		}
	} catch (e) {
		throw new Error(`File ${file} does not exist`);
	}
}
