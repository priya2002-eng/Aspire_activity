export class account{
    accountHolderName:String;
    accountNumber:number;
    accountType:String;
    amount:number;
    date:String;

    constructor(accountHolderName:String, accountNumber:number, accountType:String, amount:number,date:String){
        this.accountHolderName=accountHolderName;
        this.accountNumber=accountNumber;
        this.accountType=accountType;
        this.amount=amount;
        this.date=date;
    }
}