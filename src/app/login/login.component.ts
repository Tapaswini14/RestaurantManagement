import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatTabsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {
  registerForm!: FormGroup;
  loginForm!: FormGroup;
  signUpUsers: any[] = [];
  loginUsers: any[] = [];
  submitted: boolean = false;

  constructor(private router: Router,private formBuilder: FormBuilder,private formBuilder1: FormBuilder
    ){}

  ngOnInit(): void {
    const storedData = localStorage.getItem('signUpUsers');
  this.signUpUsers = storedData ? JSON.parse(storedData) : [];
    this.registerForm = this.formBuilder.group({
      user_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.loginForm = this.formBuilder1.group({
      user_name: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }


  onRegister() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      this.signUpUsers.push(formData); // Push new data to the array
      localStorage.setItem('signUpUsers', JSON.stringify(this.signUpUsers));
      console.log('Form submitted successfully!');
    } else {
      console.log('Form is invalid!');
    }
  }

  onLogin() {
    if (!this.loginForm.valid) {
      const enteredUsername = this.loginForm.value.user_name;
      const enteredPassword = this.loginForm.value.password;
  
      // Retrieve user data from localStorage
      const storedData = localStorage.getItem('signUpUsers');
      this.signUpUsers = storedData ? JSON.parse(storedData) : [];
  
      // Find user with matching username and password
      const user = this.signUpUsers.find(u => u.user_name === enteredUsername && u.password === enteredPassword);
  
      if (user) {
        console.log('Login successful!');
        this.router.navigate(['/products']);
        // Perform additional actions such as redirecting to a dashboard or setting a session
      } else {
        console.log('Invalid username or password!');
      }
    } else {
      console.log('Form is invalid!');
    }
  }
}
