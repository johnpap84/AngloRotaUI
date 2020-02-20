import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { RotaModel } from './../../Models/rotaModel';

@Component({
  selector: 'rotamenu',
  templateUrl: './rota-menu.component.html',
  styleUrls: ['../../app.component.css', 'rota-menu.component.css']
})

export class RotaMenu implements OnInit, OnChanges {

  constructor() { }

  @Input() rota: RotaModel[];

  totalHours: string;
  totalHolidays: number;
  totalSickdays; number;

  ngOnInit(): void {
  }

  ngOnChanges(): void {

    let _totalMinutes: number = 0;
    let _totalHolidays: number = 0;
    let _totalSickdays: number = 0;
    for (let i: number = 0; i < this.rota.length; i++) {
      _totalMinutes += this.rota[i].durationInMins;
      if (this.rota[i].shiftName == "H") {
        _totalHolidays += 1;
      }
      if (this.rota[i].shiftName == "S") {
        _totalSickdays += 1;
      }
    }
    this.totalHours = _totalMinutes / 60 + ' Hrs';
    this.totalHolidays = _totalHolidays;
    this.totalSickdays = _totalSickdays;
  }

}
