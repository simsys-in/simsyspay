import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from 'src/app/config';
import { startWith, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { NavService } from 'src/app/service/nav.service';


@Component({
selector: 'app-department',
templateUrl: './department.component.html',
styleUrls: ['./department.component.scss']
})

export class DepartmentComponent implements OnInit {
options: FormGroup;

listColumns: string[] =['i','id','department','action'];
form:any={
department: ''
};
lists:any;
f:any={
h:{
department:'',
id:'',
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
private nav:NavService,
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
simsUpdate(id){
let p = this.f.h;
this.http.put<any>(config.apiUrl+'payroll/department/'+id,p,this.httpOptions).subscribe(res =>{
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
this.http.get<any>(config.apiUrl+'payroll/department',this.httpOptions).subscribe(res =>{
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
department:'',
id:'',
},

}

}

simsView(id){
this.formState='form';
this.http.get<any>(config.apiUrl+'payroll/department/'+id,this.httpOptions).subscribe(res =>{
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
this.formState='form'
this.http.post<any>(config.apiUrl+'payroll/department',p,this.httpOptions).subscribe(res =>{
if (res.status =='token_expired') return this.routes.navigate(['logout']);
this.snackBar.open('Insert Successfully id.'+res.id,"Insert",{duration: 5 * 1000,});
if (res.status=='success') this.simsNew();
},
error=>{
console.log(error);
});   
}
simsDelete(id){
this.http.delete(config.apiUrl+'payroll/department/'+id,this.httpOptions).subscribe(() => {
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