export {}

// definition
let names: string[] = ["john", "mike", "annie"]
let ages: number[] = [1, 2, 3, 4, 5]

names.push("erik")
names.pop()
names[0] = "new names"

console.log(ages.filter(age => {
    if(age > 3) {
        return true
    }

    return false
}))

console.log(names)

let id: string | number = 1
id = "2"

let person: {
    name: string,
    age: number,
    isMale?: true
} = {
    name: "Lê Minh Cường",
    age: 24,
    isMale: true
}