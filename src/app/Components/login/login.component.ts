import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  loginForm = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16), Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}|:"<>?]).*$')]]
  })

  constructor(private formBuilder: FormBuilder, private router:Router, private authService: AuthService) { }

  get email() { return this.loginForm.controls.email; }
  get password() { return this.loginForm.controls.password; }

  login() {
    if (this.loginForm.valid) {
      let dataStorage = JSON.parse(localStorage.getItem('infoUserRegister') || 'null');
      let dataLogin = this.loginForm.value;
      if (dataLogin.email === dataStorage.email && dataLogin.password === dataStorage.password) {
        localStorage.setItem("infoUser", JSON.stringify(this.loginForm.value));
        this.authService.setAuthenticated(true);
        this.router.navigateByUrl('/home');
        this.loginForm.reset();
        console.log('Login Success');
      }
    }
    else {
        this.loginForm.markAllAsTouched();
      }
  };
};
