import { Component, OnInit, Input } from '@angular/core';
import { DepartmentServices } from 'src/app/Services/departmentServices';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'depmenu',
  templateUrl: './departments-menu.component.html',
  styleUrls: ['../../app.component.css', 'departments-menu.component.css']
})

export class DepartmentsMenu implements OnInit {

    constructor(private departmentData: DepartmentServices) {}

    //@Input() departments: Department[];
    //private roles: string[] = [];
    private newDepartmentForm: FormGroup;
    private validMessage: string = "";
    private showNewDepartment = false;


    ngOnInit() {
      this.newDepartmentForm = new FormGroup({
        departmentName: new FormControl('', Validators.required),

        contact: new FormControl()
      });
    }

    toggleShowNewDepartment() { this.showNewDepartment = !this.showNewDepartment;}

    newDepartment() {
      console.log(this.newDepartmentForm.value);
      if (this.newDepartmentForm.valid) {
        this.validMessage = "New employee has been added to the Database.";
        
        this.departmentData.addDepartment(this.newDepartmentForm.value)
          .subscribe(data => {
            this.newDepartmentForm.reset();
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