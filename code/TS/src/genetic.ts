const last = <T>(arr: T[]): T => {
    return arr[arr.length - 1]
}

console.log(last([1, 2, 3, 4, 5]))

const makeArrayX = <T>(x: T): Array<T> => {
    return [x]
}

console.log(makeArrayX('3'))
console.log(makeArrayX(3))

const makeArrayXY = <T, X = number>(x: T, y: X): Array<T | X> => {
    return [x,y]
}

console.log(makeArrayXY(3, '5'))

// cố định object
const makeFullName = (obj: { firstName: string, lastName: string }) => {
    return {
        ...obj,
        fullName: obj.firstName + ' ' + obj.lastName
    }
}

console.log(makeFullName({ firstName: 'l', lastName: 'c' }))

const makeFullNameWithGenetic = <T extends object>(obj: T): T => {
    return {
        ...obj,
        name: 123
    }
}

console.log(makeFullNameWithGenetic({ c: 123 }))