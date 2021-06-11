/*
modified/simplified from
https://github.com/tommyreddad/tommyreddad.github.io/blob/master/js/2019-08-08-burrows-wheeler/bwt.js
*/

/**
* Gets the ending indices of the Lyndon factors for a given string, by Duval's algorithm.
* @param str The input string.
* @returns The Lyndon factorization of the input string.
*/
function lyndon(str) {
	const fact = [-1]
	let k = -1
	while (k < str.length - 1) {
		let i = k + 1,
				j = k + 2
		//ji=1
		while (j < str.length && str[i] <= str[j]) {
			i = str[i] === str[j] ? i+1 : k+1
			j += 1
		}
		while (k < i) fact.push(k += j - i)
	}
	return fact
}
/**
* Gets all of the cyclic rotations of a given segment.
* @param segment The input segment.
* @returns The cyclic rotations of the input segment.
*/
function get_segment_rotations(segment) {
	const rots = []
	for (let i = segment.start; i <= segment.end; ++i) {
		rots.push({
			start: i,
			end: segment.end,
			restart: segment.start
		})
	}
	return rots
}
/**
* Gets the comparator function which allows for comparing Segments of a given string in the
* lexicographic infinite periodic order.
* @param str The string whose segments are to be compared.
* @returns The Segment comparator function on the input string.
*/
function get_periodic_comparator(str) {
	return (i, j) => {
		let i_it = i.start,
				j_it = j.start
		do {
			if (str[i_it] < str[j_it]) return -1
			else if (str[i_it] > str[j_it]) return 1
			i_it++
			if (i_it > i.end) i_it = i.restart
			j_it++
			if (j_it > j.end) j_it = j.restart
			// Declare a tie if we ever return to the origin.
		} while (!(i_it === i.start && j_it === j.start))
		return 0
	}
}

/**
* Computes the Gil-Scott bijective Burrows-Wheeler transform of the input string.
* @param str The string to be transformed.
* @returns The Gil-Scott BWT of the input string.
*/
export function bwt(str) {
	// Collect the indices of rotations of the Lyndon factors.
	const lyndon_fact = lyndon(str),
				lyndon_fact_segments = [],
				rotations = [],
				output = []

	for (let i = 0; i < lyndon_fact.length - 1; ++i) lyndon_fact_segments.push({
		start: lyndon_fact[i] + 1,
		end: lyndon_fact[i + 1],
		restart: lyndon_fact[i] + 1
	})

	for (const fact of lyndon_fact_segments)
		for (const rot of get_segment_rotations(fact))
			rotations.push(rot)

	// The final result consists of the concatenated last rotation of each Lyndon factor.
	// It is an open problem to do this step in faster than O(n log n) time.
	rotations.sort(get_periodic_comparator(str))
	for (const rot of rotations) output.push( str[
		rot.start === rot.restart ? rot.end : rot.start-1
	])
	return output.join('')
}

/**
* Performs the subroutine `Match` from the Gil & Scott Burrows-Wheeler transform paper.
* @param str A string.
* @param Sigma The alphabet of the input string.
* @returns The output permutation.
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
* Inverts the Gil-Scott bijective Burrows-Wheeler transform of a given string.
* Performs the subroutine `MultiThread` from the Gil & Scott Burrows-Wheeler transform paper.
* @param str A string.
* @returns The inverted BWT of the given string.
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
	return alpha.reverse().join("")
}
