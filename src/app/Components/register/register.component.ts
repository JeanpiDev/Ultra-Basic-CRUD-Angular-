import { FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {
  registerForm = this.formBuilder.group({
    name: ['', Validators.required],
    edad: ['', Validators.required],
    email: ['localizamos@gmail.com', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16), Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}|:"<>?]).*$')]]
  })

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService) { }

  get name() { return this.registerForm.controls.name; }
  get age() { return this.registerForm.controls.edad; }
  get email() { return this.registerForm.controls.email; }
  get password() { return this.registerForm.controls.password; }

  register() {
    if (this.registerForm.valid) {
      this.apiService.queryPost('users', this.registerForm.value).subscribe(response => {
        this.router.navigateByUrl('/login');
        this.registerForm.reset();
      })
    }
    else {
      this.registerForm.markAllAsTouched();
    }
  }


}
