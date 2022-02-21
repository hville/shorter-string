import {HASH} from './charset.js'

export function encodeBTT(big, keys=HASH) {
	const len = BigInt(keys.length)
	let res = []
	do {
		res.unshift(keys[big%len])
		big /= len
	} while (big)
	return res.join('')
}

export function decodeBTT(txt, keys=HASH) {
	const len = BigInt(keys.length)
	let big = 0n
	for (const c of txt) {
		big = big*len + BigInt(keys.indexOf(c))
	}
	return big
}
