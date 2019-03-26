import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServices } from '../Auth/authServices';

@Component({
  selector: 'menubar',
  templateUrl: './menu.bar.component.html',
  styleUrls: ['../app.component.css', 'menu.bar.component.css']
})

export class MenuBar {

  constructor(private router: Router, private authServices: AuthServices) { }

  private isLoggedIn: boolean;

  logout() {
    this.authServices.logout();
    this.isLoggedIn = false;
    this.router.navigate(['']);
  }

}