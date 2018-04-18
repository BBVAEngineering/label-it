/* eslint-disable no-console */
import formatJSON from '../helpers/format-json';
import compareId from '../helpers/compare-id';


export default function multilanguageFilesCommandGenerator(firstFile, secondFile) {
	console.log(`|######## Comprobando que los ids del fichero ${firstFile} estan contenidos en el fichero ${secondFile} ########|\n`);
	const keysPrimerJson = formatJSON(firstFile);
	const keysSegundoJson = formatJSON(secondFile);

	compareId(keysPrimerJson, keysSegundoJson, firstFile, secondFile);

	console.log('\n|#################################################################################################|');
}
