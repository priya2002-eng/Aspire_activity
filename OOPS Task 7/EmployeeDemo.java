// Fetching Employee details and calculating the salary 
// Author - Priyadharshini S
// Created Date - 02/04/2024

import java.util.Scanner;

public class EmployeeDemo {
    int employeeId;
    String employeeName;
    int employeeAge;
    String departmentName;
    int hoursWorked;
    int hourlyRate;

    public EmployeeDemo(int employeeId, String employeeName, int employeeAge, String departmentName, int hoursWorked, int hourlyRate) {
        this.employeeId = employeeId;
        this.employeeName = employeeName;
        this.employeeAge = employeeAge;
        this.departmentName = departmentName;
        this.hoursWorked = hoursWorked;
        this.hourlyRate = hourlyRate;
    }

    public int calculateSalary() {
        int salary = hoursWorked * hourlyRate;
        return salary;
    }

    public void displayDetails() {
        System.out.println("Employee Details:");
        System.out.println("Employee ID: " + employeeId);
        System.out.println("Name: " + employeeName);
        System.out.println("Age: " + employeeAge);
        System.out.println("Department: " + departmentName);
        System.out.println("Hours Worked: " + hoursWorked);
        System.out.println("Hourly Rate: " + hourlyRate);
        System.out.println("Salary: " + calculateSalary());
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Enter employee ID: ");
        int employeeId = scanner.nextInt();
        scanner.nextLine(); // Consume the newline left by nextInt()

        System.out.println("Enter employee name: ");
        String employeeName = scanner.nextLine();

        System.out.println("Enter employee Age: ");
        int employeeAge = scanner.nextInt();
        scanner.nextLine(); 

        System.out.println("Enter Department name: ");
        String departmentName = scanner.nextLine();

        System.out.println("Enter hours worked: ");
        int hoursWorked = scanner.nextInt();
        scanner.nextLine(); 

        System.out.println("Enter hourly rate: ");
        int hourlyRate = scanner.nextInt();
        scanner.nextLine(); 

        EmployeeDemo employee = new EmployeeDemo(employeeId, employeeName, employeeAge, departmentName, hoursWorked, hourlyRate);
        employee.displayDetails();

        scanner.close();
    }
}
