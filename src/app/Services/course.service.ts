import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Course } from '../Interfaces/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/api/Courses/';
  }

  getListCourses(): Observable<Course[]> {
    return this.http.get<Course[]>('${this.myAppUrl}${this.myApiUrl}');
  }
}
