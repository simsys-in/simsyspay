import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { config } from '../../config';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { NavService } from 'src/app/service/nav.service';
@Component({
selector: 'app-process',
templateUrl: './process.component.html',
styleUrls:['./process.component.scss'],
})

export class ProcessComponent implements OnInit {
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
  process:new FormControl(''),
id:new FormControl(''),

})

if (this.route.snapshot.params['id']) this.simsView(this.route.snapshot.params['id']);
}
ngAfterViewInit() {
  document.querySelector('mat-sidenav-content').classList.add('bg-body');
  }
simsInsert(){
let  request=this.headForm.value;
console.log(request);
this.http.post<any>(config.apiUrl+'garments/process',request,this.httpOptions).subscribe(res => {
this.snackBar.open('Insert Successfully id.'+res.id,"Insert",{duration: 5 * 1000,});
this.simsNew();
},error => {
    console.log(error);
});
}

simsUpdate(id){
this.http.put<any>(config.apiUrl+'garments/process/'+id,this.headForm.value,this.httpOptions).subscribe(() => {
  this.snackBar.open('Update Successfully',"Update",{duration: 5 * 1000,});
this.simsNew();
},error => {
  this.snackBar.open(JSON.stringify(error),"Error",{duration: 5 * 1000,});
});

}
simsDelete(id){
  this.http.delete(config.apiUrl+'garments/process/'+id,this.httpOptions).subscribe(() => {
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

this.http.get<any>(config.apiUrl+'garments/process',this.httpOptions).subscribe(res => {
this.rows = res;
});
}
get f() { return this.headForm.controls; }

simsView(id){
this.http.get<any>(config.apiUrl+'garments/process/'+id,this.httpOptions).subscribe(
res => {
this.f.process.setValue(res.process);
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

get timings() {
  return this.headForm.get('timings') as FormArray
}


deleteTiming(i) {
  this.timings.removeAt(i)
}

}

