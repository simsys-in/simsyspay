import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeCategoryComponent } from './employee-category/employee-category.component';
import { EmployeeComponent } from './employee/employee.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AttendanceRegisterComponent } from './attendance-register/attendance-register.component';
import { LoginComponent } from './login/login.component';
import {LogoutComponent} from './core/logout/logout.component'
import {EmployeeListComponent} from './payroll/employee-list/employee-list.component';
import {AuthGuard} from './auth.guard';
const routes: Routes = [
  { path: 'employee_category', component: EmployeeCategoryComponent },
  { path: 'employee', component: EmployeeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'attendance_register', component: AttendanceRegisterComponent },
  { path: 'payroll/employee-list', component: EmployeeListComponent,canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
