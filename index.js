import {bwt, inv_bwt} from './src/bwt.js'
import {eMTF, dMTF} from './src/mtf.js'

export const
  BASE62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
	COMPONENT = BASE62 + "-._~!()'*",
	PCHAR = COMPONENT + '+,;=$&:@',
	QUERY = PCHAR + '/?',
	URI = QUERY + '#'

export function enc(text, keys=COMPONENT) {
	return toString(arr_big(eMTF(bwt(text))), keys)
}

export function dec(code, keys=COMPONENT) {
	return inv_bwt(dMTF(big_arr(parseBig(code, keys))))
}


function toString(big, keys=COMPONENT) {
	const len = BigInt(keys.length)
	let res = []
	do {
		res.unshift(keys[big%len])
		big /= len
	} while (big)
	return res.join('')
}
function parseBig(txt, keys=COMPONENT) {
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
