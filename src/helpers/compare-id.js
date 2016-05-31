
export default function compareId(keysPrimerJson, keysSegundoJson, firstFile, secondFile) {

	var found = false;
	for (var i=0; i<keysPrimerJson.length; i++){
		found = false;
		for (var j=0; j<keysSegundoJson.length;j++){
			if (keysPrimerJson[i] === keysSegundoJson[j]) {
				found = true;
				break;
			}
		}
		if (!found) {
			console.warn("El identificador: "+keysPrimerJson[i]+" del fichero "+firstFile+" no existe en el fichero "+secondFile);
		}
	}
}
