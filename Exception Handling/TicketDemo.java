// Title: Exception Handling - Created a simple Ticket Booking System
// Author: Priyadharshini S
// Created Date: 30/05/2024

import java.util.Scanner;

public class TicketDemo{
    public static void main(String[] args) {
        TicketDemo system = new TicketDemo();
        system.startBooking();
    }

    public void startBooking() {
        Scanner scanner = new Scanner(System.in);

        try {
            System.out.print("Enter number of tickets to book: ");
            int numberOfTickets = Integer.parseInt(scanner.nextLine());

            if (numberOfTickets <= 0) {
                throw new IllegalArgumentException("Number of tickets must be greater than zero.");
            }

            // Simulate the ticket booking process
            bookTickets(numberOfTickets);

        } catch (NumberFormatException e) {
            System.out.println("Invalid input. Please enter a valid number.");
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
        } catch (BookingFailedException e) {
            System.out.println("Booking failed: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("An unexpected error occurred: " + e.getMessage());
        } finally {
            System.out.println("Thank you for using the Ticket Booking System.");
            scanner.close();
        }
    }

    public void bookTickets(int numberOfTickets) throws BookingFailedException {
        // Simulate a condition where booking might fail
        if (numberOfTickets > 5) {
            throw new BookingFailedException("Cannot book more than 5 tickets at a time.");
        }
        
        // Simulate successful booking
        System.out.println(numberOfTickets + " tickets successfully booked.");
    }
}

// Custom exception for booking failures
class BookingFailedException extends Exception {
    public BookingFailedException(String message) {
        super(message);
    }
}
