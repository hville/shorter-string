export const
	LOWER = 'abcdefghijklmnopqrstuvwxyz',
	UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
	DIGIT = '0123456789',
  BASE62 = DIGIT + UPPER + LOWER,
	BASE64 = BASE62 + '-_',
	// https://datatracker.ietf.org/doc/html/rfc3986
	UNRESERVED = BASE62 + '-._~',
	PCHAR = UNRESERVED + "%!$&'()*+,;=:@",
	// base85:RFC1924 https://datatracker.ietf.org/doc/html/rfc1924
	RFC1924 = BASE62 + '!#$%&()*+-;<=>?@^_`{|}~',
	// excluding the single quote query strings https://bugs.chromium.org/p/chromium/issues/detail?id=292740
	QUERY = UNRESERVED + '%!$&()*+,;=:@',
	// adding RFC1924 full possible fragment hash values
	HASH = PCHAR + "/?#"

	// Move-to-Front characters, favoring common characters first
export const MTF = charRange(127, 127,
	charRange(0, 8,
		charRange(11, 31, ' ' + LOWER + `,.'":;-?()[]{}\n!` + DIGIT + '+/*=_~<>^`#%\t$&@|\\' + UPPER)
	)
)

function charRange(i,j,s) {
	while(i<=j) s+=String.fromCharCode(i++)
	return s
}

