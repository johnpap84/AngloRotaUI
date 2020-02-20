import { Component, OnInit } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations'
import { ShiftServices } from 'src/app/Services/shiftServices';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'shiftmenu',
  templateUrl: './shift-menu.component.html',
  styleUrls: ['../../app.component.css', 'shift-menu.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(-20%)' }),
        animate('500ms ease-in', style({ transform: 'translateY(0%)', opacity: '100' }))
      ]),
      transition(':leave', [
        animate('500ms ease-in', style({ transform: 'translateX(-100%)', opacity: '0' }))
      ])
    ])
  ]
})

export class ShiftMenu implements OnInit {

  constructor(private shiftData: ShiftServices) { }

  private newShiftForm: FormGroup;
  private validMessage: string = "";
  private showNewShift = false;


  ngOnInit() {
    this.newShiftForm = new FormGroup({
      shiftName: new FormControl('', Validators.required),
      shiftDurationInMins: new FormControl('', Validators.required),
      contact: new FormControl()
    });
  }

  toggleShowNewShift() { this.showNewShift = !this.showNewShift; }

  newShift() {
    if (this.newShiftForm.valid) {
      this.validMessage = "Shift is created.";

      this.shiftData.addShift(this.newShiftForm.value)
        .subscribe(data => {
          this.newShiftForm.reset();
          location.reload();
          return true;
        },
          error => { return Observable.throw(error); }
        )
    } else {
      this.validMessage = "Failed to add new Shift to the Database.";
    }
  }

}
