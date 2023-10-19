import { FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {
  registerForm = this.formBuilder.group({
    name: ['', Validators.required],
    lastname: ['', Validators.required],
    age: ['', Validators.required],
    email: ['localizamos@gmail.com', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16), Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}|:"<>?]).*$')]]
  })

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  get name() { return this.registerForm.controls.name; }
  get lastname() { return this.registerForm.controls.lastname; }
  get age() { return this.registerForm.controls.age; }
  get email() { return this.registerForm.controls.email; }
  get password() { return this.registerForm.controls.password; }

  register() {
    if (this.registerForm.valid) {
      console.info('Complete');
      const userInfo = {
        email: this.registerForm.controls.email.value,
        password: this.registerForm.controls.password.value
      };
      localStorage.setItem("infoUserRegister", JSON.stringify(userInfo));
      this.router.navigateByUrl('/login');
      this.registerForm.reset();
    }
    else {
      this.registerForm.markAllAsTouched();
    }
  }


}
