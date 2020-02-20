import { Component, OnInit, Input } from '@angular/core';
import { EmpMenuBar } from '../Employees/employees-menu/employees-menu.component'
import { EmployeeServices } from "../Services/employeeServices";
import { DepartmentServices } from '../Services/departmentServices';
import { Employee } from "../Models/employee";
import { Department } from '../Models/department';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { FilterPipe } from 'ngx-filter-pipe';
import { JobTitle } from '../Models/jobTitle';

@Component({
  selector: 'employees-list',
  templateUrl: 'employees.component.html',
  providers: [EmployeeServices, EmpMenuBar],
  styleUrls: ['../app.component.css', 'employees.component.css'],
})


export class EmployeesListComponent implements OnInit {

  constructor(private employeeData: EmployeeServices, private departmentData: DepartmentServices, private filterPipe: FilterPipe,) { }

  @Input() dep: string;
  //queryParams: { [k: string]: any; };

  public employees: Employee[] = [];
  public departments: Department[] = [];
  private jobTitles: JobTitle[] = [];

  public oldEmployee: any;

  editThisEmployee: number = 0;
  editThisEmployeename: string;
  showEditEmployee = false;

  private _departmentFilter: string = "";
  private _employeeFilter: any = { name: '' };

  editEmployeeForm: FormGroup;

  departmentSelection(dep: string) {

    for (let d of this.departments) {
      if (d.departmentName == dep) {
        this.jobTitles = d.jobTitles;
      }
    }
  }

  departmentFilter(dep: string) {
    this._departmentFilter = dep;
  }

  // showEditEmployee - shows the input fields.
  // this.departmentSelection(dep) - loads the jobTitles to <select>.
  toggleEditEmployee(id: number, dep: string) {
    this.showEditEmployee = !this.showEditEmployee;
    this.editThisEmployee = id;
    this.departmentSelection(dep);
  }

  ngOnInit(): void {
    this.employeeData.loadEmployees()
      .subscribe(success => {
        if (success) {
          this.employees = this.employeeData.employees;
        }

        this.departmentData.loadAllDepartments()
          .subscribe(success => {
            if (success) {
              this.departments = this.departmentData.departments;
              this._departmentFilter = this.departments[0].departmentName;
            }
          });
      });

    this.editEmployeeForm = new FormGroup({

      employeeId: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      email: new FormControl(''),
      phoneNumber: new FormControl(''),
      department: new FormControl('', Validators.required),
      jobTitle: new FormControl('', Validators.required),
      holidayQuota: new FormControl('', Validators.required)
    });

    console.log(this.dep);
    if (this.dep != "") {
      this.departmentFilter(this.dep);
    }
  }

  deleteEmployee(id: number): void {
    this.employeeData.deleteEmployee(id);
    location.reload();
  }

  editEmployee(id: number) {

    this.employeeData.loadSingleEmployee(id)
      .subscribe(success => {
        if (success) {
          this.oldEmployee = this.employeeData.singleEmployee;

          this.editEmployeeForm.get('employeeId').setValue(id);

          if (this.editEmployeeForm.get('name').value == "") {
            this.editEmployeeForm.get('name').setValue(this.oldEmployee.name);
          }

          if (this.editEmployeeForm.get('department').value == "") {
            this.editEmployeeForm.get('department').setValue(this.oldEmployee.department);
          }

          if (this.editEmployeeForm.get('jobTitle').value == "") {
            this.editEmployeeForm.get('jobTitle').setValue(this.oldEmployee.role);
          }

          if (this.editEmployeeForm.get('holidayQuota').value == "") {
            this.editEmployeeForm.get('holidayQuota').setValue(this.oldEmployee.holidayQuota);
          }

          this.employeeData.updateEmployee(this.editEmployeeForm.value);
          location.reload();
        }
      });

  }
}
