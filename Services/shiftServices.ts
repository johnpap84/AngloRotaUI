import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable, throwError, BehaviorSubject, Subject } from 'rxjs';
import { map, catchError, tap } from "rxjs/operators";
import { Shift } from '../Models/shift';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ShiftServices {

  private shiftUrl = 'https://localhost:44344/api/shift';
  public shifts: Shift[] = [];

  constructor(private http: HttpClient) { }


  loadAllShift(): Observable<boolean> {

    console.log("load");
    return this.http.get<Shift[]>(this.shiftUrl)
      .pipe(
        map((data: any[]) => {
          this.shifts = data;
          return true;
        }));
  }

  updateShift(shift: Shift) {

    let body = JSON.stringify(shift);
    return this.http.patch<Shift>(this.shiftUrl, body, httpOptions)
      .subscribe(
        result => console.log(result),
        err => console.error(err));

  }

  addShift(newShift: Shift): Observable<Shift> {

    let body = JSON.stringify(newShift);
    //console.log(newShift);
    return this.http.post<Shift>(this.shiftUrl, body, httpOptions);
  }

  deleteShift(id: number) {
    this.http.delete(this.shiftUrl + '/' + id, httpOptions)
      .subscribe(
        result => console.log(result),
        err => console.error(err));
  }
}
