import fs from 'mock-fs';
import o_o from 'yield-yield';
import assert from 'assert';
import { stdout } from 'test-console';
import { stdin } from 'mock-stdin';
import loadFile from '../lib/helpers/load-file';
import delCommand from '../lib/commands/del';

describe('delCommand', () => {
	context('given a sample file', () => {
		beforeEach(() => {
			fs({
				'sample.json': JSON.stringify({
					foo: {
						bar: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
					},
					foz: {
						baz: 'Sed lacinia dolor sed blandit aliquam.'
					}
				})
			});
		});

		afterEach(() => {
			fs.restore();
		});

		it('removes a key', o_o(function * () {
			const expectedOutput = {
				foz: {
					baz: 'Sed lacinia dolor sed blandit aliquam.'
				}
			};

			const inspect = stdout.inspect();
			const input = stdin();

			yield delCommand('sample.json', 'foo.bar', yield);

			input.send('y');
			input.send(null);

			inspect.restore();
			input.restore();

			const output = yield loadFile('sample.json');

			assert.deepEqual(output, expectedOutput);
		}));

		it('throws error when key does not exist', () => {
			delCommand('sample.json', 'foo.foo', (err) => {
				assert.equal(err.message, 'Key \'foo.foo\' does not exist in \'sample.json\'');
			});
		});
	});
});
