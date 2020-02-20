import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './Auth/auth.guard';

import { Login } from './LogIn/login.component';
import { HomeComponent } from './Home/home.component';
import { EmployeesListComponent } from './Employees/employees.component';
import { EmpMenuBar } from './Employees/employees-menu/employees-menu.component';
import { RotaModule } from './Rota/rota.component';
import { DepartmentsComponent } from './Departments/departments.component';
import { ShiftComponent } from './Shift/shift.component';
import { JobTitlesComponent } from './JobTitles/jobTitles.component';

const routes: Routes = [

  { path: '', component: Login },
  { path: 'Home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'Employees', component: EmployeesListComponent, canActivate: [AuthGuard] },
  { path: 'Departments', component: DepartmentsComponent, canActivate: [AuthGuard] },
  { path: 'JobTitles', component: JobTitlesComponent, canActivate: [AuthGuard] },
  { path: 'EmployeesMenu', component: EmpMenuBar, canActivate: [AuthGuard] },
  { path: 'RotaModule', component: RotaModule, canActivate: [AuthGuard] },
  { path: 'Shifts', component: ShiftComponent, canActivate: [AuthGuard] }

];

export const routing = RouterModule.forRoot(routes, {
  useHash: false,
  enableTracing: false
});
