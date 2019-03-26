import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AuthServices } from './authServices';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    
    constructor(private router: Router, private authServices: AuthServices) { }

    canActivate() {
        const currentUser = this.authServices.currentUserValue;
        var isTokenValid = this.authServices.loginRequired;

        if (currentUser && isTokenValid) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['']);
        return false;
    }
}