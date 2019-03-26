import { Component, OnInit } from '@angular/core';
import { DepartmentServices } from "../Services/departmentServices";
import { FilterPipe } from 'ngx-filter-pipe';
import { Department } from '../Models/department';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    templateUrl: 'departments.component.html',
    providers: [DepartmentServices],
    styleUrls: ['../app.component.css', 'departments.component.css']
  })

export class DepartmentsComponent implements OnInit {

    constructor (private departmentData: DepartmentServices, private filterPipe: FilterPipe) {}

    public departments: Department[] = [];
    editDepartmentForm: FormGroup;
    showEditDepartment: boolean = false;
    editThisDepartment: number = 0;

    toggleEditDepartment(id: number) { this.showEditDepartment = !this.showEditDepartment; this.editThisDepartment = id; }

    ngOnInit(): void {
        this.departmentData.loadAllDepartments()
            .subscribe(success => {
              if (success) {
                this.departments = this.departmentData.departments;
                console.log(this.departments);
              }
            });

          this.editDepartmentForm = new FormGroup({
      
              departmentId: new FormControl('', Validators.required),
              departmentName: new FormControl('', Validators.required)
            }); 
        }

        editDepartment(id: number) {

          this.editDepartmentForm.get('departmentId').setValue(id);
          
          this.departmentData.updateDepartment(this.editDepartmentForm.value);
          location.reload();
        }

}