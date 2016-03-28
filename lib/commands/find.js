import o_o from 'yield-yield';
import dice from 'string-similarity';
import entries from '../helpers/entries';
import checkFile from '../helpers/check-file';
import loadFile from '../helpers/load-file';
import { sortBy } from 'lodash';

function getValues(array, object) {
	for (const [, value] of entries(object)) {
		if (typeof value === 'object') {
			getValues(array, value);
		} else {
			array.push(value);
		}
	}
}

function findLabel(object, value) {
	for (const [type, hash] of entries(object)) {
		for (const [label, string] of entries(hash)) {
			if (string === value) {
				return `${type}.${label}`;
			}
		}
	}

	return '';
}

export default o_o(function * findCommandGenerator(file, phrase, options) {
	yield checkFile(file);

	const values = [];
	const totalPercentage = 100;
	const defaultThreshold = 0.7;
	const threshold = options.threshold ? options.threshold / totalPercentage : defaultThreshold;
	const data = yield loadFile(file);

	getValues(values, data);

	const similatiries = dice.findBestMatch(phrase, values);

	similatiries.ratings = sortBy(similatiries.ratings, 'rating').reverse();

	for (const rating of similatiries.ratings) {
		if (rating.rating >= threshold) {
			const percentage = Math.round(rating.rating * totalPercentage, 2);
			const label = findLabel(data, rating.target);

			console.log(`[${percentage}] ${label} => '${rating.target}'`);
		}
	}
});
