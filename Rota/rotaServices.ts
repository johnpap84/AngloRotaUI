import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from "rxjs/operators";
import { RotaModel } from './rotaModel';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable()
export class RotaServices {

    private rotaUrl = 'https://localhost:44344/api/rota';
    private azureUrl = 'https://anglorota.azurewebsites.net/api/rota';
    public rota: RotaModel[] = [];
    
    constructor(private http: HttpClient) { }

    loadRotaAll(): Observable<boolean> {

        return this.http.get<RotaModel[]>(this.rotaUrl)
        .pipe(
          //tap(data => console.log('All: ' + JSON.stringify(data))),
          map((data: any[]) => {
            this.rota = data;
            return true;
          }));
      }
}