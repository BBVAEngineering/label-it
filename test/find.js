import fs from 'mock-fs';
import o_o from 'yield-yield';
import assert from 'assert';
import { stdout } from 'test-console';
import findCommand from '../src/commands/find';

describe('findCommand', () => {
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

		it('finds keys with at least a 70% matching', o_o(function * () {
			const expected = [
				'[77] foo.bar => \'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\'\n'
			];

			const inspect = stdout.inspect();

			yield findCommand('sample.json', 'Lorem ipsum dolor sit amet, consectetur consectetur elit.', {}, yield);

			inspect.restore();

			assert.deepEqual(inspect.output, expected);
		}));
	});

	context('given a sample file and a threshold', () => {
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

		it('finds keys with at least a threshold matching', o_o(function * () {
			const expected = [
				'[77] foo.bar => \'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\'\n'
			];

			const inspect = stdout.inspect();

			yield findCommand('sample.json', 'Lorem ipsum dolor sit amet, consectetur consectetur elit.', {}, yield);

			inspect.restore();

			assert.deepEqual(inspect.output, expected);
		}));
	});
});
