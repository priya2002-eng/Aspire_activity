// Polymorphism - method overriding
// Author - Priyadharshini S
// Created Date - 03/04/2024

class Employee {
    private String name;
    private int age;
    
    public Employee(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public void displayDetails() {
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
    }
}

class Manager extends Employee {
    private String designation;
    
    public Manager(String name, int age, String designation) {
        super(name, age);
        this.designation = designation;
    }
    
    @Override
    public void displayDetails() {
        super.displayDetails(); 
        System.out.println("Designation: " + designation);
    }
}

public class Overriding {
    public static void main(String[] args) {
       
        Employee employee = new Employee("Aditya", 25);
        
        System.out.println("Employee details:");
        employee.displayDetails();
        
        System.out.println();
        Manager manager = new Manager("Rao", 52, "HR");
        
        System.out.println("Manager details:");
        manager.displayDetails();
    }
}