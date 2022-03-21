interface IStudent {
    name: string,
    age: number,
    gender: 'male' | 'female',
    sayHi: (name: string) => void,
    speak(): void
}

interface IProduct {
    uuid: string | number,
    productName: string,
    price: number,
    quantity: number,
    SKU: string,
    image: string,
    description: string,
    isSaleOff: boolean
}

interface IWorker {
    name: string,
    age: number,
    work(): void,
    intro: () => void,
    sayHi: () => void,
    getInfo: () => IWorker
}


// interface function
interface ISumFunc {
    (a: number, b: number):number
}

interface IMinusFunc {
    (a: number, b: number): number
}

const sum1: ISumFunc = (a, b) => {
    return a + b
}

// định nghĩa type của function có 2 kiểu 1 là 
// dùng signature
let sum2: () => void

sum2 = function() {
    
}