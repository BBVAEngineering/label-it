import fs from 'mock-fs';
import o_o from 'yield-yield';
import assert from 'assert';
import loadFile from '../src/helpers/load-file';
import mergeCommand from '../src/commands/merge';

describe('mergeCommand', () => {
	context('given three sample files', () => {
		beforeEach(() => {
			fs({
				'sample_1.json': JSON.stringify({
					foo: {
						bar: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia dolor sed blandit aliquam.'
					},
					foz: {
						baz: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia dolor sed blandit aliquam.'
					}
				}),
				'sample_2.json': JSON.stringify({
					foo: {
						bar: 'Lorem dolor dolor dolor dolor, consectetur adipiscing elit. Sed lacinia dolor sed blandit aliquam.'
					}
				}),
				'sample_3.json': JSON.stringify({
					foz: {
						baw: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia dolor sed blandit aliquam.'
					}
				})
			});
		});

		afterEach(() => {
			fs.restore();
		});

		it('merge keys', o_o(function * () {
			const expected = {
				foo: {
					bar: 'Lorem dolor dolor dolor dolor, consectetur adipiscing elit. Sed lacinia dolor sed blandit aliquam.'
				},
				foz: {
					baw: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia dolor sed blandit aliquam.',
					baz: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia dolor sed blandit aliquam.'
				}
			};

			yield mergeCommand('sample_1.json', ['sample_2.json', 'sample_3.json'], yield);

			const output = yield loadFile('sample_1.json');

			assert.deepEqual(output, expected);
		}));
	});
});
