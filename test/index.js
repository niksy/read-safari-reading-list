var assert = require('assert');
var fn = require('../');

describe('Basic', function () {

	it('should parse Reading List with items to JSON object', function () {

		var expected = require('./fixtures/full.expected.json');

		return fn('./test/fixtures/full.plist').then(function ( res ) {
			assert.deepEqual(res, expected);
		});

	});

	it('should parse empty Reading List to empty array', function () {

		return fn('./test/fixtures/empty.plist').then(function ( res ) {
			assert.deepEqual(res.length, 0);
		});

	});

});
