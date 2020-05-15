import path from 'path';
import pify from 'pify';
import plist from 'simple-plist';
import untildify from 'untildify';

const READING_LIST_FILE = '~/Library/Safari/Bookmarks.plist';

/**
 * @param  {object} item
 *
 * @returns {string}
 */
function getItemTitle(item) {
	let title = '';
	if (item.URIDictionary && item.URIDictionary.title) {
		title = item.URIDictionary.title;
	} else if (item.ReadingListNonSync && item.ReadingListNonSync.Title) {
		title = item.ReadingListNonSync.Title;
	} else {
		title = item.URLString;
	}
	return title;
}

/**
 * @param  {string} filePath
 *
 * @returns {Promise}
 */
export default async (filePath) => {
	let resolvedFp;

	if (typeof filePath === 'undefined') {
		resolvedFp = untildify(READING_LIST_FILE);
	} else {
		resolvedFp = untildify(path.resolve(filePath));
	}

	const response = await pify(plist.readFile)(resolvedFp);

	return response.Children.filter(
		(item) => item.Title === 'com.apple.ReadingList'
	)
		.map((item) => (Array.isArray(item.Children) ? item.Children : []))
		.reduce((previous, next) => previous.concat(next), [])
		.map((item) => ({
			title: getItemTitle(item),
			description: item.ReadingList.PreviewText,
			url: item.URLString,
			dateAdded: new Date(item.ReadingList.DateAdded).toJSON()
		}));
};
