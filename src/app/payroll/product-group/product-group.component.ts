import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { config } from '../../config';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
selector: 'app-ledger-group',
templateUrl: './product-group.component.html',
styleUrls:['./product-group.component.scss']
})

export class ProductGroupComponent implements OnInit {
rows:any;
headForm: FormGroup;
isForm = true;

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
}
//ngOninit consider as onload
ngOnInit() {

this.headForm=new FormGroup ( {
ledger_group:new FormControl(''),
id:new FormControl('')
})

if (this.route.snapshot.params['id']) this.simsView(this.route.snapshot.params['id']);
}
ngAfterViewInit() {
  document.querySelector('mat-sidenav-content').classList.add('bg-secondary');
}
simsInsert(){
let  request=this.headForm.value;
this.http.post<any>(config.apiUrl+'/api/billing/product_group',request,this.httpOptions).subscribe(res => {
this.snackBar.open('Insert Successfully id.'+res.id,"Insert",{duration: 5 * 1000,});
this.simsNew();
},error => {
alert(error);
});
}

simsUpdate(id){
this.http.put<any>(config.apiUrl+'/api/billing/product_group/'+id,this.headForm.value,this.httpOptions).subscribe(res => {
  this.snackBar.open('Update Successfully',"Update",{duration: 5 * 1000,});
this.simsNew();
},error => {
  this.snackBar.open(JSON.stringify(error),"Error",{duration: 5 * 1000,});
});

}
simsDelete(id){
  this.http.delete(config.apiUrl+'/api/billing/product_group/'+id,this.httpOptions).subscribe(res => {
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

this.http.get<any>(config.apiUrl+'/api/billing/product_group',httpOptions).subscribe(res => {
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
this.http.get<any>(config.apiUrl+'/api/billing/product_group/'+id,httpOptions).subscribe(
res => {
this.f.product_group.setValue(res.product_group);
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