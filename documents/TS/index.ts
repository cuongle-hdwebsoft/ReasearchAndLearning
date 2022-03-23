// Basic type
let myName:string = 'Lê Minh Cường'
let n:number = 99
let isMale:boolean = true
let car:undefined = undefined
let uuid:string | number
uuid = 1
uuid = '2'

let names:string[] = ['John', 'Mike', 'Annie']
let ages:number[] = [1, 2, 3, 4, 5]
let mixed: (string | number)[] = ['Mike', 1, 'John', 2]

function sum(a: number, b: number): number {
    return a + b
}

const minus1 = (a: number, b: number): number => {
    return  a - b
}

const minus2 = (a: number, b?: number, c = 40): number => {
    return  a - b
}

let created:Date = new Date()

let person: {
    name: string,
    age: number,
    isStudy: boolean,
    gender: 'male' | 'female',
    friends: string[],
    speak: () => void,
    sayHi: (name: string) => void,
    getName(): string
} = {
    name: "Cường",
    age: 23,
    isStudy: true,
    gender: "male",
    friends: ['Mike', 'John'],
    speak() {
        console.log('Speaking...')
    },
    sayHi() {
        console.log('Saying hi...')
    },
    getName: function() {
        return this.name
    }
}

// Định nghĩa type cho Function
function isPrime(n: number): boolean {
    if(n < 2) {
        return false
    }

    if(n == 2) {
        return true
    }

    for(let i = 2; i < Math.ceil(Math.sqrt(n)); i++) {
        if(n % i === 0) {
            return false
        }
    }

    return true
}

let isEven: (n: number) => boolean
isEven = (n) => {
    if(n % 2 === 0) {
        return true
    }

    return false
}

type SumFunc = {
    (x: number, y: number): number
}

const sum2: SumFunc = (x, y) => {
    return x + y
}

interface IMinus {
    (x: number, y: number): number
}

const minus3:IMinus = (x, y) => {
    return x - y
}

// --------------------------------------

type Gender = 'male' | 'female'
class Human {
    public name: string;
    public age: number;
    public readonly gender: Gender

    constructor(name: string, age: number, gender: Gender) {
        this.name = name
        this.age = age
        this.gender = gender
    }

    speak() {
        console.log(`Xin chào tôi tên là ${this.name}`)
    }

    sit() {
        console.log(`${this.name} is sitting`)
    }
}

// cách viết khác của constructor
// class Human {
//     constructor(
//         public name: string;
//         public age: number;
//         public readonly gender: Gender  
//     ) {
        
//     }

//     speak() {
//         console.log(`Xin chào tôi tên là ${this.name}`)
//     }

//     sit() {
//         console.log(`${this.name} is sitting`)
//     }
// }

interface IWork {
    work: () => void
}

interface ICarry {
    carry: () => void
}

class WorkerMan extends Human implements IWork, ICarry {
    public workerId: string

    constructor(name: string, age: number, gender: Gender, workerId: string) {
        super(name, age, gender)
        this.workerId = workerId
    }

    work() {

    }

    carry() {

    }

    override speak(): void {
        
    }

    override sit(): void {
        
    }
}

// ---------------------------------------------
const last = <T>(arr: T[]): T => {
    return arr[arr.length - 1]
}

last<string>(['1', '2', '3', '4', '5'])
last<number>([1, 2, 3, 4, 5])

const makeArrayX = <T>(x: T):T[] => {
    return [x]
}

makeArrayX<string>('Mike')
makeArrayX<number>(1)

const handleProduct1 = <T extends {name: string, age: number}>(obj: T) => {
    return {
        ...obj,
        uuid: 1
    }
}

handleProduct1({ age: 23, name: "Cường", isMale: true })
// handleProduct1({ age: 23, isMale: true })
