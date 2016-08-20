# read-safari-reading-list

[![Build Status][ci-img]][ci]

Read and parse Safari Reading List.

## Install

```sh
npm install read-safari-reading-list --save
```

## Usage

```js
var readList = require('read-safari-reading-list');

readList('./Bookmarks.plist')
	.then(function ( json ) {
		console.log(json);
		/* [
			{
				"title": "https://www.npmjs.com/package/axe-core",
				"description": "Accessibility engine for automated Web UI testing",
				"url": "https://www.npmjs.com/package/axe-core",
				"dateAdded": "2016-07-31T09:11:41.000Z"
			},
			{
				"title": "“Array” Methods",
				"description": "_.chunk(array, [size=1]) # Ⓢ Ⓝ Creates an array of elements ...",
				"url": "https://lodash.com/docs",
				"dateAdded": "2016-07-31T12:36:22.000Z"
			},
			...
		] */
	});
```

## API

### readList(filePath)

Returns: `Promise`

Reads and parses Safari Reading List binary property list (or any property list containing Reading List items).

#### filePath

Type: `String`  
Default: `~/Library/Safari/Bookmarks.plist`

Path to property list.

## License

MIT © [Ivan Nikolić](http://ivannikolic.com)

[ci]: https://travis-ci.org/niksy/read-safari-reading-list
[ci-img]: https://img.shields.io/travis/niksy/read-safari-reading-list.svg
