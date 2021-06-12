/*
modified/simplified from
https://github.com/tommyreddad/tommyreddad.github.io/blob/master/js/2019-08-08-burrows-wheeler/bwt.js
*/

/**
* Duval's algorithm to gets the position following each Lyndon word
* @param {string} s
* @return {number[]} the end indices, last === length of the string
*/
function lyndon(s) {
	const ends = []
	let k = 0
	while (k < s.length) {
		let i = k,
				j = k+1
		while (j < s.length && s[i] <= s[j]) s[i] === s[j++] ? ++i : i=k
		ends.push(k += j-i)
	}
	return ends
}

/**
* Gets all of the lyndon words cyclic rotations
* @param {string} s
* @return {Object[]} The cyclic rotations of the input segment
*/
function get_rotations(s) {
	const words = lyndon(s),
				rots = []
	let iw = 0,
			i = 0
	for (let k=0; k<s.length; ++k) {
		if (k === words[iw]) i = words[iw++]
		rots[k] = { k, i, j:words[iw] }
	}
	return rots
}
/**
* Computes the Gil-Scott bijective Burrows-Wheeler transform of the input string
* @param {string} s
* @return {string} The Gil-Scott BWT string
*/
export function bwt(s) {
	return get_rotations(s)
	.sort((a, b) => {
		let ka = a.k,
				kb = b.k
		do {
			if (s[ka] < s[kb]) return -1
			else if (s[ka] > s[kb]) return 1
			if (++ka === a.j) ka = a.i
			if (++kb === b.j) kb = b.i
			// Declare a tie if we ever return to the origin.
		} while (ka !== a.k || kb !== b.k)
		return 0
	})
	.reduce( (acc, rot) => acc + s[ (rot.k === rot.i ? rot.j : rot.k) - 1 ], '')
}

/**
* Performs the subroutine `Match` from the Gil & Scott Burrows-Wheeler transform paper
* @param {string} str
* @return {number[]} The output permutation
*/
function match(str) {
	const cnt = {}
	for (const c of str) cnt[c] ? ++cnt[c] : cnt[c]=1
	const keys = Object.keys(cnt).sort(),
				before = {[keys[0]]: 0},
				theta = [],
				seen = {}
	for (let i = 1; i < keys.length; ++i)
		before[keys[i]] = before[keys[i-1]] + cnt[keys[i-1]]
	for (const c of str)
		theta.push(before[c] + (seen[c] ? ++seen[c] : seen[c]=1) - 1)
	return theta
}

/**
* Inverts the Gil-Scott bijective Burrows-Wheeler transform
* @param {string} str
* @return {string} The inverted BWT
*/
export function inv_bwt(str) {
	const T = match(str),
				alpha = []
	for (let j = 0; j < str.length; ++j) {
		if (T[j] !== -1) {
			let k = j
			do {
				alpha.push(str[k])
				const t = k
				k = T[k]
				T[t] = -1
			} while (T[k] !== -1)
		}
	}
	return alpha.reverse().join('')
}
