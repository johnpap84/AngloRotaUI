import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable, throwError, BehaviorSubject, Subject } from 'rxjs';
import { map, catchError, tap } from "rxjs/operators";
import { JobTitle } from '../Models/jobTitle';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable()
export class JobTitleServices {

    private jobTitleUrl = 'https://localhost:44344/api/jobtitle';
    public jobTitles: JobTitle[] = [];

    constructor(private http: HttpClient) { }


    loadAllJobTitles(): Observable<boolean> {

        return this.http.get<JobTitle[]>(this.jobTitleUrl)
        .pipe(
          map((data: any[]) => {
            this.jobTitles = data;
            return true;
          }));
      }

    updateJobTitle(job: JobTitle) {
      
        let body = JSON.stringify(job);
        return this.http.patch<JobTitle>(this.jobTitleUrl, body, httpOptions)
        .subscribe(
          result => console.log(result),
           err => console.error(err));

    }

    addJobTitle(newJobTitle: JobTitle): Observable<JobTitle> {

      let body = JSON.stringify(newJobTitle);
      console.log(newJobTitle);
      return this.http.post<JobTitle>(this.jobTitleUrl, body, httpOptions);
    }

    deleteJobTitle(id: number) {
      this.http.delete(this.jobTitleUrl + '/' + id, httpOptions)
        .subscribe(
         result => console.log(result),
          err => console.error(err));   
    } 
}