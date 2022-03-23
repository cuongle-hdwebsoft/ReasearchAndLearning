"use strict";
const isPrime = (n) => {
    if (n < 2) {
        return false;
    }
    if (n == 2) {
        return true;
    }
    let length = Math.ceil(Math.sqrt(n));
    for (let i = 2; i <= length; i++) {
        if (n % i === 0) {
            return false;
        }
    }
    return true;
};
console.log(isPrime(1), isPrime(2), isPrime(3), isPrime(4), isPrime(5), isPrime(6));
function add(a, b, c) {
    if (typeof c === 'string') {
        return a + b;
    }
    else {
        return a + b + c;
    }
}
console.log(add(1, 2, 3), add(1, 2, '3'));
