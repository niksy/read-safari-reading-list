var path = require('path');
var pify = require('pify');
var plist = require('simple-plist');
var untildify = require('untildify');
var READING_LIST_FILE = '~/Library/Safari/Bookmarks.plist';

/**
 * @param  {Object} item
 *
 * @return {String}
 */
function getItemTitle ( item ) {
	var title = '';
	if ( item.URIDictionary && item.URIDictionary.title ) {
		title = item.URIDictionary.title;
	} else if ( item.ReadingListNonSync && item.ReadingListNonSync.Title ) {
		title = item.ReadingListNonSync.Title;
	} else {
		title = item.URLString;
	}
	return title;
}

/**
 * @param  {String} fp
 *
 * @return {Promise}
 */
module.exports = function ( fp ) {

	var resolvedFp;

	if ( typeof fp === 'undefined' ) {
		resolvedFp = untildify(READING_LIST_FILE);
	} else {
		resolvedFp = untildify(path.resolve(fp));
	}

	return pify(plist.readFile)(resolvedFp)
		.then(function ( res ) {

			return res.Children
				.filter(function ( item ) {
					return item.Title === 'com.apple.ReadingList';
				})
				.map(function ( item ) {
					if ( Array.isArray(item.Children) ) {
						return item.Children;
					}
					return [];
				})
				.reduce(function ( prev, next ) {
					return prev.concat(next);
				}, [])
				.map(function ( item ) {
					return {
						title: getItemTitle(item),
						description: item.ReadingList.PreviewText,
						url: item.URLString,
						dateAdded: new Date(item.ReadingList.DateAdded).toJSON()
					};
				});

		});

};
