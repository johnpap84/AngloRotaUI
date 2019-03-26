import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { User } from './user';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf8' })
  };

@Injectable()
export class AuthServices {

    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) { 
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
      if (this.loginRequired)
      this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
      return this.currentUserSubject.value;
    }

    private authUrl = 'https://localhost:44344/api/auth';

    private token: string = "";
    private tokenExpiration: Date;

    public get loginRequired(): boolean {
        if (this.tokenExpiration < new Date())
        {
           return false;
        };
        return true;
    }


    public login(creds): Observable<boolean> {

        let body = JSON.stringify(creds);
        return this.http.post(this.authUrl + '/token', body, httpOptions)
          .pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            map((data: any) => {
              this.token = data.token;
              this.tokenExpiration = data.expiration;

              localStorage.setItem('currentUser', JSON.stringify(data));
              return true;
            }));
      }

    logout() {
        
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

}