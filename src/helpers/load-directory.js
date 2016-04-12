import fs from 'fs';
import async from 'async';
import recursive from 'recursive-readdir';

const defaultLimit = 256;

function parseJson(object) {
	try {
		return JSON.parse(object.toString('utf8'));
	} catch (e) {
		return null;
	}
}

export default function * loadDirectory(dir, limit = defaultLimit) {
	const files = yield recursive(dir, yield);
	const buffers = yield async.mapLimit(files, limit, fs.readFile, yield);
	const data = buffers.map(parseJson).filter(Boolean);

	return data;
}
