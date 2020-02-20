import { Component, OnInit, Input } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations'
import { EmployeeServices } from '../../Services/employeeServices';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Department } from 'src/app/Models/department';
import { JobTitle } from 'src/app/Models/jobTitle';
import { Employee } from '../../Models/employee';

@Component({
  selector: 'empmenu',
  templateUrl: './employees-menu.component.html',
  styleUrls: ['../../app.component.css', 'employees-menu.component.css'],
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

export class EmpMenuBar implements OnInit {

  constructor(private employeeData: EmployeeServices) { }

  @Input() departments: Department[];
  @Input() employees: Employee[];
  private jobTitles: JobTitle[] = [];

  private newEmployeeForm: FormGroup;
  private validMessage: string = "";
  private showNewEmployee: boolean = false;
  private showEmployeesList: boolean = false;

  private _departmentFilter: any = { departmentId: '' };

  departmentSelection(dep: string) {
    for (let d of this.departments) {
      if (d.departmentName == dep) {
        this.jobTitles = d.jobTitles;
      }
    }
  }

  ngOnInit() {
    this.newEmployeeForm = new FormGroup({

      name: new FormControl('', Validators.required),
      email: new FormControl(''),
      phoneNumber: new FormControl(''),
      department: new FormControl('', Validators.required),
      jobTitle: new FormControl('', Validators.required),
      holidayQuota: new FormControl(20, Validators.required),

      contact: new FormControl()
    });
  }

  toggleShowNewEmployee() {

    if (this.showEmployeesList == true) {
      this.showEmployeesList = false;
      setTimeout(() => {
        this.showNewEmployee = !this.showNewEmployee;
      }, 400);
    } else {
      this.showNewEmployee = !this.showNewEmployee;
    }
  }

  toggleEmployeesList() {

    if (this.showNewEmployee == true) {
      this.showNewEmployee = false;
      setTimeout(() => {
        this.showEmployeesList = !this.showEmployeesList;
      }, 400);
    } else {
      this.showEmployeesList = !this.showEmployeesList;
    }
  }

  newEmployee() {
    console.log(this.newEmployeeForm.valid);
    if (this.newEmployeeForm.valid) {
      this.validMessage = "New employee has been added to the Database.";

      this.employeeData.addEmployee(this.newEmployeeForm.value)
        .subscribe(data => {
          this.newEmployeeForm.reset();
          location.reload();
          return true;
        },
          error => { return Observable.throw(error); }
        )
    } else {
      this.validMessage = "Failed to add new employee to the Database.";
    }
  }

}
