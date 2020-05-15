import assert from 'assert';
import path from 'path';
import proxyquire from 'proxyquire';
import fn from '../index';

it('should parse Reading List with items to JSON object', async function() {
	const { default: expected } = await import('./fixtures/full.expected.json');

	const response = await fn('./test/fixtures/full.plist');

	assert.deepEqual(response, expected);
});

it('should parse empty Reading List to empty array', async function() {
	const response = await fn('./test/fixtures/empty.plist');

	assert.deepEqual(response.length, 0);
});

it('should use default Reading List if file path argument is not provided', async function() {
	const { default: expected } = await import('./fixtures/full.expected.json');

	const { default: pfn } = proxyquire('../index.js', {
		untildify: function() {
			return path.resolve('./test/fixtures/full.plist');
		}
	});

	const response = await pfn();

	assert.deepEqual(response, expected);
});
