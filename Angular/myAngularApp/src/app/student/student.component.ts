import { Component } from '@angular/core';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent {
    studentName: String="Zuhale";
    studentMark: number=550;
    joinDate: Date=new Date();
    message: String= "This is event binding";

    fontColor: string = 'blue';

    displayMessage(){
      alert(this.message)
    }
}
