import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './forms.component.2.html',
  styleUrl: './forms.component.css'
})
export class FormsComponent {
  // template-driven

  // user = {
  //   fullName: '',
  //   email: '',
  //   employeeId: '',
  //   department: '',
  //   username: '',
  //   password: '',
  //   confirmPassword: ''
  // };
  // submitted = false;

  // constructor(private userService: UserService) { }

  // onSubmit() {
  //   if (this.user.password !== this.user.confirmPassword) {
  //     alert('Passwords do not match!');
  //     return;
  //   }
  //   this.userService.registerUser(this.user).subscribe(response => {
  //     alert('Registration successful!');
  //     this.submitted = true;
  //   }, error => {
  //     console.error('Registration failed:', error);
  //     alert('Registration failed!');
  //   });
  // }



  // reactive-forms
  // registrationForm: FormGroup;
  // message: string = '';

  // constructor(private fb: FormBuilder, private userService: UserService) {
  //   this.registrationForm = this.fb.group({
  //     fullName: ['', Validators.required],
  //     email: ['', [Validators.required, Validators.email]],
  //     employeeId: ['', Validators.required],
  //     department: ['', Validators.required],
  //     username: ['', Validators.required],
  //     password: ['', [Validators.required, Validators.minLength(6)]],
  //     confirmPassword: ['', Validators.required]
  //   }, { validators: this.passwordMatchValidator });
  // }

  // ngOnInit(): void {}

  // passwordMatchValidator(form: AbstractControl): { [key: string]: boolean } | null {
  //   if (form.get('password')?.value !== form.get('confirmPassword')?.value) {
  //     return { 'mismatch': true };
  //   }
  //   return null;
  // }

  // onSubmit(): void {
  //   if (this.registrationForm.valid) {
  //     const userData = this.registrationForm.value;
  //     this.userService.registerUser(userData).subscribe(
  //       response => {
  //         this.message = 'Registration successful!';
  //         this.registrationForm.reset();
  //       },
  //       error => {
  //         this.message = 'Registration failed. Please try again.';
  //         console.error('Registration failed:', error);
  //       }
  //     );
  //   } else {
  //     this.message = 'Form is not valid. Please check the fields.';
  //   }
  // }



  registrationForm: FormGroup = this.fb.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    employeeId: ['', Validators.required],
    department: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]
  }, { validators: this.passwordMatchValidator });

  message: string = '';
  messageClass: string = '';

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {}

  passwordMatchValidator(form: AbstractControl): { [key: string]: boolean } | null {
    if (form.get('password')?.value !== form.get('confirmPassword')?.value) {
      return { 'mismatch': true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      const userData = this.registrationForm.value;
      this.userService.registerUser(userData).subscribe(
        response => {
          this.message = 'Registration successful!';
          this.messageClass = 'success';
          this.registrationForm.reset();
        },
        error => {
          this.message = 'Registration failed. Please try again.';
          this.messageClass = 'error';
          console.error('Registration failed:', error);
        }
      );
    } else {
      this.message = 'Form is not valid. Please check the fields.';
      this.messageClass = 'error';
    }
  }
}
