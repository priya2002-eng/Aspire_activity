class Person {
    name: string;
    dept: string;
    
    constructor(name: string, dept: string) {
        this.name = name;
        this.dept = dept;
    }
}

class Employee extends Person {
    empCode: number;
    
    constructor(empcode: number, name:string, dept:string) {
        super(name,dept);
        this.empCode = empcode;
    }
    
    displayName():void {
        console.log("Name = " + this.name + ", Department = " + this.dept + ", Employee Code = " + this.empCode);
    }
}

let emp = new Employee(178, "Aditya", "CSE");
emp.displayName();