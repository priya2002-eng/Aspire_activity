// Abstraction using interface
// Author - Priyadharshini S
// Created Date - 03/04/2024

interface Employee {
    void displayDetails();
    double calculateSalary();
}

class RegularEmployee implements Employee {
    private String name;
    private double salary;

    public RegularEmployee(String name, double salary) {
        this.name = name;
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

public class EmployeeInterface {
    public static void main(String[] args) {
        Employee regularEmployee = new RegularEmployee("John Doe", 50000.0);
        
        System.out.println("Employee Details:");
        regularEmployee.displayDetails();

        System.out.println("Salary: $" + regularEmployee.calculateSalary());
        System.out.println();
    }
}
