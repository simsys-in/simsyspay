import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { config } from '../../config';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { startWith, map } from 'rxjs/operators';
import { NavService } from 'src/app/service/nav.service';
@Component({
selector: 'app-product-details',
templateUrl: './product-details.component.html',
styleUrls:['./product-details.component.scss'],
})

export class ProductDetailsComponent implements OnInit {
rows:any;
headForm: FormGroup;
isForm = true;
products:any;
filteredProducts:any;
sizes:any;
filterSizes:any;
size1_title="S1";
size2_title="S2";
size3_title="S3";
size4_title="S4";
size5_title="S5";
size6_title="S6";
size7_title="S7";
size8_title="S8";
size9_title="S9";

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
  id:new FormControl(''),
  size:new FormControl(''),
  size_id:new FormControl(''),
  product:new FormControl(''),
  product_id:new FormControl(''),
  size1:new FormControl(''),
  size2:new FormControl(''),
  size3:new FormControl(''),
  size4:new FormControl(''),
  size5:new FormControl(''),
  size6:new FormControl(''),
  size7:new FormControl(''),
  size8:new FormControl(''),
  size9:new FormControl(''),
  size1_rate:new FormControl(''),
  size2_rate:new FormControl(''),
  size3_rate:new FormControl(''),
  size4_rate:new FormControl(''),
  size5_rate:new FormControl(''),
  size6_rate:new FormControl(''),
  size7_rate:new FormControl(''),
  size8_rate:new FormControl(''),
  size9_rate:new FormControl(''),

})

//if (this.route.snapshot.params['id']) this.simsView(this.route.snapshot.params['id']);

this.http.get(config.apiUrl+'billing/product',this.httpOptions).subscribe(res =>{
  this.products = res;
  this.filteredProducts = this.headForm.controls.product.valueChanges
  .pipe(startWith(''),
    map(lg => {
      lg?'':this.headForm.controls.product_id.setValue('');
      return lg.product?this.products.filter(masters => masters.product.toLowerCase().indexOf(lg.product.toLowerCase()) >= 0) : this.products.slice()
      
    })
  );

  });

  this.http.get(config.apiUrl+'garments/size',this.httpOptions).subscribe(res =>{
    this.sizes = res;
    this.filterSizes = this.headForm.controls.size.valueChanges
    .pipe(startWith(''),
      map(lg => lg?this.sizes.filter(masters => masters.size.toLowerCase().indexOf(lg.toLowerCase()) >= 0) : this.sizes.slice())
    );
  });
}

sizeSelect(size_info){
  this.size1_title =size_info.size1;
  this.size2_title =size_info.size2;
  this.size3_title =size_info.size3;
  this.size4_title =size_info.size4;
  this.size5_title =size_info.size5;
  this.size6_title =size_info.size6;
  this.size7_title =size_info.size7;
  this.size8_title =size_info.size8;
  this.size9_title =size_info.size9;

  this.headForm.controls.size_id.setValue(size_info.id);
}
productSelect(event){
  let product_info = event.option.value;
  this.headForm.controls.product_id.setValue(product_info.id);
  this.headForm.controls.product.setValue(product_info.product);
  if (product_info.id) this.simsView(product_info.id);
}


ngAfterViewInit() {
  document.querySelector('mat-sidenav-content').classList.add('bg-body');
  }

simsInsert(){
let  request=this.headForm.value;
console.log(request);
this.http.post<any>(config.apiUrl+'garments/product_details',request,this.httpOptions).subscribe(res => {
this.snackBar.open('Insert Successfully id.'+res.id,"Insert",{duration: 5 * 1000,});
this.simsNew();
},error => {
  this.snackBar.open(error,'Error',{duration: 5 * 1000,});
});
}

simsUpdate(id){
  let post = this.headForm.value;
  delete post.id;
  delete post.product;
  delete post.size;

  
this.http.put<any>(config.apiUrl+'garments/product_details/'+id,post,this.httpOptions).subscribe(() => {
  this.snackBar.open('Update Successfully',"Update",{duration: 5 * 1000,});
this.simsNew();
},error => {
  this.snackBar.open(JSON.stringify(error),"Error",{duration: 5 * 1000,});
});

}
simsDelete(id){
  this.http.delete(config.apiUrl+'garments/product-details/'+id,this.httpOptions).subscribe(() => {
    this.snackBar.open('Deleted Successfully',"Delete",{duration: 5 * 1000,});
  this.simsNew();
  },error => {
     this.snackBar.open(JSON.stringify(error),"Error",);
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
  'Authorization':JSON.parse(localStorage.getItem('currentUser')).apiKey
})
};

this.http.get<any>(config.apiUrl+'garments/product_details',this.httpOptions).subscribe(res => {
this.rows = res;
});
}

get f() { return this.headForm.controls; }

simsView(id){
this.http.get<any>(config.apiUrl+'garments/product_details/'+id,this.httpOptions).subscribe(
res => {

this.f.size_id.setValue(res.size_id);
this.f.product_id.setValue(res.product_id);
this.f.size.setValue(res.size);

this.f.size1.setValue(res.size1);
this.f.size2.setValue(res.size2);
this.f.size3.setValue(res.size3);
this.f.size4.setValue(res.size4);
this.f.size5.setValue(res.size5);
this.f.size6.setValue(res.size6);
this.f.size7.setValue(res.size7);
this.f.size8.setValue(res.size8);
this.f.size9.setValue(res.size9);

this.f.size1_rate.setValue(res.size1_rate);
this.f.size2_rate.setValue(res.size2_rate);
this.f.size3_rate.setValue(res.size3_rate);
this.f.size4_rate.setValue(res.size4_rate);
this.f.size5_rate.setValue(res.size5_rate);
this.f.size6_rate.setValue(res.size6_rate);
this.f.size7_rate.setValue(res.size7_rate);
this.f.size8_rate.setValue(res.size8_rate);
this.f.size9_rate.setValue(res.size9_rate);

this.size1_title = res.size1_title;
this.size2_title = res.size2_title;
this.size3_title = res.size3_title;
this.size4_title = res.size4_title;
this.size5_title = res.size5_title;
this.size6_title = res.size6_title;
this.size7_title = res.size7_title;
this.size8_title = res.size8_title;
this.size9_title = res.size9_title;


this.f.product_id.setValue(res.product_id);
this.f.product.setValue(res.product);
this.f.id.setValue(res.product_id);

},
error => {
this.snackBar.open(error.error.error,'Error',{duration:5000,});
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

get timings() {
  return this.headForm.get('timings') as FormArray
}

deleteTiming(i) {
  this.timings.removeAt(i)
}

}

