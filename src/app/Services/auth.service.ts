import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly isLoggedIn = new BehaviorSubject<boolean>(true);

  isAuthenticated$(): Observable<boolean> {
    return this.isLoggedIn;
  }
  setLoggedIn(value: boolean) {
    this.isLoggedIn.next(value);
  }
  getLoggedIn() {
    return this.isLoggedIn.value;
  }

}
