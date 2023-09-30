/**
 * @param {number[]} arr
 * @returns {BigInt}
 */
export function encodeEGC(arr, min=0) {
	let res = 0n,
			j = arr.length
	while(j--) {
		let v = arr[j]+1-min, //normal coding starts at 1
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
export function decodeEGC(big, min=0) {
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
		res.push(v-1+min)
	}
	return res
}
