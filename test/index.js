var assert = require('assert');
var path = require('path');
var proxyquire = require('proxyquire');
var fn = require('../');

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

it('should use default Reading List if file path argument is not provided', function () {

	var expected = require('./fixtures/full.expected.json');
	var pfn = proxyquire('../', {
		untildify: function () {
			return path.resolve('./test/fixtures/full.plist');
		}
	});

	return pfn().then(function ( res ) {
		assert.deepEqual(res, expected);
	});

});
