var myName = 'Lê Minh Cường';
var n = 99;
var isMale = true;
var car = undefined;
var uuid;
uuid = 1;
uuid = '2';
var names = ['John', 'Mike', 'Annie'];
var ages = [1, 2, 3, 4, 5];
var mixed = ['Mike', 1, 'John', 2];
function sum(a, b) {
    return a + b;
}
var minus1 = function (a, b) {
    return a - b;
};
var minus2 = function (a, b, c) {
    if (c === void 0) { c = 40; }
    return a - b;
};
var created = new Date();
var person = {
    name: "Cường",
    age: 23,
    isStudy: true,
    gender: "male",
    friends: ['Mike', 'John'],
    speak: function () {
    },
    sayHi: function () {
    },
    getName: function () {
        return this.name;
    }
};
// -------------------------------------------
