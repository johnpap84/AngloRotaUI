import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable, throwError, BehaviorSubject, Subject } from 'rxjs';
import { Employee } from '../Models/employee';
import { map, catchError, tap } from "rxjs/operators";
import { Department } from "../Models/department";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable()
export class DepartmentServices {

    private departmentUrl = 'https://localhost:44344/api/department';
    public departments: Department[] = [];

    constructor(private http: HttpClient) { }


    loadAllDepartments(): Observable<boolean> {

        return this.http.get<Employee[]>(this.departmentUrl)
        .pipe(
          map((data: any[]) => {
            this.departments = data;
            return true;
          }));
      }

    updateDepartment(dep: Department) {
      
        let body = JSON.stringify(dep);
        return this.http.patch<Department>(this.departmentUrl, body, httpOptions)
        .subscribe(
          result => console.log(result),
           err => console.error(err));

    }

    addDepartment(newDepartment: Department): Observable<Department> {

      let body = JSON.stringify(newDepartment);
      return this.http.post<Department>(this.departmentUrl, body, httpOptions);
    }
}