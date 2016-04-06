import { dot } from 'dot-object';
import entries from '../helpers/entries';
import compare from '../helpers/compare';

export default function find(data, phrase, threshold) {
	const flatten = dot(data);
	const found = {};

	for (const [key, label] of entries(flatten)) {
		const similarity = compare(phrase, label);

		if (similarity >= threshold) {
			found[key] = {
				label,
				similarity
			};
		}
	}

	return found;
}
