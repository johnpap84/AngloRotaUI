import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from "rxjs/operators";
import { RotaModel } from './../Models/rotaModel';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class RotaServices {

  private rotaUrl = 'https://localhost:44344/api/rota';
  private azureUrl = 'https://anglorota.azurewebsites.net/api/rota';
  public rota: RotaModel[] = [];


  constructor(private http: HttpClient) { }

  loadRotaDepartment(dep: number, date: number): Observable<boolean> {

    //let body = JSON.stringify(dep, date);
    return this.http.get<RotaModel[]>(this.rotaUrl + '/' + dep + '/' + (date/1000).toFixed(0))
      .pipe(
        //tap(data => console.log('All: ' + JSON.stringify(data))),
        map((data: any[]) => {
          this.rota = data;
          return true;
        }));
  }

  addMultiRotaData(rotaData: RotaModel) {

    let body = JSON.stringify(rotaData);
    //console.log(body);
    //console.log(httpOptions);
    return this.http.patch<RotaModel>(this.rotaUrl, body, httpOptions)
      .subscribe(
        result => console.log(result),
        err => console.error(err));
  }

  updateEmployee(employee: any) {

    let body = JSON.stringify(employee);
    return this.http.patch<RotaModel>(this.rotaUrl, body, httpOptions)
      .subscribe(
        result => console.log(result),
        err => console.error(err));
  }
}
