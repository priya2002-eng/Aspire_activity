var Dog = /** @class */ (function () {
    function Dog() {
    }
    Dog.prototype.makeSound = function () {
        console.log("Woof! Woof!");
    };
    return Dog;
}());
var Cat = /** @class */ (function () {
    function Cat() {
    }
    Cat.prototype.makeSound = function () {
        console.log("Meow! Meow!");
    };
    return Cat;
}());
var myDog = new Dog();
var myCat = new Cat();
myDog.makeSound();
myCat.makeSound();
