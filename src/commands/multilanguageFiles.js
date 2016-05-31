import o_o from 'yield-yield';
import formatJSON from '../helpers/format-json';
import compareId from '../helpers/compare-id'


export default o_o(function * multilanguageFilesCommandGenerator(firstFile, secondFile) {
	console.log('|######## Comprobando que los ids del fichero '+firstFile+' estan contenidos en el fichero '+secondFile+' ########|'+'\n');

	var keysPrimerJson = formatJSON(firstFile);
	var keysSegundoJson = formatJSON(secondFile);
	compareId(keysPrimerJson, keysSegundoJson, firstFile, secondFile);

	console.log('\n'+'|#################################################################################################|');
});