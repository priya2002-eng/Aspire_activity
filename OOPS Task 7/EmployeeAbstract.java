// Abstraction using abstract class
// Author - Priyadharshini S
// Created Date - 02/04/2024

abstract class Employee {
    protected String name;

    public Employee(String name) {
        this.name = name;
    }

    public abstract void displayDetails();
    public abstract double calculateSalary();
}

class RegularEmployee extends Employee {
    double salary;

    public RegularEmployee(String name, double salary) {
        super(name);
        this.salary = salary;
    }

    @Override
    public void displayDetails() {
        System.out.println("Regular Employee: " + name);
        System.out.println("Salary: $" + salary);
    }

    @Override
    public double calculateSalary() {
        return salary;
    }
}


public class EmployeeAbstract {
    public static void main(String[] args) {
        Employee regularEmployee = new RegularEmployee("John Doe", 50000.0);

        System.out.println("Employee Details:");
        regularEmployee.displayDetails();
        System.out.println("Salary: $" + regularEmployee.calculateSalary());
        System.out.println();
    }
}
