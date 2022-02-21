import {encodeBWT, decodeBWT} from './src/bwt.js'
import {encodeMTF, decodeMTF} from './src/mtf.js'
import {encodeEGC, decodeEGC} from './src/egc.js'
import {encodeBTT, decodeBTT} from './src/btt.js'

import {UPPER, LOWER, DIGIT, HASH} from './src/charset.js'
export * from './src/charset.js'

const DIC = (' ' + LOWER + `,.'":;-?()[]{}\n!` + DIGIT + '+/*=_~<>^`#%\t$&@|\\' + UPPER).split('')

function charRange(i,j,a=[]) {
	while(i<=j) a.push( String.fromCharCode(i++) )
	return a
}
charRange(127, 127, charRange(0, 9, charRange(11, 31, DIC)))

export function encode(text, keys=HASH, dic=DIC) {
	return text ? encodeBTT(encodeEGC(encodeMTF(encodeBWT(text), dic)), keys) : ''
}

export function decode(code, keys=HASH, dic=DIC) {
	return code ? decodeBWT(decodeMTF(decodeEGC(decodeBTT(code, keys)), dic)) : ''
}
