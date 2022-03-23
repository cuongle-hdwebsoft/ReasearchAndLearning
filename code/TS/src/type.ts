// primitive type
type StringOrNumber = string | number
let uid:StringOrNumber

// object
type Person = { id: StringOrNumber, name: string }

// array
type ArrayString = string[]
type ArrayNumber = number[]
type ArrayNumberAndString = (number | string)[]

let a1: ArrayString = ['1','2','3']
let a2: ArrayNumber = [1, 2, 3]
let a3: ArrayNumberAndString = [1, '3', 2]

// function
type IFunction1 = {
    (s: string) : void
}

const function1:IFunction1 = (s) => {
    return 1
}

console.log(function1("123"))
