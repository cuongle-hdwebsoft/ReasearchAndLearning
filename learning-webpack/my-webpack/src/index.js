import { getPort } from './utils.js'

const arr = Array.from({ length: 10 }).map((_, index) => index); 

console.log('Server open port ' + getPort());