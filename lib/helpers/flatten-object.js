import entries from '../helpers/entries';

export default function flattenObject(object) {
	const flatten = {};

	for (const [key, value] of entries(object)) {
		if (typeof value === 'object') {
			const flatObject = flattenObject(value);

			for (const [innerKey, innerValue] of entries(flatObject)) {
				flatten[`${key}.${innerKey}`] = innerValue;
			}
		} else {
			flatten[key] = value;
		}
	}
	return flatten;
}
