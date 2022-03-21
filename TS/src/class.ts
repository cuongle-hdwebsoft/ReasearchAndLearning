interface IEmployee {
    info(): void,
    sit: () => void
}

interface IHuman {
    talk(): void,
    walk(): void,
    carry(): void,
    sayFullName(): string
}

class Employee implements IEmployee, IHuman {
    // public readonly name: string
    // public age: number
    // public isMale: boolean
    
    // constructor(name: string, age: number, isMale: boolean) {
    //     this.name = name
    //     this.age = age
    //     this.isMale = isMale
    // }

    constructor(
        public readonly name: string,
        public age: number,
        public isMale: boolean
    ) {

    }
    talk(): void {
        throw new Error("Method not implemented.")
    }
    walk(): void {
        throw new Error("Method not implemented.")
    }
    carry(): void {
        throw new Error("Method not implemented.")
    }
    sayFullName(): string {
        throw new Error("Method not implemented.")
    }

    info() {
        console.log(`My name is ${this.name} and age is ${this.age}`)
    }

    sit() {

    }
}