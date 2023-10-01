export const
	LOWER = 'abcdefghijklmnopqrstuvwxyz',
	UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
	DIGIT = '0123456789',
  BASE62 = DIGIT + UPPER + LOWER,
	BASE64 = BASE62 + '-_',
	UNRESERVED = BASE62 + '-._~',        // BASE66 RFC3986 https://datatracker.ietf.org/doc/html/rfc3986
	QUERY = UNRESERVED + '!$&()*+,;=:@', // BASE78 w/o % singleQuote https://bugs.chromium.org/p/chromium/issues/detail?id=292740
	HASH = QUERY + "#'/?"                // BASE82 ... all printable except "<>`%\{|}^

// Move-to-Front characters, favoring common characters first
export const MTF = ` ${LOWER},.'":;-?()[]{}\n!${DIGIT}+/*=_~<>^\`#%\t$&@|\\${UPPER}\v\f\r${chars(0,8)+chars(14,31)}\x7F`

function chars(i,j,s='') {
	while(i<=j) s+=String.fromCharCode(i++)
	return s
}

