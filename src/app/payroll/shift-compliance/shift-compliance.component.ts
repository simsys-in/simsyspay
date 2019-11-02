import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from 'src/app/config';
import { startWith, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';


@Component({
selector: 'app-shift-compliance',
templateUrl: './shift-compliance.component.html',
styleUrls: ['./shift-compliance.component.scss']
})

export class ShiftComplianceComponent implements OnInit {
options: FormGroup;
displayedColumns: any[] = ['label_in','label_out','intime','outtime','adj_in','adj_out','shift_count','time_type','sort_order','action'];

listColumns: any[]=['id','shift','action'];

form:any={
amount: ''
};
lists:any;
f:any={
h:{
    id:'',
shift:'',
early_punch:'',
late_punch:'',
},

i:[{

}]
};

formState:String='form';
dataSource = new MatTableDataSource<any>(this.f.i);
dataSourceLists:any;

httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json',
'Authorization': localStorage.token,
})
}




users:any;
inventory: any;


constructor(
fb: FormBuilder,
private http:HttpClient,
private routes:Router,
private snackBar: MatSnackBar,

) {
this.options = fb.group({
hideRequired: false,
floatLabel: 'auto',
});



/** Gets the total cost of all transactions. */

}



ngOnInit() {
this.simsNew();
}
simsUpdate(id){
let p = this.f.h;
p.timings = this.f.i;
this.http.put<any>(config.apiUrl+'payroll/shift_compliance/'+id,p,this.httpOptions).subscribe(res =>{
if (res.status =='token_expired') return this.routes.navigate(['logout']);
this.snackBar.open('Update Successfully',"Update",{duration: 5 * 1000,});
if (res.status=='success') this.simsNew();
},
error=>{
console.log(error);
});  
}
simsList(){
this.formState='list';
this.http.get<any>(config.apiUrl+'payroll/shift_compliance',this.httpOptions).subscribe(res =>{
if (res.status =='token_expired') return this.routes.navigate(['logout']);
this.lists = res;
},
error=>{
console.log(error);
}
);    
}



simsNew(){
this.formState='form';

this.f={
h:{
early_punch:'',
late_punch:'',
shift:'',
},

i:[{

}]
}

this.dataSource = new MatTableDataSource<any>(this.f.i);

}

simsView(id){
this.formState='form';
this.http.get<any>(config.apiUrl+'payroll/shift_compliance/'+id,this.httpOptions).subscribe(res =>{
if (res.status =='token_expired') return this.routes.navigate(['logout']);
this.f.h = res;
this.f.i=res.timings;

this.dataSource = new MatTableDataSource<any>(this.f.i);

},
error=>{
console.log(error);
});     
}

simsSave(){
let p = this.f.h;
p.timings = this.f.i;
this.http.post<any>(config.apiUrl+'payroll/shift_compliance',p,this.httpOptions).subscribe(res =>{
if (res.status =='token_expired') return this.routes.navigate(['logout']);
this.snackBar.open('Insert Successfully id.'+res.id,"Insert",{duration: 5 * 1000,});
if (res.status=='success') this.simsNew();
},
error=>{
console.log(error);
});   
}
simsDelete(id){
this.http.delete(config.apiUrl+'payroll/shift_compliance/'+id,this.httpOptions).subscribe(() => {
    this.snackBar.open('Deleted Successfully',"Delete",{duration: 5 * 1000,});
this.simsNew();
},error => {
this.snackBar.open(JSON.stringify(error),"Error",);
});
}


inventoryAdd(){
    
this.f.i.push({})
this.dataSource = new MatTableDataSource<any>(this.f.i);

}


inventoryRemove(i){
this.f.i.splice(i,1);
this.dataSource = new MatTableDataSource<any>(this.f.i);
}



}