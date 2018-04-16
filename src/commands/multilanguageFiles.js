import formatJSON from '../helpers/format-json';
import compareId from '../helpers/compare-id';


export default function multilanguageFilesCommandGenerator(firstFile, secondFile) {
	const keysPrimerJson = formatJSON(firstFile);
	const keysSegundoJson = formatJSON(secondFile);

	compareId(keysPrimerJson, keysSegundoJson, firstFile, secondFile);
}
