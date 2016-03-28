import fs from 'fs';
import jsonlint from 'jsonlint';

export default function * loadFile(file) {
	const buffer = yield fs.readFile(file, yield);
	const data = jsonlint.parse(buffer.toString('utf8'));

	return data;
}
