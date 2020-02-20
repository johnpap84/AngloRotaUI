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
  private isToolsMenuVisible: boolean = false;
  private isToolsMenuIn: boolean = false;

  logout() {
    this.authServices.logout();
    this.isLoggedIn = false;
    this.router.navigate(['']);
  }

  showToolsMenu() {
    this.isToolsMenuVisible = true;
  }

  hideToolsMenu() {
    setTimeout(() => this.isToolsMenuVisible = false, 1000)
  }

  showToolsMenuIn() {
    this.isToolsMenuIn = true;
  }

  hideToolsMenuOut() {
    setTimeout(() => this.isToolsMenuIn = false, 1000)
  }
  

}
