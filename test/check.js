import fs from 'mock-fs';
import o_o from 'yield-yield';
import assert from 'assert';
import { stdout } from 'test-console';
import checkCommand from '../lib/commands/check';

describe('checkCommand', () => {
	context('given two sample files', () => {
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
						bar: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia dolor sed blandit aliquam.'
					},
					fow: {
						baw: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia dolor sed blandit aliquam.'
					}
				})
			});
		});

		afterEach(() => {
			fs.restore();
		});

		it('check duplicity of keys', o_o(function * () {
			const expected = [
				'Keys on sample_1.json not in sample_2.json:\n',
				'  foz.baz\n',
				'Keys on sample_2.json not in sample_1.json:\n',
				'  fow.baw\n'
			];

			const inspect = stdout.inspect();

			yield checkCommand('sample_1.json', ['sample_2.json'], yield);

			inspect.restore();

			assert.deepEqual(inspect.output, expected);
		}));
	});
});
