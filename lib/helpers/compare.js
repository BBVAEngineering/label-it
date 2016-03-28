import dice from 'string-similarity';
import leven from 'similarity';

export default function compare(stringA, stringB) {
	const diceSimilarity = dice.compareTwoStrings(stringA, stringB);
	const levenSimilarity = leven(stringA, stringB);

	return Math.min(diceSimilarity, levenSimilarity);
}
