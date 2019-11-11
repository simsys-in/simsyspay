import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from 'src/app/config';
import { startWith, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { SelectionModel } from '@angular/cdk/collections';
import { NavService } from 'src/app/service/nav.service';

@Component({
selector: 'app-weekly-salary-report',
templateUrl: './weekly-salary-report.component.html',
styleUrls: ['./weekly-salary-report.component.scss']

})

export class WeeklySalaryReport implements OnInit{
options: FormGroup;
formState:any;
employee_categories:any;
filteredEmployee_categories:any;
listColumns: string[] =['i','employee','employee_code','day1_shift','day2_shift','day3_shift','day4_shift','day5_shift','day6_shift','day7_shift','day8_shift','day9_shift','day10_shift','day11_shift','day12_shift','day13_shift','day14_shift','day15_shift','day16_shift','day17_shift','day18_shift','day19_shift','day20_shift','day21_shift','day22_shift','day23_shift','day24_shift','day25_shift','day26_shift','day27_shift','day28_shift','day29_shift','day30_shift','day31_shift','shift_count','salary','total'];
// employees:any;
// filteredEmployees:any;




t:any;

f:any={
h:{
id:'',
from_date:moment().format(),
to_date:moment().format(),
employee_category:'',
employee_category_id:'',
// employee:'',
// employee_code:''
},


};


httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json',
'Authorization': localStorage.token,
})
}



users:any;
  rows: any;
  transactions: any;
  u: any;




constructor(
fb: FormBuilder,
private http:HttpClient,
private routes:Router,
private nav:NavService,
private snackBar: MatSnackBar,

) {
  this.http.get<any>(config.apiUrl+'payroll/employee_category',this.httpOptions).subscribe(res =>{

    this.employee_categories = res;
    })

    // this.http.get<any>(config.apiUrl+'payroll/employee',this.httpOptions).subscribe(res =>{

    //   this.employees = res;
    //   })
  
}

employee_categoryFilter(typing){
  this.filteredEmployee_categories= (typeof(typing) != 'object')?this.employee_categories.filter(row => row.employee_category.toLowerCase().indexOf(typing.toLowerCase()) >= 0) : this.employee_categories.slice()
  }
  
  employee_categorySelect(ac){
  let row = ac.option.value;
  this.f.h.employee_category_id=row.id;
  this.f.h.employee_category=row.employee_category;
  }
  
//  employeeFilter(typing){
//   this.filteredEmployees= (typeof(typing) != 'object')?this.employees.filter(row => row.employee.toLowerCase().indexOf(typing.toLowerCase()) >= 0) : this.employees.slice()
//   }
  
  // employeeSelect(ac){
  // let row = ac.option.value;
  // this.f.h.employee_code=row.employee_code;
  // this.f.h.employee=row.employee;
  // }


ngOnInit() {
this.simsNew();
  
}


toggle(){
  this.nav.toggle();
}

simsSave(){
  this.formState='list';
let p = this.f.h;
p.from_date = moment(this.f.h.from_date).format('YYYY/MM/DD');
p.to_date = moment(this.f.h.to_date).format('YYYY/MM/DD');

this.http.post<any>(config.apiUrl+'payroll/payroll_report/salary_report',p,this.httpOptions).subscribe(res =>{
this.rows=res;
this.t=this.rows
console.log(this.t);

},
error=>{
console.log(error);
});   
}



simsNew(){
  this.formState='form';
  
  this.f={
  h:{
  id:'',
  from_date:moment().format(),
  to_date:moment().format(),
  employee_category:'',
  employee_category_id:'',
  // employee:'',
  // employee_code:''
  },
  
  }
  
  }
 

}