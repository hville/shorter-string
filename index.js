import {bwt, inv_bwt} from './src/bwt.js'
import {eMTF, dMTF} from './src/mtf.js'
import {UPPER, LOWER, DIGIT, QUERY} from './src/charset.js'
export * from './src/charset.js'

const DIC = (' ' + LOWER + `,.'":;-?()[]{}\n!` + DIGIT + '+/*=_~<>^`#%\t$&@|\\' + UPPER).split('')
function charRange(i,j,a=[]) {
	while(i<=j) a.push( String.fromCharCode(i++) )
	return a
}
charRange(127, 127, charRange(0, 9, charRange(11, 31, DIC)))

export function enc(text, keys=QUERY, dic=DIC) {
	return text ? toString(arr_big(eMTF(bwt(text), dic)), keys) : ''
}

export function dec(code, keys=QUERY, dic=DIC) {
	return code ? inv_bwt(dMTF(big_arr(parseBig(code, keys)), dic)) : ''
}

function toString(big, keys=QUERY) {
	const len = BigInt(keys.length)
	let res = []
	do {
		res.unshift(keys[big%len])
		big /= len
	} while (big)
	return res.join('')
}
function parseBig(txt, keys=QUERY) {
	const len = BigInt(keys.length)
	let big = 0n
	for (const c of txt) {
		big = big*len + BigInt(keys.indexOf(c))
	}
	return big
}

/**
 * @param {number[]} arr
 * @returns {BigInt}
 */
function arr_big(arr) {
	let res = 0n,
			j = arr.length
	while(j--) {
		let v = arr[j]+1, //increment to allow 0
				n = -1
		while (v) {
			res = v&1 ? (res << 1n) | 1n : (res << 1n)
			v >>>= 1
			++n
		}
		res <<= BigInt(n)
	}
	return res
}
/**
 * @param {BigInt} big
 * @returns {number[]}
 */
function big_arr(big) {
	let res = []
	while(big) {
		let v = 0,
				n = 1
		while ( !(big&1n) ) {
			++n
			big >>= 1n
		}
		while (n--) {
			v = big&1n ? (v<<1)|1 : v<<1
			big >>= 1n
		}
		res.push(v-1)
	}
	return res
}
