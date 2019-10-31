import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { config } from '../../config';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { forEach } from '@angular/router/src/utils/collection';
import { NavService } from 'src/app/service/nav.service';

@Component({
selector: 'app-order-program',
templateUrl: './order-program.component.html',
styleUrls:['./order-program.component.scss'],
})

export class OrderProgramComponent implements OnInit {
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
private nav:NavService,
private http: HttpClient,
private route:ActivatedRoute,
private snackBar: MatSnackBar,
private fb: FormBuilder
) { 
}
//ngOninit consider as onload
ngOnInit() {

this.headForm=new FormGroup ( {
ledger:new FormControl(''),
id:new FormControl(''),
ledger2_id:new FormControl(''),
mobile:new FormControl(''),
vou_date:new FormControl(''),
order_id:new FormControl(''),
order_no:new FormControl(''),
due_date:new FormControl(''),
status_id:new FormControl(''),
product:new FormControl(''),
narration:new FormControl(''),
ledger_balance:new FormControl(''),
account_ledger:new FormControl(''),
account_narration:new FormControl(''),
size_id:new FormControl(''),
account_percentage:new FormControl(''),
inventory: this.fb.array([]),
accounts: this.fb.array([])
})

if (this.route.snapshot.params['id']) this.simsView(this.route.snapshot.params['id']);
}
ngAfterViewInit() {
  document.querySelector('mat-sidenav-content').classList.add('bg-body');
  }
simsInsert(){
let  request=this.headForm.value;
console.log(request);
this.http.post<any>(config.apiUrl+'garments/order_program',request,this.httpOptions).subscribe(res => {
this.snackBar.open('Insert Successfully id.'+res.id,"Insert",{duration: 5 * 1000,});
this.simsNew();
},error => {
    console.log(error);
});
}
toggle(){
  this.nav.toggle();
}
simsUpdate(id){
this.http.put<any>(config.apiUrl+'garments/order_program/'+id,this.headForm.value,this.httpOptions).subscribe(() => {
  this.snackBar.open('Update Successfully',"Update",{duration: 5 * 1000,});
this.simsNew();
},error => {
  this.snackBar.open(JSON.stringify(error),"Error",{duration: 5 * 1000,});
});

}
simsDelete(id){
  this.http.delete(config.apiUrl+'garments/order_program/'+id,this.httpOptions).subscribe(() => {
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

this.http.get<any>(config.apiUrl+'garments/order_program',this.httpOptions).subscribe(res => {
this.rows = res;
});
}
get f() { return this.headForm.controls; }

simsView(id){
this.http.get<any>(config.apiUrl+'garments/order_program/'+id,this.httpOptions).subscribe(
res => {
this.f.vou_date.setValue(res.vou_date);
this.f.order_no.setValue(res.order_no);
this.f.due_date.setValue(res.due_date);
this.f.status_id.setValue(res.status_id);
this.f.product.setValue(res.product);
this.f.size_id.setValue(res.size_id);
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
private fieldArray: Array<any> = [];
private newAttribute: any = {};

addFieldValue() {
    this.fieldArray.push(this.newAttribute)
    this.newAttribute = {};
}

deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
}

get inventory() {
  return this.headForm.get('inventory') as FormArray
}

addInventory(row) {
  const inventory = this.fb.group({
    process: [row.process],
    ledger: [row.ledger],
    rate: [row.rate],
    waste: [row.waste],
    unit: [row.unit],
    amount: [row.amount],
    id: [row.id]
  })

  this.inventory.push(inventory);
}

deleteInventory(i) {
  this.accounts.removeAt(i)
}
get accounts() {
  return this.headForm.get('accounts') as FormArray
}

addAccounts(row) {
  const accounts = this.fb.group({
    account_ledger: [row.account_ledger],
    account_narration: [row.account_narration],
    account_percentage: [row.account_percentage],
    account_amount: [row.account_amount],
    
    id: [row.id]
  })

  this.accounts.push(accounts);
}

deleteAccounts(i) {
  this.accounts.removeAt(i)
}
}

