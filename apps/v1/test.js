const obj1 =  {
    name: "Duc"
}

for (const key in obj1) {
    console.log("value:: ", obj1[key]);
}

for (const key in obj1) {
    console.log("key:: ", key);
}

console.log(Object.keys(obj1));

console.log(Object.values(obj1));