import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Course } from 'src/app/Interfaces/course';
import { CourseService } from 'src/app/Services/course.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  showAlert: boolean = true;
  listCardData: Course[] = [];

  constructor(private courseService: CourseService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.getListCourse();

    setTimeout(() => {
      this.showAlert = false;
    }, 1000);

  }

  openModal(content: any) {
    this.modalService.open(content, { centered: true }); // Abre el modal
  }

  getListCourse() {
    this.courseService.getListCourses().subscribe((data) => {
      console.log(data);
    })
  }

  // Pagination
  dataElements: any[] = [];
  pageSize = 0;
  pageIndex = 0;

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
  }

}
