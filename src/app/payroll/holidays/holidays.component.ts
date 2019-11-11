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
selector: 'app-holidays',
templateUrl: './holidays.component.html',
styleUrls: ['./holidays.component.scss']
})

export class HolidaysComponent implements OnInit {
options: FormGroup;

listColumns: string[] =['i','id','dated','holiday','action'];
form:any={
holiday: ''
};
lists:any;
f:any={
h:{
id:'',
holiday:'',
leave_code:'',
narration:'',
dated:moment().format(),

},


};

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


}


ngOnInit() {
this.simsNew();
}
simsUpdate(id){
let p = this.f.h;
p.dated= moment(this.f.h.dated).format('YYYY/MM/DD');
this.http.put<any>(config.apiUrl+'payroll/holidays/'+id,p,this.httpOptions).subscribe(res =>{
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
this.http.get<any>(config.apiUrl+'payroll/holidays',this.httpOptions).subscribe(res =>{
if (res.status =='token_expired') return this.routes.navigate(['logout']);
this.lists = res;
},
error=>{
console.log(error);
}
);    
}


simsPreview(){
this.formState='preview';
}
simsNew(){
this.formState='form';

this.f={
h:{
  id:'',
  holiday_name:'',
  leave_code:'',
  narration:'',
  dated:moment().format(),
},

}

}

simsView(id){
this.formState='form';
this.http.get<any>(config.apiUrl+'payroll/holidays/'+id,this.httpOptions).subscribe(res =>{
if (res.status =='token_expired') return this.routes.navigate(['logout']);
this.f.h = res;
console.log(res);
console.log(this.f.h);

},
error=>{
console.log(error);
});     
}


simsSave(){
let p = this.f.h;
this.formState='form';
p.dated= moment(this.f.h.dated).format('YYYY/MM/DD');
console.log(p.dated);
this.http.post<any>(config.apiUrl+'payroll/holidays',p,this.httpOptions).subscribe(res =>{
if (res.status =='token_expired') return this.routes.navigate(['logout']);
this.snackBar.open('Insert Successfully id.'+res.id,"Insert",{duration: 5 * 1000,});
if (res.status=='success') this.simsNew();
},
error=>{
console.log(error);
});   
}
simsDelete(id){
this.http.delete(config.apiUrl+'payroll/holidays/'+id,this.httpOptions).subscribe(() => {
this.snackBar.open('Deleted Successfully',"Delete",{duration: 5 * 1000,});
this.simsNew();
},error => {
this.snackBar.open(JSON.stringify(error),"Error",);
});
}

toggle(){
  this.nav.toggle();
}

}