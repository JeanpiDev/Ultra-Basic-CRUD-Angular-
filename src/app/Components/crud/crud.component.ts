import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {
  showAlert: boolean = false;

  createForm = this.formBuilder.group({
    image: ['', Validators.required],
    title: ['', [Validators.required, Validators.maxLength(50)]],
    description: ['', [Validators.required, Validators.maxLength(100)]],
    status: ['', Validators.required]
  })

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  get image() { return this.createForm.controls.image; }
  get title() { return this.createForm.controls.title; }
  get description() { return this.createForm.controls.description; }
  get status() { return this.createForm.controls.status; }

  ngOnInit(): void {
  }

  create() {
    if (this.createForm.valid) {
      this.showAlert = true;
      setTimeout(() => {
        this.showAlert = false;
      }, 2000);
      console.log(this.createForm.value);
      this.createForm.reset();
      console.log('Create Success');

    }
    else {
      this.createForm.markAllAsTouched();
    }
  };
}
