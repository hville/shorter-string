<!-- markdownlint-disable MD004 MD007 MD010 MD041 MD022 MD024 MD029 MD031 MD032 MD034 MD036 -->
# shorter-string

*small string to string compression for short strings using Burrows-Wheeler transform (BWT), move to front (MTF) and Elias-gamma variable length encoding*

• [Example](#example) • [API](#api) • [Notes](#notes) • [License](#license)

## Example

```javascript
import {encode, decode} from './index.js'

const text = `Si six chasseurs savent chasser sans six chiens, soixante-six chasseurs savent chasser sans soixante-six chiens.`,

const code = encode(text)
// 'PFp_Dd#sCa;F/f+QjYY/IEqySuqvq2JQ&=a2*?org~9T+r.:qp,yW6q

console.log( decode(code) === text),  )
// true, with 50% compression in character length
```

## API

exports            | Note
------------------ | -------------------------------
**string constants**|
BASE62             | `0-9A-Za-z`
BASE64             | BASE62 + `-_`
UNRESERVED         | BASE62 + `-._~`; [RFC 3986](https://tools.ietf.org/html/rfc3986) base:66
PCHAR              | UNRESERVED + `%!$&'()*+,;=:@`; [RFC 3986](https://tools.ietf.org/html/rfc3986) base:80
QUERY              | PCHAR without `'` for [chrome](https://bugs.chromium.org/p/chromium/issues/detail?id=292740) base:79
RFC1924            | [RFC1924](https://datatracker.ietf.org/doc/html/rfc192485) base:85
HASH               | PCHAR + `/?#`; base:83
**functions**      |
encode             | `( text:string, [keys:string=HASH] ) => code:string`
decode:            | `( code:string, [keys:string=HASH] ) => text:string`

## Notes

* inpired from the blog post [reddad.ca/2020/09/27/burrows-wheeler-revisited](https://reddad.ca/2020/09/27/burrows-wheeler-revisited/)
* modified to facilitate URI friendly encoding
* optimized for short strings
* not optimized for large inputs
* other alternatives considered
  * lz-string (small but no es6 exports and not the best compression for URI components)
  * lzbase62 (better compression)
  * lzutf8 (best compression, too big at 68.5 kb minified, no es6 exports)

[Live Demo](<https://schem.ist/bwt/index.html#en/exi_hL?ZiKNQ$_GjNm7p@).PdmyIa1Up%T%(+'K_jiUzi!=LTIkOd,C;>)


# License

[MIT](http://www.opensource.org/licenses/MIT) © [Hugo Villeneuve](https://github.com/hville)
