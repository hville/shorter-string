export const
	LOWER = 'abcdefghijklmnopqrstuvwxyz',
	UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
	DIGIT = '0123456789',
  BASE62 = DIGIT + UPPER + LOWER,
	//https://datatracker.ietf.org/doc/html/rfc3986
	UNRESERVED  = BASE62 + '.-_~',
	// Chrome takes exception to the single quote in Query Strings https://bugs.chromium.org/p/chromium/issues/detail?id=292740
	QUERY = UNRESERVED + ',?!():;+/*=$&@',
	FRAGMENT = QUERY + "'"
