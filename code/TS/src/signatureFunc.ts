export {}

let isEven: (n: number) => boolean

isEven = (n) => {
    if(n % 2 === 0) {
        return true
    }

    return false
}

let sum: (n: number) => number
let findMin: (arr: number[]) => number
let findMax: (arr: number[]) => number