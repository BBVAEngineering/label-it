
export default function sortKeys(object) {
	return Object.keys(object).sort((a, b) => (
		a.toLowerCase().localeCompare(b.toLowerCase())
	)).reduce((result, key) => {
		const value = object[key];

		if (typeof value === 'object') {
			result[key] = sortKeys(value);
		} else {
			result[key] = value;
		}

		return result;
	}, {});
}
