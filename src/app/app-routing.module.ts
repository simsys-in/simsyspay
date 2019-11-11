import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DepartmentComponent } from './payroll/department/department.component';
import { ShiftComponent } from './payroll/shift/shift.component';

import { EmployeeCategoryComponent } from './payroll/employee-category/employee-category.component';
import { ShiftComplianceComponent } from './payroll/shift-compliance/shift-compliance.component';
import { EmployeeComponent } from './payroll/employee/employee.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { LoginComponent } from './core/login/login.component';
import {LogoutComponent} from './core/logout/logout.component'
//import {EmployeeListComponent} from './payroll/employee-list/employee-list.component';
import {AuthGuard} from './auth.guard';
import { DesignationComponent } from './payroll/designation/designation.component';
import { BankComponent } from "./payroll/bank/bank.component";


import { BranchComponent } from './payroll/branch/branch.component';
import { PayrollSettingsComponent } from './payroll/payroll-settings/payroll-settings.component';
import { TimePunchComponent } from './payroll/time-punch/time-punch.component';
import { TimecardComplianceComponent } from './payroll/payroll_report/timecard-compliance/timecard-compliance.component';

import {BioDataComponent } from './payroll/payroll_report/bio-data/bio-data.component';
import { AppointmentOrderComponent } from './payroll/payroll_report/appointment-order/appointment-order.component';

import { DeviceLogsComponent } from './payroll/payroll_report/device-logs/device-logs.component';
import { PayslipComplianceComponent } from './payroll/payroll_report/payslip-compliance/payslip-compliance.component';
import { TrainingRecordComponent } from './payroll/payroll_report/training-record/training-record.component';
import { NominationFormComponent } from './payroll/payroll_report/nomination-form/nomination-form.component';
import { NominationFComponent } from './payroll/payroll_report/nomination-f/nomination-f.component';
import { PunchLogBetweenDateComponent } from './payroll/payroll_report/punch-log-betweendate/punch-log-betweendate.component';
import { ServiceRecordComponent } from './payroll/payroll_report/service-record/service-record.component';
import { SalaryComplianceComponent } from './payroll/salary-compliance/salary-compliance.component';
import { EmployeeLeaveComponent } from './payroll/employee-leave/employee-leave.component';
import { HolidaysComponent } from './payroll/holidays/holidays.component';
import { LeaveTypeComponent } from './payroll/leave-type/leave-type.component';
import { WeeklySalaryReport } from './payroll/payroll_report/weekly-salary-report/weekly-salary-report.component';
import { Employee1Component } from './employee1/employee1.component';




const routes: Routes = [
//{ path: 'designation/:id', component: DepartmentComponent,canActivate: [AuthGuard] },
{ path: 'payroll/employee', component: EmployeeComponent,canActivate: [AuthGuard] },
{ path: 'payroll/department', component: DepartmentComponent,canActivate: [AuthGuard] },
{ path: 'payroll/branch', component: BranchComponent,canActivate: [AuthGuard] },
{ path: 'employee1', component: Employee1Component,canActivate: [AuthGuard] },




{ path: 'payroll/employee_leave', component: EmployeeLeaveComponent,canActivate: [AuthGuard] },
{ path: 'payroll/shift_compliance', component: ShiftComplianceComponent,canActivate: [AuthGuard] },
{ path: 'payroll/payroll_settings', component: PayrollSettingsComponent,canActivate: [AuthGuard] },
{ path: 'payroll/time_punch', component: TimePunchComponent,canActivate: [AuthGuard] },
{ path: 'payroll/employee_category', component: EmployeeCategoryComponent,canActivate: [AuthGuard] },
{ path: 'payroll/salary_compliance', component: SalaryComplianceComponent,canActivate: [AuthGuard] },


{ path: 'payroll/designation', component: DesignationComponent,canActivate: [AuthGuard] },
{ path: 'payroll/leave_type', component: LeaveTypeComponent,canActivate: [AuthGuard] },
{ path: 'payroll/holidays', component: HolidaysComponent,canActivate: [AuthGuard] },
{ path: 'payroll/bank', component: BankComponent,canActivate: [AuthGuard] },
{ path: 'payroll/shift', component: ShiftComponent,canActivate: [AuthGuard] },
{ path: 'core/dashboard', component: DashboardComponent,canActivate: [AuthGuard] },
{ path: 'payroll/payroll_report/timecard_compliance', component: TimecardComplianceComponent,canActivate: [AuthGuard] },
{ path: 'payroll/payroll_report/nomination_form', component: NominationFormComponent,canActivate: [AuthGuard] },
{ path: 'payroll/payroll_report/device_logs', component: DeviceLogsComponent,canActivate: [AuthGuard] },

{ path: 'payroll/payroll_report/payslip_compliance', component: PayslipComplianceComponent,canActivate: [AuthGuard] },
{ path: 'payroll/payroll_report/bio_data', component: BioDataComponent,canActivate: [AuthGuard] },
{ path: 'payroll/payroll_report/training_record', component: TrainingRecordComponent,canActivate: [AuthGuard] },
{ path: 'payroll/payroll_report/nomination_f', component: NominationFComponent,canActivate: [AuthGuard] },
{ path: 'payroll/payroll_report/punch_log_betweendate', component: PunchLogBetweenDateComponent,canActivate: [AuthGuard] },
{ path: 'payroll/payroll_report/service_record', component: ServiceRecordComponent,canActivate: [AuthGuard] },

{ path: 'payroll/payroll_report/appointment_order', component: AppointmentOrderComponent,canActivate: [AuthGuard] },
{ path: 'payroll/payroll_report/weekly_salary_report', component: WeeklySalaryReport,canActivate: [AuthGuard] },

{ path: 'login', component: LoginComponent },
{ path: 'logout', component: LogoutComponent,canActivate: [AuthGuard] },
{ path: '', redirectTo: 'core/dashboard', pathMatch: 'full',canActivate: [AuthGuard] },

];

@NgModule({
imports: [RouterModule.forRoot(routes,{useHash:true})],
exports: [RouterModule]
})
export class AppRoutingModule {
 
}

export const routingcomponents=[PayslipComplianceComponent,SalaryComplianceComponent]
