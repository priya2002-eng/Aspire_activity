// Title: Exception Handling - (using simple try, catch & finally blocks)
// Author: Priyadharshini S
// Created Date: 30/05/2024

class TryCatch{
    public static void main(String[] args) {
        divideNum(10,5);
        divideNum(10,0);
    }
    public static void divideNum(int a,int b){

	// Example with simple try and catch block
        // try{
        //     int result = a/b;
        //     System.out.println("Result is :" + result);
        // }
        // catch(ArithmeticException exception){
        //     System.err.println("Error:" + exception.getMessage());
        // }
        // finally{
        //     System.err.println("Successfull excecution");
        // }

	
	// Example with nested try and catch block with two finally
        try{
            try{
                int result = a/b;
                System.out.println("Result is :" + result);
            }
            catch(ArithmeticException exception){
                System.err.println("Error:" + exception.getMessage());
            }
            finally{
                System.err.println("Inner try Successfull excecution");
            }
        }
        catch(Exception exception){
            System.out.println("Unexpected error:" + exception.getMessage());
        }
        finally{
            System.out.println("Finally block successfully executed");
        }
    }
}





