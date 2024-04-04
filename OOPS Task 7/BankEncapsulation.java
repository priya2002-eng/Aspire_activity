// Encapsulation
// Author - Priyadharshini S
// Created Date - 02/04/2024

class BankAccount {

    private String accountNumber;
    private String accountHolder;
    private double balance;

    public String getAccountNumber() { 
        return accountNumber; 
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber; 
    }

    public String getAccountHolder() { 
        return accountHolder; 
    }

    public void setAccountHolder(String accountHolder) { 
        this.accountHolder = accountHolder; 
    }

    public double getBalance() { 
        return balance; 
    }

    public void setBalance(double balance) { 
        this.balance = balance; 
    }
}

public class BankEncapsulation {
    public static void main(String[] args) {
        BankAccount account = new BankAccount();
        account.setAccountNumber("1234567890");
        account.setAccountHolder("Alice Johnson");
        account.setBalance(5000.0);

        System.out.println("Account Number: " + account.getAccountNumber());
        System.out.println("Account Holder: " + account.getAccountHolder());
        System.out.println("Account Balance: $" + account.getBalance());
    }
}
