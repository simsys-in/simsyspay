import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from 'src/app/config';
import { startWith, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { NavService } from 'src/app/service/nav.service';

@Component({
selector: 'app-employee-leave',
templateUrl: './employee-leave.component.html',
styleUrls: ['./employee-leave.component.scss']
})

export class EmployeeLeaveComponent implements OnInit {
options: FormGroup;

listColumns: string[] =['id','vou_date','employee','action'];
form:any={
vou_date: '',
leave_code: '',

};
lists:any;
f:any={
h:{
id:'',
vou_date:moment().format(),
employee_code:'',
leave_code:'',
narration:'',
approved_by:''
},


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
private nav:NavService,
private routes:Router,
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
simsUpdate(id){
let p = this.f.h;
p.vou_date= moment(this.f.h.vou_date).format('YYYY/MM/DD');
this.http.put<any>(config.apiUrl+'payroll/employee_leave/'+id,p,this.httpOptions).subscribe(res =>{
if (res.status =='token_expired') return this.routes.navigate(['logout']);
this.snackBar.open('Update Successfully',"Update",{duration: 5 * 1000,});
if (res.status=='success') this.simsNew();
},
error=>{
  this.snackBar.open(JSON.stringify(error),"Error",{duration: 5 * 1000,});
console.log(error);
});  
}
simsList(){
this.formState='list';
this.http.get<any>(config.apiUrl+'payroll/employee_leave',this.httpOptions).subscribe(res =>{
if (res.status =='token_expired') return this.routes.navigate(['logout']);
this.lists = res;
},
error=>{
console.log(error);
}
);    
}

employeeFilter(typing){
  this.filteredEmployees= (typeof(typing) != 'object')?this.employees.filter(row => row.employee.toLowerCase().indexOf(typing.toLowerCase()) >= 0) : this.employees.slice()
  }
  
  employeeSelect(ac){
  let row = ac.option.value;
  this.f.h.employee_code=row.employee_code;
  this.f.h.employee=row.employee;
  }

toggle(){
  this.nav.toggle();
}

simsPreview(){
this.formState='preview';
}
simsNew(){
this.formState='form';

this.f={
h:{

id:'',
vou_date:moment().format(),
employee:'',
employee_code:'',
leave_code:'',
narration:'',
approved_by:''
},

}

}
simsView(id){
  this.formState='form';
    this.http.get<any>(config.apiUrl+'payroll/employee_leave/'+id,this.httpOptions).subscribe(res =>{
  if (res.status =='token_expired') return this.routes.navigate(['logout']);
  this.f.h = res;
  console.log(res);
  
  
  },
  error=>{
  console.log(error);
  });     
  }


simsSave(){
let p = this.f.h;
this.formState='form'
p.vou_date= moment(this.f.h.vou_date).format('YYYY/MM/DD');
console.log(p.vou_date);
this.http.post<any>(config.apiUrl+'payroll/employee_leave',p,this.httpOptions).subscribe(res =>{
if (res.status =='token_expired') return this.routes.navigate(['logout']);
this.snackBar.open('Insert Successfully id.'+res.id,"Insert",{duration: 5 * 1000,});
if (res.status=='success') this.simsNew();
},
error=>{
console.log(error);
});   
}
simsDelete(id){
  
  this.formState='form';
this.http.delete(config.apiUrl+'payroll/employee_leave/'+id,this.httpOptions).subscribe(() => {
this.snackBar.open('Deleted Successfully',"Delete",{duration: 5 * 1000,});
this.simsNew();
},error => {
this.snackBar.open(JSON.stringify(error),"Error",);
});
}



}