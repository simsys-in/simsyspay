import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router'
import { startWith, map } from 'rxjs/operators';
import { config } from 'src/app/config';
import { hasLifecycleHook } from '@angular/compiler/src/lifecycle_reflector';
import { CloseScrollStrategy } from '@angular/cdk/overlay';

import * as moment from 'moment';

@Component({
selector: 'app-timecard-compliance',
templateUrl: './timecard-compliance.component.html',
styleUrls: ['./timecard-compliance.component.scss']
})
export class TimecardComplianceComponent implements OnInit {

isForm = true;
httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json',
'Authorization': localStorage.token,
})
}
form:any={

};

formState:String='form';
s:any={
h:{
employee:'',
from_date:moment().format(),
to_date:moment().format(),
employee_code:''
},
i:{

},
t:{
    total:''
},

};
employees: any;
filteredEmployees: any;


options: FormGroup;
    shift_count: any;
    

constructor(
private http: HttpClient,
private routes:ActivatedRoute,
private fb: FormBuilder,



) { this.options = fb.group({
hideRequired: false,
floatLabel: 'auto',
});

this.http.get<any>(config.apiUrl+'payroll/employee',this.httpOptions).subscribe(res =>{
//if (res.status =='token_expired') return this.routes.navigate(['logout']);
this.employees = res;

})


}

ngOnInit() {

}

simsPrint(){
window.print();
}

employeeFilter(typing){
this.filteredEmployees= (typeof(typing) != 'object')?this.employees.filter(row => row.employee.toLowerCase().indexOf(typing.toLowerCase()) >= 0) : this.employees.slice()
}

employeeSelect(ac){
let row = ac.option.value;
this.s.h.employee_code=row.employee_code;
this.s.h.employee=row.employee;
}


query_detail(){
let p = this.s.h;
p.from_date = moment(this.s.h.from_date).format('YYYY/MM/DD');
p.to_date = moment(this.s.h.to_date).format('YYYY/MM/DD');

this.http.post<any>(config.apiUrl+'payroll/payroll_report/timecard_compliance',p,this.httpOptions).subscribe(res =>{
this.s.i=res;
this.s.t=res['holidays_count'];
console.log(this.s.t);
//console.log(this.s.i);
this.s.t=parseInt(this.s.t['0']['total'])+parseInt(this.s.t['1']['total']);
console.log(this.s.t);
this.s.e=res['emp_lev_count'];
this.s.e=this.s.e['0']['total'];
console.log(this.s.e);
},
error=>{
console.log(error);
}
);

} 

}


