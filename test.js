import {enc, dec, QUERY} from './index.js'

//const text = `Les chemises de l'archiduchesse sont-elles sèches ou archi-sèches? Pour qu'on dise cette phrase avec adresse, il ne faut pas que la langue soit rêche.`
//const text = `How much wood would a woodchuck chuck if a woodchuck could chuck wood?`
const text = `Un chasseur sachant chasser sait chasser sans son chien.`

const comp = enc(text, QUERY)
console.log(comp)

console.log(dec(comp, QUERY) === text, (100*comp.length/text.length).toFixed(0) + '%')

