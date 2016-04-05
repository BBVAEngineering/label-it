import fs from 'fs';
import mockFs from 'mock-fs';
import o_o from 'yield-yield';
import assert from 'assert';
import convertCommand from '../lib/commands/convert';

describe('convertCommand', () => {
	context('given a sample file', () => {
		beforeEach(() => {
			mockFs({
				'sample.json': JSON.stringify({
					foo: {
						bar: 'Lorem ipsum dolor sit amet, "consectetur" \'adipiscing\' elit. Sed lacinia dolor sed blandit aliquam.'
					},
					foz: {
						baz: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia dolor sed blandit aliquam.'
					}
				})
			});
		});

		afterEach(() => {
			mockFs.restore();
		});

		it('check duplicity of keys', o_o(function * () {
			const expected = `const I18n = {
	foo: {
		bar: 'Lorem ipsum dolor sit amet, "consectetur" \\'adipiscing\\' elit. Sed lacinia dolor sed blandit aliquam.'
	},
	foz: {
		baz: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia dolor sed blandit aliquam.'
	}
};

export default I18n;
`;

			yield convertCommand('sample.json', 'sample.js', yield);

			const output = yield fs.readFile('sample.js', yield);

			assert.equal(output.toString('utf8'), expected);
		}));
	});
});
