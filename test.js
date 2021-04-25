import {enc, dec, QUERY} from './index.js'

//const text = `Les chemises de l'archiduchesse sont-elles sèches ou archi-sèches? Pour qu'on dise cette phrase avec adresse, il ne faut pas que la langue soit rêche.`
//const text = `How much wood would a woodchuck chuck if a woodchuck could chuck wood?`
const text = `Un chasseur sachant chasser sait chasser sans son chien.
Et si six chasseurs savent chasser sans six chiens, soixante-six chasseurs savent chasser sans soixante-six chiens.
`

const comp = enc(text, QUERY)
console.log(comp)

console.log(dec(comp, QUERY) === text, (100*comp.length/text.length).toFixed(0) + '%')

console.log(dec(`28===E85qYF$bFNUPfIi*5tJ'aaRQgAMzLm4M)mC,@Ncup+o7wGKP(JePW-:.m6_wNS4YO:*sG'v/J*3QrZL@M*hS`, QUERY))

