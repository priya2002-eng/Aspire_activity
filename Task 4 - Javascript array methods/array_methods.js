const fruits = ["Apple", "Banana", "Grapes","Kiwi", "Cherry"];
console.log(fruits);

// find function
console.log(fruits.find(checkFruits));
function checkFruits(fruit) {
    return fruit;
}

const ages = [3, 10, 18, 20];

// filter function
console.log(ages.filter(checkAge));
function checkAge(age) {
    return age > 18;
}

// forEach function
fruits.forEach(checkF);
function checkF(item, index) {
    console.log('The Array element of ' + index + ' is ' + item);
}

// map function
console.log(ages.map(myFun));
function myFun(age){
    return age*2;
}

// pop function
console.log(fruits.pop());

// push function
console.log(fruits.push("Guva"));
console.log(fruits);

// shift & unshift function
console.log(fruits.shift());
console.log(fruits);
console.log(fruits.unshift("Pineapple"));
console.log(fruits);

// concatenate
const veg = ["Potato", "Tomato", "Onion", "Lettuce"];
console.log(veg.concat(fruits));

// splice function
console.log(veg.splice(2, 0, "Carrot", "Cabbage"));
console.log(veg);

// slice function
console.log(veg.slice(1));



