import {MTF} from './charset.js'

export function decodeMTF(arr, DIC=MTF) {
	const res = [],
				dic = DIC.split('')
	for (let i of arr) {
		//need to expand the dic to include highest value
		if (i>=dic.length) for (let j=dic.length; j<=i; ++j) dic[j] = String.fromCharCode(j)
		const c = dic[i]
		res.push(c)
		//move to front
		while(i) dic[i] = dic[--i]
		dic[0] = c
	}
	return res.join('')
}

export function encodeMTF(txt, DIC=MTF) {
	const res = [],
				dic = DIC.split('')
	for (const c of txt) {
		//TODO map?
		let i = dic.indexOf(c)
		if (i<0) {
			//need to expand the dic to include highest value
			i=c.charCodeAt()
			for (let j=dic.length; j<i; ++j) dic[j] = String.fromCharCode(j)
		}
		res.push(i)
		//move to front
		while(i) dic[i] = dic[--i]
		dic[0] = c
	}
	return res
}
