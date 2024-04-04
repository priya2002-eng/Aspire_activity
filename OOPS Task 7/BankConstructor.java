// constructor (default & parameterized) using simple bank example
// Author - Priyadharshini S
// Created Date - 02/04/2024

public class BankConstructor {
    String accountNumber;
    double balance;
    String accountHolder;

    public BankConstructor() {
        this.accountNumber = "0000000000";
        this.balance = 0.0;
        this.accountHolder = "John Doe";
    }

    public BankConstructor(String accountNumber, double balance, String accountHolder) {
        this.accountNumber = accountNumber;
        this.balance = balance;
        this.accountHolder = accountHolder;
    }

    public void displayInfo() {
        System.out.println("Account Number: " + accountNumber);
        System.out.println("Account Holder: " + accountHolder);
        System.out.println("Balance: $" + balance);
        System.out.println();
    }

    public static void main(String[] args) {
        BankConstructor defaultAccount = new BankConstructor();
        System.out.println("Default Account Information:");
        defaultAccount.displayInfo();

        BankConstructor customAccount = new BankConstructor("1234567890", 1000.0, "Jane Smith");
        System.out.println("Custom Account Information:");
        customAccount.displayInfo();
    }
}
