import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { config } from '../../config';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { forEach } from '@angular/router/src/utils/collection';
import { startWith, map } from 'rxjs/operators';

@Component({
selector: 'app-yarn-invoice',
templateUrl: './yarn-invoice.component.html',
styleUrls:['./yarn-invoice.component.scss'],
})

export class YarnInvoiceComponent implements OnInit {
rows:any;
headForm: FormGroup;
isForm = true;
ledgers:any;
processes:any;
httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json',
'Authorization': localStorage.token,
})
}

constructor(
private http: HttpClient,
private route:ActivatedRoute,
private snackBar: MatSnackBar,
private fb: FormBuilder
) { 
  this.http.get<any>(config.apiUrl+'billing/ledger',this.httpOptions).subscribe(res => this.ledgers = res);
}
//ngOninit consider as onload
ngOnInit() {

this.headForm=new FormGroup ( {
ledger:new FormControl(''),
id:new FormControl(''),
ledger2_id:new FormControl(''),
mobile:new FormControl(''),
vou_date:new FormControl(''),
narration:new FormControl(''),
ledger_balance:new FormControl(''),
account_ledger:new FormControl(''),
account_narration:new FormControl(''),
account_percentage:new FormControl(''),
process:new FormControl(''),
refno:new FormControl(''),
order_id:new FormControl(''),
inventory: this.fb.array([]),
accounts: this.fb.array([])
})

if (this.route.snapshot.params['id']) this.simsView(this.route.snapshot.params['id']);
this.headForm.controls.ledger.valueChanges
      .pipe(
        startWith(''),
        map(value =>{
           console.log(this._filterLedger(value))
        })
      );
}
      private _filterLedger(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.ledgers.filter(option => option.toLowerCase().includes(filterValue));
      this.headForm.controls.process.valueChanges
      .pipe(
        startWith(''),
        map(value =>{
           console.log(this._filterProcess(value))
        })
      );
}
private _filterProcess(value: string): string[] {
  const filterValue = value.toLowerCase();
  return this.processes.filter(option => option.toLowerCase().includes(filterValue));
}

ngAfterViewInit() {
  document.querySelector('mat-sidenav-content').classList.add('bg-body');
  }
simsInsert(){
let  request=this.headForm.value;
console.log(request);
this.http.post<any>(config.apiUrl+'garments/yarn_invoice',request,this.httpOptions).subscribe(res => {
this.snackBar.open('Insert Successfully id.'+res.id,"Insert",{duration: 5 * 1000,});
this.simsNew();
},error => {
    console.log(error);
});
}

simsUpdate(id){
this.http.put<any>(config.apiUrl+'garments/yarn_invoice'+id,this.headForm.value,this.httpOptions).subscribe(() => {
  this.snackBar.open('Update Successfully',"Update",{duration: 5 * 1000,});
this.simsNew();
},error => {
  this.snackBar.open(JSON.stringify(error),"Error",{duration: 5 * 1000,});
});

}
simsDelete(id){
  this.http.delete(config.apiUrl+'garments/yarn_invoice'+id,this.httpOptions).subscribe(() => {
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

this.http.get<any>(config.apiUrl+'garments/yarn_invoice',this.httpOptions).subscribe(res => {
this.rows = res;
});
}
get f() { return this.headForm.controls; }

simsView(id){
this.http.get<any>(config.apiUrl+'garments/yarn_invoice'+id,this.httpOptions).subscribe(
res => {
this.f.ledger.setValue(res.ledger);
this.f.id.setValue(res.id);
this.f.vou_date.setValue(res.vou_date);
this.f.narrartion.setValue(res.narration);
this.f.process_id.setValue(res.process_id);
this.f.order_id.setValue(res.order_id);
this.f.refno.setValue(res.refno);

res.timings.forEach((row)=>{
  this.addInventory(row);
});
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
    product: [row.product],
    narration: [row.narration],
    qty: [row.qty],
    rate: [row.rate],
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
ledgerSelect(ledgerInfo){
  this.headForm.controls.ledger_id.setValue(ledgerInfo.id);
}
processSelect(processInfo){
  this.headForm.controls.process_id.setValue(processInfo.id);
}

}

