import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from 'src/app/config';
import { startWith, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';


@Component({
selector: 'app-payroll-settings',
templateUrl: './payroll-settings.component.html',
styleUrls: ['./payroll-settings.component.scss']
})

export class PayrollSettingsComponent implements OnInit {
options: FormGroup;


lists:any;
f:any={
h:{
id:'',
  week_start:'',
month_start:'',
},


};

httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json',
'Authorization': localStorage.token,
})
}
formState: string;

constructor(
fb: FormBuilder,
private http:HttpClient,
private routes:Router,
private snackBar: MatSnackBar,

) {
this.options = fb.group({
hideRequired: false,
floatLabel: 'auto',
});

}
ngOnInit() {
this.simsNew();
}
simsNew(){
this.formState='form';
this.f={
h:{
month_start:'',
week_start:'',
},
}
}

simsSave(){
let p = this.f.h;
this.formState='form'
this.http.post<any>(config.apiUrl+'payroll/payroll_setting',p,this.httpOptions).subscribe(res =>{
if (res.status =='token_expired') return this.routes.navigate(['logout']);
this.snackBar.open('Insert Successfully id.'+res.id,"Insert",{duration: 5 * 1000,});
if (res.status=='success') this.simsNew();
},
error=>{
console.log(error);
});   
}




}