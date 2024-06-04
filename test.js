// const obj1 = {
//     name: 2,
//     duc: "yes"
// }
// console.time("what")
// console.log("obj1::", obj1["name"]);
// console.timeEnd("what")

// // const obj = {
// //     name: 2,
// //     ful: "oke"
// // }
// // console.time("what")
// // console.log("obj::", obj.ful)
// // console.timeEnd("what")

// console.log(process.memoryUsage())

const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("first");
        resolve(1);
    }, 1000)
})
const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("second");
        resolve(2);
    }, 1000)
})
const promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("third");
        resolve(3);
    }, 1000)
})

// console.log(promise);

const arr = Promise.race([promise, promise1, promise2])
    .then((data) => console.log(data));
// console.log(arr);