const obj1 = {
    name: 2,
    duc: "yes"
}
console.time("what")
console.log("obj1::", obj1["name"]);
console.timeEnd("what")

// const obj = {
//     name: 2,
//     ful: "oke"
// }
// console.time("what")
// console.log("obj::", obj.ful)
// console.timeEnd("what")

console.log(process.memoryUsage())