import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { account } from './account.model';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {

  accountType:string="Savings";

  accounts:account[]=[{accountNumber:40006000956, accountHolderName:"Zuhale",accountType:"Savings",amount:50000,date:"15-05-2000"},
  {accountNumber:45236985211, accountHolderName:"Joe",accountType:"Business",amount:70000,date:"07-02-1998"},
  {accountNumber:85236974581, accountHolderName:"James",accountType:"Savings",amount:10000,date:"21-06-1995"},
  {accountNumber:23698541258, accountHolderName:"Zoya",accountType:"Savings",amount:4450,date:"18-11-1978"},
  {accountNumber:96325874125, accountHolderName:"Aditya",accountType:"Salary",amount:5000,date:"02-08-1963"},
  {accountNumber:52369854712, accountHolderName:"Smrithi",accountType:"Business",amount:20000,date:"14-02-2005"},
  {accountNumber:48632957158, accountHolderName:"Lakshi",accountType:"Salary",amount:55000,date:"09-12-2002"},
  {accountNumber:54789632541, accountHolderName:"Deeksha",accountType:"Savings",amount:78000,date:"25-08-2006"},
  {accountNumber:74569823651, accountHolderName:"Deepthi",accountType:"Business",amount:55800,date:"13-09-1972"},
  {accountNumber:32148695246, accountHolderName:"Manu",accountType:"Salary",amount:95000,date:"20-03-1985"},
  ];
}
