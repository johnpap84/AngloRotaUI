import { Component, OnInit } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations'
import { DepartmentServices } from 'src/app/Services/departmentServices';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'depmenu',
  templateUrl: './departments-menu.component.html',
  styleUrls: ['../../app.component.css', 'departments-menu.component.css'],
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
        this.validMessage = "Department created.";
        
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
