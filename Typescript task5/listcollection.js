var numbers = [1, 2, 3, 4, 5];
numbers.push(6);
numbers.push(7);
console.log("Element at index 0:", numbers[0]);
console.log("Element at index 3:", numbers[3]);
console.log("\nElements in the list:");
for (var i = 0; i < numbers.length; i++) {
    console.log(numbers[i]);
}
console.log("\nElements in the list using forEach:");
numbers.forEach(function (num) {
    console.log(num);
});
var indexToRemove = numbers.indexOf(3);
if (indexToRemove !== -1) {
    numbers.splice(indexToRemove, 1);
}
console.log("\nUpdated Elements in the list:");
numbers.forEach(function (num) {
    console.log(num);
});
