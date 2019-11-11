import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource, SimpleSnackBar } from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from 'src/app/config';
import { startWith, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { NavService } from 'src/app/service/nav.service';


@Component({
selector: 'app-time-punch',
templateUrl: './time-punch.component.html',
styleUrls: ['./time-punch.component.scss']
})

export class TimePunchComponent implements OnInit {
options: FormGroup;


f:any={
h:{
LogDate:'',
UserId:'',

},
s:{
  employee:''
}

};

employees: any;
filteredEmployees: any;

httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json',
'Authorization': localStorage.token,
})
}


users:any;


formState: string;

constructor(
fb: FormBuilder,
private http:HttpClient,
private routes:Router,
private nav:NavService,
private snackBar: MatSnackBar,

) {
this.options = fb.group({
hideRequired: false,
floatLabel: 'auto',
});

this.http.get<any>(config.apiUrl+'payroll/employee',this.httpOptions).subscribe(res =>{
  //if (res.status =='token_expired') return this.routes.navigate(['logout']);
  this.employees = res;
})

}
ngOnInit() {
this.simsNew();
}


employeeFilter(typing){
  this.filteredEmployees= (typeof(typing) != 'object')?this.employees.filter(row => row.employee.toLowerCase().indexOf(typing.toLowerCase()) >= 0) : this.employees.slice()
  }
  
  employeeSelect(ac){
  let row = ac.option.value;
  this.f.h.UserId=row.employee_code;
  this.f.s.employee=row.employee;
  }



simsSave(){
let p = this.f.h;
this.formState='form';
this.http.post<any>(config.apiUrl+'payroll/payroll_report/time_punch',p,this.httpOptions).subscribe(res =>{
  this.snackBar.open('Inserted Successfully',"Insert",{duration: 5 * 1000,});
this.simsNew();
},
error=>{
 console.log(error);
});   
}

simsNew(){
  this.formState='form';
  
  this.f={
  h:{
   UserId:'',
  LogDate:'',
    },
  s:{
    employee:''
  }
  }
  
  }

  toggle(){
    this.nav.toggle();
  }

}