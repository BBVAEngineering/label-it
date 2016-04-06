import fs from 'mock-fs';
import o_o from 'yield-yield';
import assert from 'assert';
import { stdout } from 'test-console';
import { stdin } from 'mock-stdin';
import loadFile from '../lib/helpers/load-file';
import addCommand from '../lib/commands/add';

describe('addCommand', () => {
	context('given a sample file', () => {
		beforeEach(() => {
			fs({
				'sample.json': JSON.stringify({
					foo: {
						bar: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
					}
				})
			});
		});

		afterEach(() => {
			fs.restore();
		});

		it('adds a key', o_o(function * () {
			const expectedOutput = {
				foo: {
					bar: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
				},
				foz: {
					baz: 'Sed lacinia dolor sed blandit aliquam.'
				}
			};

			const inspect = stdout.inspect();

			yield addCommand('sample.json', 'foz.baz', 'Sed lacinia dolor sed blandit aliquam.', {}, yield);

			inspect.restore();

			const output = yield loadFile('sample.json');

			assert.deepEqual(output, expectedOutput);
		}));

		it('prompts confirmation on similar keys', o_o(function * () {
			const expectedOutput = {
				foo: {
					bar: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
				},
				foz: {
					baz: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
				}
			};

			const inspect = stdout.inspect();
			const input = stdin();

			yield addCommand('sample.json', 'foz.baz', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', {}, yield);

			input.send('y');
			input.send(null);

			inspect.restore();
			input.restore();

			const output = yield loadFile('sample.json');

			assert.ok(inspect.output[1], '[100] foo.bar => \'Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
			assert.ok(inspect.output[3].match(/Are you sure to add key 'foz.baz'/));
			assert.deepEqual(output, expectedOutput);
		}));
	});
});
