import {encodeBWT, decodeBWT} from './src/bwt.js'
import {encodeMTF, decodeMTF} from './src/mtf.js'
import {encodeEGC, decodeEGC} from './src/egc.js'
import {encodeBTT, decodeBTT} from './src/btt.js'
import {HASH, MTF} from './src/charset.js'

export * from './src/charset.js'

export function encode(text, keys=HASH, dic=MTF) {
	return text ? encodeBTT(encodeEGC(encodeMTF(encodeBWT(text), dic)), keys) : ''
}

export function decode(code, keys=HASH, dic=MTF) {
	return code ? decodeBWT(decodeMTF(decodeEGC(decodeBTT(code, keys)), dic)) : ''
}
