import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { config } from '../../config';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
selector: 'app-ledger',
templateUrl: './ledger.component.html',
styleUrls:['./ledger.component.scss']
})

export class LedgerComponent implements OnInit {

headForm: FormGroup;

isForm = true;
ledger_groups:any;
rows:any;

httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json',
'Authorization': localStorage.token
})

}
constructor(
private http: HttpClient,
private route:ActivatedRoute,
private snackBar: MatSnackBar
) { 
  this.http.get<any>(config.apiUrl+'billing/ledger_group',this.httpOptions).subscribe(res =>{
    this.ledger_groups = res;
  });
}
//ngOninit consider as onload
ngOnInit() {

this.headForm=new FormGroup({
  ledger:new FormControl(''),
  ledger_group_id:new FormControl(''),
  ledger_category_id:new FormControl(''),
  amount:new FormControl(''),
  alias:new FormControl(''),
  status:new FormControl(''),
  id:new FormControl(''),
  narration:new FormControl(''),
  price_group_id:new FormControl(''),
  address:new FormControl(''),
  email:new FormControl(''),
  phone:new FormControl(''),
  mobile:new FormControl(''),
  state_id:new FormControl(''),
})

if (this.route.snapshot.params['id']) this.simsView(this.route.snapshot.params['id']);
}
ngAfterViewInit() {
  document.querySelector('mat-sidenav-content').classList.add('bg-secondary');
}

simsInsert(){
  let  request=this.headForm.value;
  this.http.post<any>(config.apiUrl+'billing/ledger',request,this.httpOptions).subscribe(res => {
  this.snackBar.open('Insert Successfully id.'+res.id,"Insert",{duration: 5 * 1000,});
  this.simsNew();
  },error => {

  });
}

simsUpdate(id){
  this.http.put<any>(config.apiUrl+'billing/ledger/'+id,this.headForm.value,this.httpOptions).subscribe(res => {
    this.snackBar.open('Update Successfully',"Update",{duration: 5 * 1000,});
  this.simsNew();
  },error => {
    this.snackBar.open(JSON.stringify(error),"Error",{duration: 5 * 1000,});
  });
}

simsDelete(id){
  this.http.delete(config.apiUrl+'billing/ledger/'+id,this.httpOptions).subscribe(res => {
    this.snackBar.open('Deleted Successfully',"Delete",{duration: 5 * 1000,});
  this.simsNew();
  },error => {
    this.snackBar.open(JSON.stringify(error),"Error",{duration: 5 * 1000,});
  });
}

simsList(){
  
this.isForm=false;
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json',
'Authorization':localStorage.token
})
};

this.http.get<any>(config.apiUrl+'/api/billing/ledger',httpOptions).subscribe(res => {
  this.rows = res;
});
}
get f() { return this.headForm.controls; }

simsView(id){
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json',
'Authorization':localStorage.token
})
};
this.http.get<any>(config.apiUrl+'/api/billing/ledger/'+id,httpOptions).subscribe(
res => {
this.f.ledger.setValue(res.ledger);
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