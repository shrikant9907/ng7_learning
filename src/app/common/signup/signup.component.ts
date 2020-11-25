import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  
  pageTitle: string;

  SignupForm: FormGroup;
  submitted = false;
  signupSuccess = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { 
    this.pageTitle = "Sign Up";
  }

  ngOnInit(): void {

    // Add Class in body
    document.getElementsByTagName('body')['0'].classList.add('signup-page');

    // Form Group
    this.SignupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

  }

  onSubmit(event) {
    event.preventDefault();

    this.submitted = true;

    if(this.SignupForm.invalid)
      return;

    let email = this.SignupForm.controls.email.value;
    let password = this.SignupForm.controls.password.value;

    if(this.authService.signup(email, password)) {
      this.signupSuccess = true;
      this.router.navigate(['/dashboard']);
    } 
    
  }

  onKeyUp() {

    if(this.SignupForm.invalid)
      return;

    let email = this.SignupForm.controls.email.value;
    let password = this.SignupForm.controls.password.value;
    if(email && password) {
      this.submitted = false;
      this.signupSuccess = false;
    }

  }


  ngOnDestroy(): void {

      // Remove Class in body
      document.getElementsByTagName('body')['0'].classList.remove('signup-page');

  }

}