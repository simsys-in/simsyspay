import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { config } from '../../config';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar} from '@angular/material';
import { startWith, map } from 'rxjs/operators';
import { NavService } from 'src/app/service/nav.service';

@Component({
selector: 'app-product',
templateUrl: './product.component.html',
styleUrls:['./product.component.scss']
})

export class ProductComponent implements OnInit {
rows:any;
headForm: FormGroup;
isForm = true;
product_categories:any;
product_groups:any;
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
private snackBar: MatSnackBar
) { 
  this.http.get<any>(config.apiUrl+'billing/product_category',this.httpOptions).subscribe(res => this.product_categories = res);
  this.http.get<any>(config.apiUrl+'billing/product_group',this.httpOptions).subscribe(res => this.product_groups = res);
}
//ngOninit consider as onload
ngOnInit() {

this.headForm=new FormGroup ( {
product:new FormControl(''),
id:new FormControl(''),
status_id:new FormControl(''),
hsnsac:new FormControl(''),
sales_amount:new FormControl(''),
unit_id:new FormControl(''),
unit2_id:new FormControl(''),
one:new FormControl(''),
purchase_amount:new FormControl(''),
qrcode:new FormControl(''),
product_group_id:new FormControl(''),
product_group:new FormControl(''),
product_category_id:new FormControl(''),
product_category:new FormControl(''),


})

if (this.route.snapshot.params['id']) this.simsView(this.route.snapshot.params['id']);
this.headForm.controls.product_category.valueChanges
      .pipe(
        startWith(''),
        map(value =>{
           console.log(this._filterProductCategory(value))
        })
      );
}
private _filterProductCategory(value: string): string[] {
  const filterValue = value.toLowerCase();
  return this.product_categories.filter(option => option.toLowerCase().includes(filterValue));

  this.headForm.controls.product_group.valueChanges
      .pipe(
        startWith(''),
        map(value =>{
           console.log(this._filterProductGroup(value))
        })
      );
}
private _filterProductGroup(value: string): string[] {
  const filterValue = value.toLowerCase();
  return this.product_groups.filter(option => option.toLowerCase().includes(filterValue));
}
ngAfterViewInit() {
  document.querySelector('mat-sidenav-content').classList.add('bg-secondary');
}
simsInsert(){
let  request=this.headForm.value;
this.http.post<any>(config.apiUrl+'billing/product',request,this.httpOptions).subscribe(res => {
this.snackBar.open('Insert Successfully id.'+res.id,"Insert",{duration: 5 * 1000,});
this.simsNew();
},error => {
alert(error);
});
}

simsUpdate(id){
this.http.put<any>(config.apiUrl+'billing/product/'+id,this.headForm.value,this.httpOptions).subscribe(res => {
  this.snackBar.open('Update Successfully',"Update",{duration: 5 * 1000,});
this.simsNew();
},error => {
  this.snackBar.open(JSON.stringify(error),"Error",{duration: 5 * 1000,});
});

}
simsDelete(id){
  this.http.delete(config.apiUrl+'billing/product/'+id,this.httpOptions).subscribe(res => {
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

this.http.get<any>(config.apiUrl+'billing/product',httpOptions).subscribe(res => {
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
this.http.get<any>(config.apiUrl+'billing/product/query/'+id,httpOptions).subscribe(
res => {
this.f.product.setValue(res.product);
this.f.product_id.setValue(res.product_id);
this.f.id.setValue(res.id);
this.f.alias.setValue(res.alias);
this.f.product_group_id.setValue(res.product_group_id);
this.f.product_category_id.setValue(res.product_category_id);
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

},
error => {
alert(error);
});
this.isForm=true;

}
toggle(){
  this.nav.toggle();
}
simsNew(){
this.isForm=true;
this.headForm.reset();
}
product_categorySelect(product_categoryInfo){
  this.headForm.controls.product_category_id.setValue(product_categoryInfo.id);
}
product_groupSelect(product_groupInfo){
  this.headForm.controls.product_group_id.setValue(product_groupInfo.id);
}

}