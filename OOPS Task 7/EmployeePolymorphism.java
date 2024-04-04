// Polymorphism - method overloading 
// Author - Priyadharshini S
// Created Date - 03/04/2024

public class EmployeePolymorphism{

    public void getDetails(String name) {
        System.out.println("Name: " + name);
    }

    public void getDetails(String name, double bonus) {
        System.out.println("Name: "+ name + " Bonus: $" + bonus);
    }
    public static void main(String[] args) {

        EmployeePolymorphism employeePolymorphism = new EmployeePolymorphism();

        System.out.println("Employee Details:");
        employeePolymorphism.getDetails("John");
        employeePolymorphism.getDetails("John", 2000);

    }
}
