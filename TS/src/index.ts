let myFullName: string = "Lê Minh Cường"
let myAge: number = 24
let isStudying: boolean = true
let car: undefined = undefined

let student: {
    name: string, 
    age: number,
    isMale: boolean,
    speak(): void,
    getName(): string,
    sayHi(friendName: string): void,
    parents: string[]
} = {
    name: 'Lê Minh Cường', 
    age: 23,
    isMale: true,
    speak: function() {},
    getName: function() { return this.name },
    sayHi: (friendName: string) => {},
    parents: ['mom', 'dad']
}

console.log(student)

type ISum = {
    (a: number, b: number): number
}

const sum:ISum = (a, b) => {
    return a + b
}

console.log(sum(1, 2))


const makeArrayXY2 = <S, T>(x: S, y: T): Array<T | S> => {
    return [x, y]
}

console.log(makeArrayXY2(1, '3'))

const handleProduct1 = <T extends {name: string}>(obj: T) => {
    return {
        ...obj,
        someFunc: function() {},
        info: function() {
            console.log(obj.name)
        }
    }
}

const handleProduct2 = <T>(obj: T) => {
    return {
        ...obj,
        someFunc: function() {},
    }
}

console.log(handleProduct2({ name: "132", age: 123 }))