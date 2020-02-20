import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { Employee } from '../Models/employee';
import { map, catchError, tap } from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class EmployeeServices {

  private employeesUrl = 'https://localhost:44344/api/employees';
  private azureUrl = 'https://anglorota.azurewebsites.net/api/employees';
  public employees: Employee[] = [];
  public singleEmployee: any;

  constructor(private http: HttpClient) { }

  loadEmployees(): Observable<boolean> {

    return this.http.get<Employee[]>(this.employeesUrl)
      .pipe(
        //tap(data => console.log('All: ' + JSON.stringify(data))),
        map((data: any[]) => {
          this.employees = data;
          return true;
        }));
  }

  loadSingleEmployee(id: number): Observable<boolean> {
    return this.http.get<Employee>(this.employeesUrl + '/' + id)
      .pipe(
        //tap(data => console.log('Old Employee: ' + JSON.stringify(data))),
        map((data: any) => {
          this.singleEmployee = data;
          return true;
        })
      );
  }

  loadEmployeesByDepartment(departmentId: number) {
    return this.http.get<Employee>(this.employeesUrl + '/' + departmentId)
      .pipe(
        //tap(data => console.log('Old Employee: ' + JSON.stringify(data))),
        map((data: any) => {
          this.employees = data;
          return true;
        })
      );
  }

  updateEmployee(employee: any) {

    let body = JSON.stringify(employee);
    return this.http.patch<Employee>(this.employeesUrl, body, httpOptions)
      .subscribe(
        result => console.log(result),
        err => console.error(err));
  }

  addEmployee(employee: Employee): Observable<Employee> {

    let body = JSON.stringify(employee);
    console.log(body);
    return this.http.post<Employee>(this.employeesUrl, body, httpOptions);

  }

  deleteEmployee(id: number) {
    this.http.delete(this.employeesUrl + '/' + id, httpOptions)
      .subscribe(
        result => console.log(result),
        err => console.error(err)
      );
  }


}
