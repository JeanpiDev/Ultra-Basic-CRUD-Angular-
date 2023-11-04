import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  userLogged: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.isAuthenticated$().subscribe((isLoggedIn) => {
      this.userLogged = isLoggedIn;
    });
  }

  logout() {
    this.authService.setLoggedIn(false);
    localStorage.removeItem('token');
  }

}
