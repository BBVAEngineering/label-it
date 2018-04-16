let array;

export default function getKeysFromJson(json) {
	array = [];
	iterate(json, '');
	return array;
}

function iterate(json, parent) {
	for (const property in json) {
		if (typeof json[property] === 'object') {
			if (parent === '') {
				iterate(json[property], `${property}.`);
			} else {
				iterate(json[property], `${parent}${property}.`);
			}
		} else if (parent === '') {
			array.push(property);
		} else {
			array.push(parent + property);
		}
	}
}
