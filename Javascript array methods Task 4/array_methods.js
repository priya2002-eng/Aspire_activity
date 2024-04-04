const banks = ["SBI", "IOB", "HDFC","IDBI", "Canara"];
console.log(banks);

// find function
console.log(banks.find(checkBanks));
function checkBanks(bank) {
    return bank;
}

const ages = [3, 10, 18, 20];

// filter function
console.log(ages.filter(checkAge));
function checkAge(age) {
    return age > 18;
}

// forEach function
banks.forEach(checkF);
function checkF(item, index) {
    console.log('The Array element of ' + index + ' is ' + item);
}

// map function
console.log(ages.map(myFun));
function myFun(age){
    return age*2;
}

// pop function
console.log(banks.pop());

// push function
console.log(banks.push("ICICI"));
console.log(banks);

// shift & unshift function
console.log(banks.shift());
console.log(banks);
console.log(banks.unshift("ICICI"));
console.log(banks);

// concatenate
const emp = ["John", "Smith", "Rao", "Jane"];
console.log(emp.concat(banks));

// splice function
console.log(emp.splice(2, 0, "Rosy", "Arav"));
console.log(emp);

// slice function
console.log(emp.slice(1));



