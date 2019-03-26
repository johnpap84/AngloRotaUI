import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { JobTitleServices } from 'src/app/Services/jobTitleServices';
import { JobTitle } from 'src/app/Models/jobTitle';
import { DepartmentServices } from 'src/app/Services/departmentServices';
import { Department } from 'src/app/Models/department';

@Component({
  selector: 'jobmenu',
  templateUrl: './jobTitles-menu.component.html',
  styleUrls: ['../../app.component.css', 'jobTitles-menu.component.css']
})

export class JobTitlesMenu implements OnInit {

    constructor(private jobTitlesData: JobTitleServices) {}

    //@Input() jobTitles: JobTitle[];
    @Input() departments: Department[];
    private newJobTitleForm: FormGroup;
    private validMessage: string = "";
    private showNewJobTitle = false;


    ngOnInit() {
      this.newJobTitleForm = new FormGroup({
        jobTitleName: new FormControl('', Validators.required),
        inDepartment: new FormControl('', Validators.required),

        contact: new FormControl()
      });
    }

    toggleShowNewJobTitle() { this.showNewJobTitle = !this.showNewJobTitle;}

    newJobTitle() {
      console.log(this.newJobTitleForm.value);
      if (this.newJobTitleForm.valid) {
        this.validMessage = "New employee has been added to the Database.";
        
        this.jobTitlesData.addJobTitle(this.newJobTitleForm.value)
          .subscribe(data => {
            this.newJobTitleForm.reset();
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