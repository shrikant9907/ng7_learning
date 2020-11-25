import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  pageTitle: string;

  LoginForm: FormGroup;
  submitted = false;
  loginSuccess = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { 
    this.pageTitle = "Login";
  }

  ngOnInit(): void {

    // Add Class in body
    document.getElementsByTagName('body')['0'].classList.add('login-page');

    // Form Group
    this.LoginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

  }

  onSubmit(event) {
    event.preventDefault();

    this.submitted = true;

    if(this.LoginForm.invalid)
      return;

    let email = this.LoginForm.controls.email.value;
    let password = this.LoginForm.controls.password.value;
    
    if(this.authService.authenticate(email, password)) {
      this.loginSuccess = true;
      this.router.navigate(['/dashboard']);
      console.log("login success..");
    } 
    
  }

  onKeyUp() {

    if(this.LoginForm.invalid)
      return;

    let email = this.LoginForm.controls.email.value;
    let password = this.LoginForm.controls.password.value;
    if(email && password) {
      this.submitted = false;
      this.loginSuccess = false;
    }

  }


  ngOnDestroy(): void {

      // Remove Class in body
      document.getElementsByTagName('body')['0'].classList.remove('contact-page');

  }

}