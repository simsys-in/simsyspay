import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { config } from '../../config';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { analyzeAndValidateNgModules } from '@angular/compiler';
@Component({
selector: 'app-size',
templateUrl: './size.component.html',
styleUrls:['./size.component.scss'],
})

export class SizeComponent implements OnInit {
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
private snackBar: MatSnackBar,
private fb: FormBuilder
) { 
}
//ngOninit consider as onload
ngOnInit() {

this.headForm=new FormGroup ( {
  size:new FormControl(''),
  menu_id:new FormControl(''),
  size1:new FormControl(''),
  size2:new FormControl(''),
  size3:new FormControl(''),
  size4:new FormControl(''),
  size5:new FormControl(''),
  size6:new FormControl(''),
  size7:new FormControl(''),
  size8:new FormControl(''),
  size9:new FormControl(''),
  

id:new FormControl(''),
narration:new FormControl(''),
decimal_digit:new FormControl('')

})

if (this.route.snapshot.params['id']) this.simsView(this.route.snapshot.params['id']);
}
ngAfterViewInit() {
  document.querySelector('mat-sidenav-content').classList.add('bg-body');
  }
simsInsert(){
let  request=this.headForm.value;
console.log(request);
this.http.post<any>(config.apiUrl+'garments/size',request,this.httpOptions).subscribe(res => {
this.snackBar.open('Insert Successfully id.'+res.id,"Insert",{duration: 5 * 1000,});
this.simsNew();
},error => {
    console.log(error);
});
}

simsUpdate(id){
this.http.put<any>(config.apiUrl+'garments/size/'+id,this.headForm.value,this.httpOptions).subscribe(() => {
  this.snackBar.open('Update Successfully',"Update",{duration: 5 * 1000,});
this.simsNew();
},error => {
  this.snackBar.open(JSON.stringify(error),"Error",{duration: 5 * 1000,});
});

}
simsDelete(id){
  this.http.delete(config.apiUrl+'garments/size/'+id,this.httpOptions).subscribe(() => {
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

this.http.get<any>(config.apiUrl+'garments/size',this.httpOptions).subscribe(res => {
this.rows = res;
});
}
get f() { return this.headForm.controls; }

simsView(id){
this.http.get<any>(config.apiUrl+'garments/size/'+id,this.httpOptions).subscribe(
res => {
this.f.size.setValue(res.size);
this.f.id.setValue(res.id);
this.f.size1.setValue(res.size1);
this.f.size2.setValue(res.size2);
this.f.size3.setValue(res.size3);
this.f.size4.setValue(res.size4);
this.f.size5.setValue(res.size5);
this.f.size6.setValue(res.size6);
this.f.size7.setValue(res.size7);
this.f.size8.setValue(res.size8);
this.f.size9.setValue(res.size9);
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

get timings() {
  return this.headForm.get('timings') as FormArray
}


deleteTiming(i) {
  this.timings.removeAt(i)
}

}

