import fs from 'mock-fs';
import o_o from 'yield-yield';
import assert from 'assert';
import { stdout } from 'test-console';
import validateCommand from '../lib/commands/validate';

describe('validateCommand', () => {
	context('given a sample file', () => {
		beforeEach(() => {
			fs({
				'sample.json': JSON.stringify({
					foo: {
						bar: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia dolor sed blandit aliquam.'
					},
					foz: {
						baz: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia dolor sed blandit aliquam.'
					}
				})
			});
		});

		afterEach(() => {
			fs.restore();
		});

		it('validates keys with a 100% matching', o_o(function * () {
			const expected = [
				'[100] foo.bar <=> foz.baz\n'
			];

			const inspect = stdout.inspect();

			yield validateCommand('sample.json', {}, yield);

			inspect.restore();

			assert.deepEqual(inspect.output, expected);
		}));
	});

	context('given a sample file and a threshold', () => {
		beforeEach(() => {
			fs({
				'sample.json': JSON.stringify({
					foo: {
						bar: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia dolor sed blandit aliquam.'
					},
					foz: {
						baz: 'Lorem ipsum dolor sit amet, consectetur lacinia elit. Sed dolor dolor sed blandit aliquam.'
					}
				})
			});
		});

		afterEach(() => {
			fs.restore();
		});

		it('validates keys with at least a threshold matching', o_o(function * () {
			const expected = [
				'[84] foo.bar <=> foz.baz\n'
			];

			const inspect = stdout.inspect();

			yield validateCommand('sample.json', { threshold: 80 }, yield);

			inspect.restore();

			assert.deepEqual(inspect.output, expected);
		}));
	});
});
