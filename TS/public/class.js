"use strict";
class Employee {
    // public readonly name: string
    // public age: number
    // public isMale: boolean
    // constructor(name: string, age: number, isMale: boolean) {
    //     this.name = name
    //     this.age = age
    //     this.isMale = isMale
    // }
    constructor(name, age, isMale) {
        this.name = name;
        this.age = age;
        this.isMale = isMale;
    }
    talk() {
        throw new Error("Method not implemented.");
    }
    walk() {
        throw new Error("Method not implemented.");
    }
    carry() {
        throw new Error("Method not implemented.");
    }
    sayFullName() {
        throw new Error("Method not implemented.");
    }
    info() {
        console.log(`My name is ${this.name} and age is ${this.age}`);
    }
    sit() {
    }
}
