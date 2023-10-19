import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  userLogged: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isAuthenticated$().subscribe({
      next: (userLogged) => {
        this.userLogged= userLogged;
      }
    })
  }

  logout() {
    this.authService.setAuthenticated(false);
  }

}
