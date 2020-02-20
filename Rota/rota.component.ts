import { Component } from '@angular/core';
import { EmployeeServices } from '../Services/employeeServices';
import { RotaServices } from '../Services/rotaServices';
import { DepartmentServices } from '../Services/departmentServices';

import { Employee } from '../Models/employee';
import { RotaModel } from './../Models/rotaModel';
import { Department } from '../Models/department';
import { JobTitle } from '../Models/jobTitle';


@Component({
  selector: 'rota',
  templateUrl: 'rota.component.html',
  providers: [EmployeeServices, RotaServices],
  styleUrls: ['../app.component.css', './rota.component.css']
})

export class RotaModule {

  constructor(private employeeData: EmployeeServices, private rotaData: RotaServices, private departmentData: DepartmentServices) { }

  public employees: Employee[] = [];
  public rota: RotaModel[] = [];
  private rotaChangeLog: RotaModel[] = [];
  public departments: Department[] = [];
  public jobTitles: JobTitle[] = [];

  public rotaArray: string[][] = new Array(new Array());

  public days = Array(new Date(2020, 2, 0).getDate()).fill(0).map((x, i) => i + 1);
  private weekdays: string[] = new Array();
  private weekdaysArray: string[] = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  private monthArray: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  public loadDepartmentId: number;
  public _jobTitleFilter;
  private employeeTotalHours: string[] = new Array();

  ngOnInit(): void {
    this.departmentData.loadAllDepartments()
      .subscribe(success => {
        if (success) {
          this.departments = this.departmentData.departments;
          console.log(this.departments);
          this.loadDepartment(2);
        }
      });
  }

  loadDepartment(departmentId: number) {

    let departmentToLoad: Department = this.departments.find(d => d.departmentId == departmentId);
    var employeeIds: number[] = [];
    this.jobTitles = departmentToLoad.jobTitles;

    this.employeeData.loadEmployeesByDepartment(departmentToLoad.departmentId)
      .subscribe(success => {
        if (success) {
          this.employees = this.employeeData.employees;

          this.employees.forEach(function (f) {
            employeeIds.push(f.employeeId);
          });
        }
      });

    let date: Date = new Date();
    this.rotaData.loadRotaDepartment(departmentToLoad.departmentId, Date.now())
      .subscribe(success => {
        if (success) {
          this.rota = this.rotaData.rota;

          let shiftArray = new Array();
          let hoursArray: number[] = new Array();
          for (var i: number = 0; i <= this.employees.length - 1; i++) {
            shiftArray[employeeIds[i]] = new Array();
            var shiftInMinutes: number = 0;

            for (let d: number = 1; d <= this.days.length; d++) {
              let day: string = (d < 10) ? "0" + d : d.toString();
              let dateString = '2020-02-' + day + 'T00:00:00'
              var rotaFound: RotaModel = this.rota.find(e => e.employeeId == employeeIds[i] && e.date == dateString);
              if (rotaFound != null) {
                shiftArray[employeeIds[i]][d] = rotaFound.shiftName;
                shiftInMinutes += rotaFound.durationInMins;
              }
            }
            if (shiftInMinutes > 0) {
              hoursArray[employeeIds[i]] = shiftInMinutes;
              this.employeeTotalHours[employeeIds[i]] = shiftInMinutes / 60 + 'h';
            } else {
              hoursArray[employeeIds[i]] = 0;
            }
          }
          this.rotaArray = shiftArray;
        }
      });


    for (let i: number = 1; i < this.days.length + 1; i++) {
      let date = new Date('02/' + i + '/2020');
      this.weekdays[i] = this.weekdaysArray[date.getDay()];
    }
  }

  filterJobTitles() { return this.jobTitles.filter(j => j.employeesInJob.length > 0); }

  saveRotaData(employeeId: number, day: number, shift: string) {

    if (this.rotaArray[employeeId][day] != shift && (this.rotaArray[employeeId][day] != null || shift.length != 0)) {
      
      let changedRota: RotaModel = new RotaModel();
      changedRota.employeeId = employeeId;
      changedRota.date = '2020-02-' + day + 'T00:00:00'
      changedRota.shiftName = shift;
      this.rotaChangeLog.push(changedRota)
    }
  }

  saveRotaChanges() {
    //this.rotaData.addMultiRotaData(this.rotaChangeLog);
  }


}

