import getKeysFromJson from '../helpers/get-keys';
import fs from 'fs';

let keysJson;

export default function formatJSON(fichero) {
	// eslint-disable-next-line no-sync
	const json = JSON.parse(fs.readFileSync(fichero, 'utf8'));

	keysJson = getKeysFromJson(json);

	return keysJson;
}
