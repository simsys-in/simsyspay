import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { config } from '../../config';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
selector: 'app-branch',
templateUrl: './branch.component.html',
styleUrls:['./branch.component.scss'],
})

export class BranchComponent implements OnInit {
rows:any;
headForm: FormGroup;
isForm = true;
httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json',
'Authorization': localStorage.token,
})
}
constructor(
private http: HttpClient,
private route:ActivatedRoute,
private snackBar: MatSnackBar
) { 
}
//ngOninit consider as onload
ngOnInit() {

this.headForm=new FormGroup ( {
branch:new FormControl(''),
id:new FormControl('')
})

if (this.route.snapshot.params['id']) this.simsView(this.route.snapshot.params['id']);
}
ngAfterViewInit() {
  document.querySelector('mat-sidenav-content').classList.add('bg-body');
  }
simsInsert(){
let  request=this.headForm.value;
this.http.post<any>(config.apiUrl+'/api/payroll/branch',request,this.httpOptions).subscribe(res => {
this.snackBar.open('Insert Successfully id.'+res.id,"Insert",{duration: 5 * 1000,});
this.simsNew();
},error => {
    console.log(error);
});
}

simsUpdate(id){
this.http.put<any>(config.apiUrl+'/api/payroll/branch/'+id,this.headForm.value,this.httpOptions).subscribe(() => {
  this.snackBar.open('Update Successfully',"Update",{duration: 5 * 1000,});
this.simsNew();
},error => {
  this.snackBar.open(JSON.stringify(error),"Error",{duration: 5 * 1000,});
});

}
simsDelete(id){
  this.http.delete(config.apiUrl+'/api/payroll/branch/'+id,this.httpOptions).subscribe(() => {
    this.snackBar.open('Deleted Successfully',"Delete",{duration: 5 * 1000,});
  this.simsNew();
  },error => {
     this.snackBar.open(JSON.stringify(error),"Error",);
  });
}


simsList(){
  this.isForm = false;
  const httpOptions = {
headers: new HttpHeaders({
  'Content-Type':  'application/json',
  'Authorization':JSON.parse(localStorage.getItem('currentUser')).apiKey
})
};

this.http.get<any>(config.apiUrl+'/api/payroll/branch',this.httpOptions).subscribe(res => {
this.rows = res;
});
}
get f() { return this.headForm.controls; }

simsView(id){
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json',
'Authorization':JSON.parse(localStorage.getItem('currentUser')).apiKey
})
};
this.http.get<any>(config.apiUrl+'/api/payroll/branch/'+id,this.httpOptions).subscribe(
res => {
this.f.branch.setValue(res.branch);
this.f.id.setValue(res.id);
},
error => {
alert(error);
});
this.isForm=true;

}

simsNew(){
this.isForm=true;
this.headForm.reset();
}
}