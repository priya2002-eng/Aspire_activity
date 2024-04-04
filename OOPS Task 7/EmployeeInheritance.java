// Inheritance - single, multilevel & hierarchical
// Author - Priyadharshini S
// Created Date - 03/04/2024

class Employee {
    String name;
    double salary;

    public Employee(String name, double salary) {
        this.name = name;
        this.salary = salary;
    }

    public void displayDetails() {
        System.out.println("Name: " + name);
        System.out.println("Salary: $" + salary);
    }
}

// Single inheritance
class Manager extends Employee {
    String department;

    public Manager(String name, double salary, String department) {
        super(name, salary);
        this.department = department;
    }

    @Override
    public void displayDetails() {
        super.displayDetails();
        System.out.println("Department: " + department);
    }
}

// Multilevel Inheritance
class TeamLead extends Manager {
    int teamSize;

    public TeamLead(String name, double salary, String department, int teamSize) {
        super(name, salary, department);
        this.teamSize = teamSize;
    }

    @Override
    public void displayDetails() {
        super.displayDetails();
        System.out.println("Team Size: " + teamSize);
    }
}

// Hierarchical Inheritance
class Developer extends Employee {
    String programmingLanguage;

    public Developer(String name, double salary, String programmingLanguage) {
        super(name, salary);
        this.programmingLanguage = programmingLanguage;
    }

    @Override
    public void displayDetails() {
        super.displayDetails();
        System.out.println("Programming Language: " + programmingLanguage);
    }
}

public class EmployeeInheritance {
    public static void main(String[] args) {

        Manager manager = new Manager("Alice Smith", 75000.0, "HR");
        manager.displayDetails();
        System.out.println();

        TeamLead teamLead = new TeamLead("Bob Johnson", 60000.0, "IT", 5);
        teamLead.displayDetails();
        System.out.println();

        Developer developer1 = new Developer("Charlie Brown", 50000.0, "Java");
        developer1.displayDetails();
        System.out.println();
    }
}
