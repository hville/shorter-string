<!-- markdownlint-disable MD004 MD007 MD010 MD041 MD022 MD024 MD029 MD031 MD032 MD036 -->
# shorter-string

*small string to string compression for short strings using Burrows-Wheeler transform (BWT), move to front (MTF) and Elias-gamma variable length encoding*

• [Example](#example) • [API](#api) • [Notes](#notes) • [License](#license)

## Example

```javascript
import {enc, dec, FRAGMENT} from './index.js'

const text = `Si six chasseurs savent chasser sans six chiens, soixante-six chasseurs savent chasser sans soixante-six chiens.`,
      code = enc(text, FRAGMENT) //1/x;CKry3eHaIZeUyL0/-J5u+kqO~S@YyQJHg6Xxs?9Ks/K5-_R=kMl.-

console.log( dec(comp, QUERY) === text),  ) //true, with 51% compression
```

## API

Constants          | Note
------------------ | -------------------------------
BASE62:string      | `0-9A-Za-z`
UNRESERVED:string  | BASE62 + `.-_~` as in [RFC 3986](https://tools.ietf.org/html/rfc3986)
QUERY:string       | [RFC 3986](https://tools.ietf.org/html/rfc3986) `query` except `'` for Chrome
FRAGMENT:string    | [RFC 3986](https://tools.ietf.org/html/rfc3986) `fragment`, same as QUERY + `'`

* enc: `( text:string, [keys:string=COMPONENT] ) => code:string`
* dec: `( code:string, [keys:string=COMPONENT] ) => text:string`

## Notes

* inpired from the blog post [reddad.ca/2020/09/27/burrows-wheeler-revisited](https://reddad.ca/2020/09/27/burrows-wheeler-revisited/)
* modified to facilitate URI friendly encoding
* optimized for short strings
* not optimized for large inputs
* other alternatives considered
  * lz-string (small but no es6 exports and not the best compression for URI components)
  * lzbase62 (better compression)
  * lzutf8 (best compression, too big at 68.5 kb minified, no es6 exports)

# License

[MIT](http://www.opensource.org/licenses/MIT) © [Hugo Villeneuve](https://github.com/hville)
