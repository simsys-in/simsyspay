import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MaterialModule} from './material.module';
import { EmployeeComponent } from './employee/employee.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EmployeeCategoryComponent } from './employee-category/employee-category.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AttendanceRegisterComponent } from './attendance-register/attendance-register.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { EmployeeListComponent } from './payroll/employee-list/employee-list.component';
import {AuthGuard} from './auth.guard';
import { LogoutComponent } from './core/logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    EmployeeCategoryComponent,
    DashboardComponent,
    AttendanceRegisterComponent,
    LoginComponent,
    EmployeeListComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule


  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
