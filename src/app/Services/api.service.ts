import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl: string;

  constructor (private http: HttpClient) {
    this.apiUrl = 'http://localhost/back-laravel/public/api';
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  queryGet(route: string): Observable<any> {
    const storedToken = this.getHeaders().get('Authorization');
    if(storedToken == 'Bearer null') {
      console.log('No hay token');
    }
    return this.http.get<any>(`${this.apiUrl}/${route}`, { headers: this.getHeaders()});
  }

  // Registrar usuario
  queryPost(route: string, data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${route}`, data, { headers: this.getHeaders()});
  }

  login (credentials: {email: string, password: string}): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
  }









}

