import { Component, OnInit } from '@angular/core';
import { FilterPipe } from 'ngx-filter-pipe';
import { Shift } from '../Models/shift';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ShiftServices } from '../Services/shiftServices';

@Component({
  templateUrl: 'shift.component.html',
  providers: [ShiftServices],
  styleUrls: ['../app.component.css', 'shift.component.css']
})

export class ShiftComponent implements OnInit {

  constructor(private shiftData: ShiftServices, private filterPipe: FilterPipe) { }

  public shifts: Shift[] = [];
  editShiftForm: FormGroup;
  showEditShift: boolean = false;
  editThisShift: number = 0;

  toggleEditDepartment(id: number) { this.showEditShift = !this.showEditShift; this.editThisShift = id; }

  ngOnInit(): void {
    this.shiftData.loadAllShift()
      .subscribe(success => {
        if (success) {
          this.shifts = this.shiftData.shifts;
        }
      });

    this.editShiftForm = new FormGroup({

      shiftId: new FormControl('', Validators.required),
      shiftName: new FormControl('', Validators.required),
      shiftDurationInMins: new FormControl('', Validators.required)
    });
  }

  editDepartment(id: number) {

    this.editShiftForm.get('shiftId').setValue(id);

    this.shiftData.updateShift(this.editShiftForm.value);
    location.reload();
  }

  deleteDepartment(id: number): void {
    this.shiftData.deleteShift(id);
    location.reload();
  }

}
