import { Component, OnInit, Input, PipeTransform, Pipe } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router'
import { config } from 'src/app/config';


import * as moment from 'moment';
@Component({
selector: 'app-punch-log-betweendate',
templateUrl: './punch-log-betweendate.component.html',
styleUrls: ['./punch-log-betweendate.component.scss']
})


export class PunchLogBetweenDateComponent implements OnInit {

 
isForm = true;
httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json',
'Authorization': localStorage.token,
})
}
form:any={

};
arrCase : object [];
employee:object[];



formState:String;
s:any={
h:{

from_date:moment().format(),
to_date:moment().format(),

},

i:{
days:''
},
t:{
employee:''
},

};
options: FormGroup;

y:{

}

constructor(
private router:Router,
private http: HttpClient,
private routes:Router,
private fb:FormBuilder

) { this.options = fb.group({
hideRequired: false,
floatLabel: 'auto',

});
}
ngOnInit() {
  
}


simsPrint(){
window.print();
}
query_detail(){
this.formState='list';
let p = this.s.h;
p.from_date = moment(this.s.h.from_date).format('YYYY/MM/DD');
p.to_date = moment(this.s.h.to_date).format('YYYY/MM/DD');
this.http.post<any>(config.apiUrl+'payroll/payroll_report/punch_log_date_between',p,this.httpOptions).subscribe(res =>{
this.s.i=res.days as string[];
console.table(this.s.i[0]);

 this.s.t =res.employee;
 console.log(this.s.t);
  //this.s.t=res.employee[0]["employee_code"];
//  console.table(this.s.t);
let y=res.logs;
console.table(y);

},
error=>{
console.log(error);
}
);
} 


getKeys(obj){
    return Object.keys(obj)
  }

load(id){
    let data:any=id.employee_code;
 this.routes.navigate(['/payroll/employee'],
  {
    queryParams:{data:JSON.stringify(data)}
    })
}
}


