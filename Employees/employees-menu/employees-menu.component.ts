import { Component, OnInit, Input } from '@angular/core';
import { EmployeeServices } from '../../Services/employeeServices';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Department } from 'src/app/Models/department';
import { JobTitle } from 'src/app/Models/jobTitle';

@Component({
  selector: 'empmenu',
  templateUrl: './employees-menu.component.html',
  styleUrls: ['../../app.component.css', 'employees-menu.component.css']
})

export class EmpMenuBar implements OnInit {

    constructor(private employeeData: EmployeeServices) {}

    @Input() departments: Department[];
    private roles: string[] = [];
    private newEmployeeForm: FormGroup;
    private validMessage: string = "";
    private showNewEmployee = false;

    private jobTitles: JobTitle[] = [];
    departmentSelection(dep: string) {

      for(let d of this.departments) {
        if (d.departmentName == dep) {
          this.jobTitles = d.jobTitles;
        }
      }
    }

    ngOnInit() {
      this.newEmployeeForm = new FormGroup({
        name: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
        
        phoneNumber: new FormControl('', Validators.required),
        department: new FormControl('', Validators.required),
        jobTitle: new FormControl('', Validators.required),

        holidayQuota: new FormControl('20', Validators.required),

        contact: new FormControl()
      });
    }

    toggleShowNewEmployee() { this.showNewEmployee = !this.showNewEmployee;}

    newEmployee() {
      console.log(this.newEmployeeForm.value);
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