import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { config } from '../../config';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { startWith, map } from 'rxjs/operators';
import { NavService } from 'src/app/service/nav.service';

@Component({
selector: 'app-ledger',
templateUrl: './ledger.component.html',
styleUrls:['./ledger.component.scss']
})

export class LedgerComponent implements OnInit {
rows:any;
headForm: FormGroup;
isForm = true;
ledger_categories:any;
ledger_groups:any;
map:any;

httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json',
'Authorization': localStorage.token
})

}
constructor(
private nav:NavService,
private http: HttpClient,
private route:ActivatedRoute,
private snackBar: MatSnackBar,

) { 
  this.http.get<any>(config.apiUrl+'billing/ledger_category',this.httpOptions).subscribe(res => this.ledger_categories = res);
  this.http.get<any>(config.apiUrl+'billing/ledger_group',this.httpOptions).subscribe(res => this.ledger_groups = res);
}
//ngOninit consider as onload
ngOnInit() {

this.headForm=new FormGroup ( {
ledger:new FormControl(''),
ledger_group:new FormControl(''),
ledger_category:new FormControl(''),
product_id:new FormControl(''),
product:new FormControl(''),
value:new FormControl(''),
id:new FormControl(''),
alias:new FormControl(''),
ledger_category_id:new FormControl(''),
amount:new FormControl(''),
status_id:new FormControl(''),
address:new FormControl(''),
gstno:new FormControl(''),
mobile:new FormControl(''),
ledger_group_id:new FormControl(''),
narration:new FormControl(''),
formula:new FormControl(''),
price_group_id:new FormControl(''),
email:new FormControl(''),
phone:new FormControl(''),
state_id:new FormControl(''),
})

if (this.route.snapshot.params['id']) this.simsView(this.route.snapshot.params['id']);
this.headForm.controls.ledger_category.valueChanges
      .pipe(
        startWith(''),
        map(value =>{
           console.log(this._filterLedgerCategory(value))
        })
      );
}
private _filterLedgerCategory(value: string): string[] {
  const filterValue = value.toLowerCase();
  return this.ledger_categories.filter(option => option.toLowerCase().includes(filterValue));

  this.headForm.controls.ledger_group.valueChanges
      .pipe(
        startWith(''),
        map(value =>{
           console.log(this._filterLedgerGroup(value))
        })
      );
}
private _filterLedgerGroup(value: string): string[] {
  const filterValue = value.toLowerCase();
  return this.ledger_groups.filter(option => option.toLowerCase().includes(filterValue));


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
alert(error);
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
toggle(){
  this.nav.toggle();
}
simsList(){
 
this.isForm = false;
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json',
'Authorization':localStorage.token
})
};

this.http.get<any>(config.apiUrl+'billing/ledger',this.httpOptions).subscribe(res => {
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
this.http.get<any>(config.apiUrl+'billing/ledger/'+id,httpOptions).subscribe(
res => {
this.f.ledger.setValue(res.ledger);
this.f.id.setValue(res.id);
this.f.alias.setValue(res.alias);
this.f.ledger_group_id.setValue(res.ledger_group_id);
this.f.ledger_category_id.setValue(res.ledger_category_id);
this.f.amount.setValue(res.amount);
this.f.status_id.setValue(res.status_id);
this.f.narration.setValue(res.narration);
this.f.formula.setValue(res.formula);
this.f.price_group_id.setValue(res.price_group_id);
this.f.address.setValue(res.address);
this.f.email.setValue(res.email);
this.f.phone.setValue(res.phone);
this.f.mobile.setValue(res.mobile);
this.f.state_id.setValue(res.state_id);
this.f.gstno.setValue(res.gstno);
this.f.value.setValue(res.value);

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
ledger_categorySelect(ledger_categoryInfo){
  this.headForm.controls.ledger_category_id.setValue(ledger_categoryInfo.id);
}
ledger_groupSelect(ledger_groupInfo){
  this.headForm.controls.ledger_group_id.setValue(ledger_groupInfo.id);
}

}