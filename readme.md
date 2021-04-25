<!-- markdownlint-disable MD004 MD007 MD010 MD041 MD022 MD024 MD029 MD031 MD032 MD036 -->
# shorter-string

*small string to string compression for short strings using Burrows-Wheeler transform (BWT), move to front (MTF) and Elias-gamma variable length encoding*

• [Example](#example) • [API](#api) • [Notes](#notes) • [License](#license)

## Example

```javascript
import {enc, dec, QUERY} from './index.js'

const text = `Si six chasseurs savent chasser sans six chiens, soixante-six chasseurs savent chasser sans soixante-six chiens.`,
      code = enc(text, QUERY) //bSg:x'i7aIW$&O@Mg&y6B2pTnUM4!dCqF',&TO6-pnFYF''W=NB2;M@9maoi&?VaM0j

console.log( dec(comp, QUERY) === text),  ) //true, with 60% compression
```

## API

Constants          | Characters             | Note
------------------ | ---------------------- | -------------------------------
BASE62:string      | `0`..`9a`..`zA`..`Z`   |
COMPONENT:string   | BASE62 + `-._~!()'*`   | same safe characters as in encodeURIComponent
PCHAR:string       | COMPONENT + `+,;=$&:@` | [RFC 3986](https://tools.ietf.org/html/rfc3986) pchar (except `%..`)
QUERY:string       | PCHAR + `/?`           | [RFC 3986](https://tools.ietf.org/html/rfc3986) query string
URI:string         | PCHAR + `/?#`          | same safe characters as in encodeURI

* enc: `( text:string, [keys:string=COMPONENT] ) => code:string`
* dec: `( code:string, [keys:string=COMPONENT] ) => text:string`

## Notes

* inpired from [tommyreddad.github.io](https://github.com/tommyreddad/tommyreddad.github.io/blob/master/js/2019-08-08-burrows-wheeler/bwt.js)
* modified to facilitate URI friendly encoding
* optimized for short strings
* not optimized for large inputs
* other alternatives considered
  * lz-string (small but no es6 exports and not the best compression for URI components)
  * lzbase62 (better compression)
  * lzutf8 (best compression, too big at 68.5 kb minified, no es6 exports)

# License

[MIT](http://www.opensource.org/licenses/MIT) © [Hugo Villeneuve](https://github.com/hville)
