// Title: Collections - Stack
// Author: Priyadharshini S
// Created Date: 31/05/2024

import java.util.Stack;

class StackDemo {
    public static void main(String[] args) {
        Stack<String> employeeName = new Stack<String>();
        employeeName.push("Abel");
        employeeName.push("Bob");
        employeeName.push("Charlie");

        employeeName.pop();
        System.out.println(employeeName);

        // Using peek() method
        String topEmployee = employeeName.peek();
        System.out.println("Top of the stack: " + topEmployee);

        // Using isEmpty() method
        boolean isEmpty = employeeName.isEmpty();
        System.out.println("Is the stack empty? " + isEmpty);
    }
}

// Output
// [Abel, Bob]
// Top of the stack: Bob
// Is the stack empty? false
