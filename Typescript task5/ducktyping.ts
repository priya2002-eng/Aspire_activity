class Dog {
    makeSound() {
        console.log("Woof! Woof!");
    }
}

class Cat {
    makeSound() {
        console.log("Meow! Meow!");
    }
}

interface Animal {
    makeSound(): void;
}

let myDog: Animal = new Dog();
let myCat: Animal = new Cat();

myDog.makeSound(); 
myCat.makeSound(); 
