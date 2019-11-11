import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router'
import { startWith, map } from 'rxjs/operators';
import { config } from 'src/app/config';
import { hasLifecycleHook } from '@angular/compiler/src/lifecycle_reflector';
import { CloseScrollStrategy } from '@angular/cdk/overlay';

import * as moment from 'moment';
import { NavService } from 'src/app/service/nav.service';

@Component({
selector: 'app-device-logs',
templateUrl: './device-logs.component.html',
styleUrls: ['./device-logs.component.scss']
})
export class DeviceLogsComponent implements OnInit {

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
dated:moment().format(),
employee_code:''
},
i:{

}

};
employees: any;
filteredEmployees: any;


options: FormGroup;
    shift_count: any;
    

constructor(
private http: HttpClient,
private routes:ActivatedRoute,
private fb: FormBuilder,
private nav:NavService,


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
p.dated = moment(this.s.h.dated).format('YYYY/MM/DD');
this.http.post<any>(config.apiUrl+'payroll/payroll_report/device_logs',p,this.httpOptions).subscribe(res =>{
this.s.i=res;
console.log(res);

},
error=>{
console.log(error);
}
);

} 
toggle(){
    this.nav.toggle();
}

}


