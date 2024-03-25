//creating a Set
let set = new Set();
set.add(10);
set.add(20);
set.add("Apple");
set.add("Apple");
set.add(7.85);

console.log("Elements in the Set:");
for (let item of set) {
    console.log(item);
}

// Creating a Map
let map = new Map();
map.set(1, "India");
map.set(2, "US");
map.set(3, "Finland");

console.log("\nEntries in the Map:");
map.forEach((value, key) => {
    console.log(`Key: ${key}, Value: ${value}`);
});
