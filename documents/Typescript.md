# Typescript căn bản

## Định nghĩa các type 
<pre>
    Các kiểu nguyên thủy Primitive
    // string
    let myFullName: string = "Lê Minh Cường"

    // number
    let myAge: number = 24
    
    // boolean
    let isStudying: boolean = true

    // undefined
    let car: undefined = undefined

    // union
    let uuid: string | number;
    let uuid = 1
    let uuid = '2'

    Các kiểu complex
    // array
    let arr1: string[] = ['john', 'mike', 'annie']
    let arr2: number[] = [1, 2, 3, 4]
    let mixed: (string | number) = [1, 'mike', 'john', 2]

    // function
    // Declaration function
    function sum(a: number, b: number): number {
        return a + b
    }

    // Express function || arrow function
    const minus = (a: number, b: number): number => {
        return a - b
    }

    // object
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
</pre>

## Định nghĩa type cho Function
<pre>
    Có 4 cách 
    # Cách 1 dùng trực tiếp
    function isPrime(n: number): boolean {
        if(n < 2) {
            return false
        }

        if(n == 2) {
            return true
        }

        for(let i = 2; i <= Math.ceil(Math.sqrt(n)); i++) {
            if(n % i === 0) {
                return false
            }
        }

        return true
    }

    # Dùng signture
    let sum: (a: number, b: number) => number
    sum = (a, b) => {
        return a + b
    }

    # Dùng type alias
    type ISum = {
        (a: number, b: number): number
    }

    const sum:ISum = (a, b) => {
        return a + b
    }

    # Dùng interface 
    interface ISum {
        (a: number, b: number): number
    }

    const sum:ISum = (a, b) => {
        return a + b
    }
</pre>

## Class
<pre>
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
    class Human {
        constructor(
            public name: string;
            public age: number;
            public readonly gender: Gender  
        ) {
            
        }

        speak() {
            console.log(`Xin chào tôi tên là ${this.name}`)
        }

        sit() {
            console.log(`${this.name} is sitting`)
        }
    }

    // class extends và implements interface
    interface IWork {
        work: () => void
    }

    interface ICarry {
        carry: () => void
    }

    class Worker extends Human implements IWork, ICarry {
        public workerId: string

        constructor(name: string, age: number, gender: Gender, workerId: string) {
            super(name, age, gender)
            this.workerId = workerId
        }

        work() {

        }

        carry() {

        }
    }
</pre>

## Genetic
<pre>
    const last = <T>(arr: T[]): T => {
        return arr[arr.length - 1]
    }

    // T đại diện cho 1 loại dữ liệu bất kì, hàm nhận vào X kiểu T[] và kết quả trả về kiểu T

    const makeArrayX = <T>(x: T):T[] => {
        return [x]
    }

    const makeArrayXY = <S, T>(x: S, y: T): Array<T | S> => {
        return [x, y]
    }

    // genetic cố định object có { name: string }
    const handleProduct1 = <T extends { name: string }>(obj: T):T => {
        return {
            ...obj,
            someFunc: function() {},
        }
    }

    // genetic không cố định
    const handleProduct2 = <T extends object>(obj: T):T => {
        return {
            ...obj,
            someFunc: function() {},
        }
    }


</pre>