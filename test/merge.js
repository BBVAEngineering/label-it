import fs from 'mock-fs';
import o_o from 'yield-yield';
import assert from 'assert';
import loadFile from '../src/helpers/load-file';
import mergeCommand from '../src/commands/merge';

describe('mergeCommand', () => {
	context('given three sample files', () => {
		beforeEach(() => {
			const sample1 = {
				foo: {
					bar: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia dolor sed blandit aliquam.'
				},
				foz: {
					baz: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia dolor sed blandit aliquam.'
				}
			};
			const sample2 = {
				foo: {
					bar: 'Lorem dolor dolor dolor dolor, consectetur adipiscing elit. Sed lacinia dolor sed blandit aliquam.'
				}
			};
			const sample3 = {
				foz: {
					baw: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia dolor sed blandit aliquam.'
				}
			};
			const sample4 = {
				foz: {
					foo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia dolor sed blandit aliquam.'
				}
			};

			fs({
				'sample_1.json': JSON.stringify(sample1),
				'sample_2.json': JSON.stringify(sample2),
				'sample_3.json': JSON.stringify(sample3),
				'sample_4.json': JSON.stringify(sample4)
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
					baz: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia dolor sed blandit aliquam.',
					foo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia dolor sed blandit aliquam.'
				}
			};

			yield mergeCommand('sample_1.json', ['sample_2.json', 'sample_3.json', 'sample_4.json'], yield);

			const output = yield loadFile('sample_1.json');

			assert.deepEqual(output, expected);
		}));
	});
});
