import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../Services/api.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  showAlert: boolean = true;
  data: any[] = [];

  constructor(private apiService: ApiService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getListCourse();

    setTimeout(() => {
      this.showAlert = false;
    }, 1000);
  }

  openModal(content: any) {
    this.modalService.open(content, { centered: true }); // Abre el modal
  }

  // Pagination
  dataElements: any[] = [];
  pageSize = 6;
  pageIndex = 0;

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
  }

  getListCourse() {
    this.apiService.queryGet('courses').subscribe((res: any) => {
      this.data = res.data;
      this.dataElements = this.data;
    });
  }

  getStatusCard() {
  }
}
