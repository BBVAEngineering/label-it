import getKeysFromJson from '../helpers/get-keys';
import fs from 'fs';

var keysJson;

export default function formatJSON(fichero) {
	var data = fs.readFileSync(fichero, "utf8");
	var json = JSON.parse(data);
	keysJson = getKeysFromJson(json);
	return keysJson;
}
