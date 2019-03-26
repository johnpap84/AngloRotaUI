import { Component, OnInit } from '@angular/core';
import { FilterPipe } from 'ngx-filter-pipe';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { JobTitle } from '../Models/jobTitle';
import { JobTitleServices } from '../Services/jobTitleServices';
import { DepartmentServices } from '../Services/departmentServices';
import { Department } from '../Models/department';

@Component({
    templateUrl: 'jobTitles.component.html',
    providers: [JobTitleServices],
    styleUrls: ['../app.component.css', 'jobTitles.component.css']
  })

export class JobTitlesComponent implements OnInit {

    constructor (private jobTitleData: JobTitleServices, private departmentsData: DepartmentServices, private filterPipe: FilterPipe) {}

    private jobTitles: JobTitle[] = [];
    private departments: Department[] = [];
    editJobTitleForm: FormGroup;
    showEditJobTitle: boolean = false;
    editThisJobTitle: number = 0;

    toggleEditJobTitle(id: number) { this.showEditJobTitle = !this.showEditJobTitle; this.editThisJobTitle = id; }

    ngOnInit(): void {
        this.jobTitleData.loadAllJobTitles()
            .subscribe(success => {
              if (success) {
                this.jobTitles = this.jobTitleData.jobTitles;
              }
            });

        this.departmentsData.loadAllDepartments()
            .subscribe(success => {
              if (success) {
                this.departments = this.departmentsData.departments;
              }
            });

          this.editJobTitleForm = new FormGroup({
      
              id: new FormControl('', Validators.required),
              jobTitleName: new FormControl('', Validators.required),
              inDepartment: new FormControl('', Validators.required)
            }); 
        }

        editJobTitle(id: number) {

          this.editJobTitleForm.get('id').setValue(id);
          
          this.jobTitleData.updateJobTitle(this.editJobTitleForm.value);
          //location.reload();
        }

        deleteJobTitle(id: number): void {
            this.jobTitleData.deleteJobTitle(id);
            location.reload();
          }

}