"use strict";
const last = (arr) => {
    return arr[arr.length - 1];
};
console.log(last([1, 2, 3, 4, 5]));
const makeArrayX = (x) => {
    return [x];
};
console.log(makeArrayX('3'));
console.log(makeArrayX(3));
const makeArrayXY = (x, y) => {
    return [x, y];
};
console.log(makeArrayXY(3, '5'));
// cố định object
const makeFullName = (obj) => {
    return Object.assign(Object.assign({}, obj), { fullName: obj.firstName + ' ' + obj.lastName });
};
console.log(makeFullName({ firstName: 'l', lastName: 'c' }));
const makeFullNameWithGenetic = (obj) => {
    return Object.assign(Object.assign({}, obj), { name: 123 });
};
console.log(makeFullNameWithGenetic({ c: 123 }));
