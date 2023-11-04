import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private user: any = [];


  setUser(data: any) {
    this.user = data;
  }

  getUser() {
    return this.user;
  }

  getUserId() {
    return this.user.id;
  }

}