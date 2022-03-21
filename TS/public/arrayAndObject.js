"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// definition
let names = ["john", "mike", "annie"];
let ages = [1, 2, 3, 4, 5];
names.push("erik");
names.pop();
names[0] = "new names";
console.log(ages.filter(age => {
    if (age > 3) {
        return true;
    }
    return false;
}));
console.log(names);
let id = 1;
id = "2";
let person = {
    name: "Lê Minh Cường",
    age: 24,
    isMale: true
};
