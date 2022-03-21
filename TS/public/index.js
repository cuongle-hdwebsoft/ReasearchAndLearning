"use strict";
let myFullName = "Lê Minh Cường";
let myAge = 24;
let isStudying = true;
let car = undefined;
let student = {
    name: 'Lê Minh Cường',
    age: 23,
    isMale: true,
    speak: function () { },
    getName: function () { return this.name; },
    sayHi: (friendName) => { },
    parents: ['mom', 'dad']
};
console.log(student);
const sum = (a, b) => {
    return a + b;
};
console.log(sum(1, 2));
const makeArrayXY2 = (x, y) => {
    return [x, y];
};
console.log(makeArrayXY2(1, '3'));
const handleProduct1 = (obj) => {
    return Object.assign(Object.assign({}, obj), { someFunc: function () { }, info: function () {
            console.log(obj.name);
        } });
};
const handleProduct2 = (obj) => {
    return Object.assign(Object.assign({}, obj), { someFunc: function () { } });
};
console.log(handleProduct2({ name: "132", age: 123 }));
