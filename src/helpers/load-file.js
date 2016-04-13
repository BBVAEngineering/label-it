import fs from 'fs';
import jsonlint from 'jsonlint';

export default function * loadFile(file) {
	const buffer = yield fs.readFile(file, yield);
	const data = buffer.toString('utf8');
	let json;

	try {
		json = jsonlint.parse(data);
	} catch (e) {
		e.message = `[${file}] ${e.message }`;

		throw e;
	}

	return json;
}
