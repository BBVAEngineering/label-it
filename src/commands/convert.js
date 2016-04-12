import fs from 'fs';
import o_o from 'yield-yield';
import checkFile from '../helpers/check-file';
import loadFile from '../helpers/load-file';
import stringify from '../helpers/stringify';

export default o_o(function * convertCommandGenerator(input, output) {
	yield checkFile(input);

	const data = yield loadFile(input);
	let json = stringify(data);

	json = json.replace(/\\"/g, '\uFFFF')
		.replace(/'/g, '\\\'')
		.replace(/\"([^"]+)\":/g, '$1:')
		.replace(/\"([^"]+)\"/g, '\'$1\'')
		.replace(/\uFFFF/g, '"');

	const built = `const I18n = ${json};\n\nexport default I18n;\n`;

	yield fs.writeFile(output, built, yield);
});
