import { Component, NgZone } from '@angular/core';
import { AuthServices } from '../Auth/authServices';
import { Router, ActivatedRoute } from '@angular/router'


@Component({
    selector: "login",
    templateUrl: "login.component.html",
    styleUrls: ['../app.component.css']
})

export class Login {

    constructor(private route: ActivatedRoute, private authServices: AuthServices, private router: Router, private ngZone: NgZone) { }

    errorMessage: string = "";
    returnUrl: string;
    private isLoggedIn: boolean;
    public creds = {
        UserName: "",
        Password: ""
    };

    ngOnInit() {
        
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['Home'] || '/';
    }

    onLogin() {
        this.authServices.login(this.creds)
        .subscribe(success => {
            if (success) {
                //window.location.href = "/Home";
                this.isLoggedIn = true;
                //this.router.navigate(["Home"]);
            } else {
                window.location.href = "";
                //this.router.navigate([""]);
            }

        }, err => this.errorMessage = "Failed to Login.")
    }

}