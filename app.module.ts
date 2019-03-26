import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './app.routing';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { AutofocusDirective } from './Rota/autofocus.directive';
import { EditInputComponent } from './Rota/edit-input/edit-input.component';

import { EmployeeServices } from './Services/employeeServices';
import { DepartmentServices } from './Services/departmentServices'; 
import { JobTitleServices } from './Services/jobTitleServices';
import { AuthServices } from './Auth/authServices';

//// MY COMPONENTS ////
import { AppComponent } from './app.component';
import { Login } from './LogIn/login.component';
import { MenuBar } from './MenuBar/menu.bar.component';
import { HomeComponent } from './Home/home.component';
import { EmployeesListComponent } from './Employees/employees.component';
import { EmpMenuBar } from './Employees/employees-menu/employees-menu.component';
import { RotaModule } from './Rota/rota.component';
import { DepartmentsComponent } from './Departments/departments.component';
import { DepartmentsMenu } from './Departments/departments-menu/departments-menu.component';
import { JobTitlesComponent } from './JobTitles/jobTitles.component';
import { JobTitlesMenu } from './JobTitles/jobTitles-menu/jobTitles-menu.component';

@NgModule({
  declarations: [ AppComponent, EditInputComponent, AutofocusDirective, Login, MenuBar, HomeComponent, EmployeesListComponent, EmpMenuBar, 
                  DepartmentsComponent, DepartmentsMenu, JobTitlesComponent, JobTitlesMenu, RotaModule ],

  imports: [ BrowserModule, HttpClientModule, FormsModule, ReactiveFormsModule, FilterPipeModule, routing ],

  providers: [ EmployeeServices, DepartmentServices, JobTitleServices, AuthServices ],

  bootstrap: [AppComponent]
})
export class AppModule { }
