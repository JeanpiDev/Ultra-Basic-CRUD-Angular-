import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';
import { AuthService } from 'src/app/Services/auth.service';
import { UserDataService } from 'src/app/Services/user-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  showAlert: boolean = false;

  loginForm = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16), Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}|:"<>?]).*$')]]
  })

  constructor(
    private formBuilder: FormBuilder,
    private router:Router,
    private authService: AuthService,
    private apiService: ApiService,
    private userDataService: UserDataService) { }

  get email() { return this.loginForm.controls.email; }
  get password() { return this.loginForm.controls.password; }

  login() {
    if (this.loginForm.valid) {
      this.apiService.login({email:this.loginForm.value.email || 'null', password: this.loginForm.value.password || 'null' }).subscribe(response => {
        this.authService.setLoggedIn(true);
        this.userDataService.setUser(response.user);
        this.router.navigateByUrl('/home');
        this.loginForm.reset();
        localStorage.setItem('token', response.token);
      });
    } else {
      this.loginForm.markAllAsTouched();
      this.showAlert = true;
    }
  }
}
