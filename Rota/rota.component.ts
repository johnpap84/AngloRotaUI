import { Component } from '@angular/core';
import { EmployeeServices} from '../Services/employeeServices';
import { RotaServices } from './rotaServices';

import { Employee } from '../Models/employee';
import { RotaModel } from './rotaModel';


@Component({
    selector: 'rota',
    templateUrl: 'rota.component.html',
    providers: [EmployeeServices, RotaServices],
    styleUrls: ['../app.component.css', './rota.component.css']
})

export class RotaModule {
    
    constructor (private employeeData: EmployeeServices, private rotaData: RotaServices) {}

    cost = 100;
    saveCost(value){
    this.cost=value;
  }

    public employees: Employee[] = [];
    public rota: RotaModel[] = [];
    public days = Array(31).fill(0).map((x,i)=>i);
    public noOfEmp = this.employees.length;

    
    variableName = "month";
    

    ngOnInit(): void {
        
        this.employeeData.loadEmployees()
            .subscribe(success => {
              if (success) {
                this.employees = this.employeeData.employees;
                //console.log(this.employees);
              }
            });

        this.rotaData.loadRotaAll()
            .subscribe(success => {
              if (success) {
                this.rota = this.rotaData.rota;
                //console.log(this.rota);
              }
            });

            //console.log(this.rota);
           
    }

    noofemp(): number {
        return this.employees.length;
      }

    noofRota(): number {
        return this.rota.length;
      }

      giveRotaDay(empId: number, day: number): any {
        
        var rotaDay = this.rota.find(x => x.employeeId == empId && x.month == 1 && x.year == 2019 );

        if (day+1 == 1) return rotaDay.rotaDay01;
        
      }
    

}

