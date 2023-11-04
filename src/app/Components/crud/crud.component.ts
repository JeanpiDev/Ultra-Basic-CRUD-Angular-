import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/Services/api.service';
import { UserDataService } from 'src/app/Services/user-data.service';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent {
  showAlert: boolean = false;

  createForm = this.formBuilder.group({
    id_user: [this.userDataService.getUserId(), [Validators.required]],
    name: ['', [Validators.required, Validators.maxLength(50)]],
    description: ['', [Validators.required, Validators.maxLength(100)]],
    status: [, Validators.required]
  })

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private userDataService: UserDataService,
    private homeComponent: HomeComponent) { }

  get title() { return this.createForm.controls.name; }
  get description() { return this.createForm.controls.description; }
  get status() { return this.createForm.controls.status; }

  create() {
    if (this.createForm.valid) {
      this.apiService.queryPost('courses', this.createForm.value).subscribe(response => {
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 2000);
        this.createForm.reset();
        console.log('Create Success', response);
        this.homeComponent.ngOnInit();
        });
      }
      else {
        this.createForm.markAllAsTouched();
      }
    }
  }
