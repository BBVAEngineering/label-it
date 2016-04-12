import fs from 'mock-fs';
import o_o from 'yield-yield';
import assert from 'assert';
import loadFile from '../src/helpers/load-file';
import formatCommand from '../src/commands/format';

describe('formatCommand', () => {
	context('given a sample file', () => {
		beforeEach(() => {
			fs({
				'sample.json': JSON.stringify({
					bbb: {
						bbb: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia dolor sed blandit aliquam.',
						aaa: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia dolor sed blandit aliquam.'
					},
					aaa: {
						bbb: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia dolor sed blandit aliquam.',
						aaa: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia dolor sed blandit aliquam.'
					}
				})
			});
		});

		afterEach(() => {
			fs.restore();
		});

		it('validates keys with a 100% matching', o_o(function * () {
			const expected = {
				aaa: {
					aaa: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia dolor sed blandit aliquam.',
					bbb: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia dolor sed blandit aliquam.'
				},
				bbb: {
					aaa: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia dolor sed blandit aliquam.',
					bbb: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia dolor sed blandit aliquam.'
				}
			};

			yield formatCommand('sample.json', yield);

			const output = yield loadFile('sample.json');

			assert.deepEqual(output, expected);
		}));
	});
});
