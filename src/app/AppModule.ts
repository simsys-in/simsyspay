import * as platformBrowser from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';

import { ShiftComponent } from './payroll/shift/shift.component';
import { DepartmentComponent } from './payroll/department/department.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DashboardComponent } from './core/dashboard/dashboard.component';

import { LoginComponent } from './core/login/login.component';
import { AuthGuard } from './auth.guard';
import { LogoutComponent } from './core/logout/logout.component';
import { HeaderComponent } from './core/header/header.component';
import { DesignationComponent } from './payroll/designation/designation.component';
import { BankComponent } from './payroll/bank/bank.component';
import { BranchComponent } from './payroll/branch/branch.component';
import { TimePunchComponent } from './payroll/time-punch/time-punch.component';
import { PayrollSettingsComponent } from './payroll/payroll-settings/payroll-settings.component';
import { EmployeeCategoryComponent } from './payroll/employee-category/employee-category.component';
import { ShiftComplianceComponent } from './payroll/shift-compliance/shift-compliance.component';
import { DeviceLogsComponent } from './payroll/payroll_report/device-logs/device-logs.component';
import{BioDataComponent} from './payroll/payroll_report/bio-data/bio-data.component';
import { AppointmentOrderComponent } from './payroll/payroll_report/appointment-order/appointment-order.component';
import { PayslipComplianceComponent } from './payroll/payroll_report/payslip-compliance/payslip-compliance.component';
import { TrainingRecordComponent } from './payroll/payroll_report/training-record/training-record.component';
import { NominationFormComponent } from './payroll/payroll_report/nomination-form/nomination-form.component';
import { NominationFComponent } from './payroll/payroll_report/nomination-f/nomination-f.component';
import { PunchLogBetweenDateComponent } from './payroll/payroll_report/punch-log-betweendate/punch-log-betweendate.component';
import { TimecardComplianceComponent } from './payroll/payroll_report/timecard-compliance/timecard-compliance.component';
import { ServiceRecordComponent } from './payroll/payroll_report/service-record/service-record.component';
import { SalaryComplianceComponent } from './payroll/salary-compliance/salary-compliance.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './core/navbar/navbar.component';

import { EmployeeLeaveComponent } from './payroll/employee-leave/employee-leave.component';
import { HolidaysComponent } from './payroll/holidays/holidays.component';
import { LeaveTypeComponent } from './payroll/leave-type/leave-type.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { WeeklySalaryReport } from './payroll/payroll_report/weekly-salary-report/weekly-salary-report.component';
import { MatSortModule, MatPaginator, MatMenuModule, MatButtonModule } from '@angular/material';
import { EmployeeComponent } from './payroll/employee/employee.component';

@NgModule({
declarations: [
//declarations reference tot he component stored
AppComponent,//default component initiated project created
EmployeeComponent,
DashboardComponent,
NominationFComponent,
SalaryComplianceComponent,
PayrollSettingsComponent,
ServiceRecordComponent,
TimePunchComponent,
ShiftComponent,
HolidaysComponent,
LeaveTypeComponent,
BankComponent,
BranchComponent,
ShiftComplianceComponent,
DesignationComponent,
NominationFormComponent,
TrainingRecordComponent,
PayslipComplianceComponent,

AppointmentOrderComponent,
BioDataComponent,
DeviceLogsComponent,

PunchLogBetweenDateComponent,
TimecardComplianceComponent,
LoginComponent,
//EmployeeListComponent,
LogoutComponent,
WeeklySalaryReport,
HeaderComponent,
DepartmentComponent,
EmployeeCategoryComponent,
NavbarComponent,

EmployeeLeaveComponent ,

],
imports: [//modules are imported  or array of modules
platformBrowser.BrowserModule,
MaterialModule,
BrowserAnimationsModule,
ReactiveFormsModule,
MatSortModule,
MatMenuModule,
MatButtonModule,
FormsModule,
AppRoutingModule,
HttpClientModule,
OwlDateTimeModule, 
OwlNativeDateTimeModule,

],
providers: [AuthGuard],//reference to the services is created
bootstrap: [AppComponent]//reference to the default component. i.e AppComponent or main appcomponnent starts execution
})
export class AppModule {
}
