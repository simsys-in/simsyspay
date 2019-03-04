import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeCategoryComponent } from './payroll/employee-category/employee-category.component';
import { EmployeeComponent } from './payroll/employee/employee.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { AttendanceRegisterComponent } from './payroll/attendance-register/attendance-register.component';
import { LoginComponent } from './core/login/login.component';
import {LogoutComponent} from './core/logout/logout.component'
import {EmployeeListComponent} from './payroll/employee-list/employee-list.component';
import {AuthGuard} from './auth.guard';
const routes: Routes = [
  { path: 'employee_category', component: EmployeeCategoryComponent,canActivate: [AuthGuard] },
  { path: 'employee', component: EmployeeComponent,canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard] },
  { path: 'attendance_register', component: AttendanceRegisterComponent,canActivate: [AuthGuard] },
  { path: 'payroll/employee-list', component: EmployeeListComponent,canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent,canActivate: [AuthGuard] },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full',canActivate: [AuthGuard] },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
