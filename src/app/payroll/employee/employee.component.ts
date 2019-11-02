import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from 'src/app/config';
import { startWith, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { PARAMETERS } from '@angular/core/src/util/decorators';


@Component({
selector: 'app-employee',
templateUrl: './employee.component.html',
styleUrls: ['./employee.component.scss']
})

export class EmployeeComponent implements OnInit {
  
  displayedColumns: any[] = ['degree','college','passout','class','city','action'];
  displayedColumnse: any[] = ['organization','designation','date_from','date_to','experience','salary','action'];
  displayedColumnsf:any[]=['person_name','dob','relationship','occupation','age','action'];

  name: string;
  position: number;
  weight: number;
  symbol: string;

options: FormGroup;
listColumns: string[] =['sno','id','employee','action'];


lists:any;
f:any={
h:{
employee:'',
employee_code:'',
dob:'',
bank:'',
bank_id:'',
employee_category:'',
employee_category_id:'',
gender:'',
uno_code:'',
marital_status:'',
have_vehicle:'',
driving_license_no:'',
expected_salary:'',
expected_designation:'',
appointed_id:'',
authorized_id:'',
shift:'',
shift_id:'',
department:'',
department_id:'',
designation:'',
designation_id:'',
branch:'',
branch_id:'',
emp_status:'',
narration:'',
address:'',
email:'',
phone:'',
mobile:'',
joined:'',
resign_date:'',
esino:'',
pfno:'',
panno:'',
adharno:'',
salary:'',
basic:'',
ot:'',
shift_compliance:'',
shift_id_compliance:'',
bankacname:'',
bankacno:'',
ifsc_code:'',
bank_branch:'',
},
 i:[{

 }],

 e:[{

 }],
 t:[{
 }]
};

formState:String='form';

qualifications = new MatTableDataSource<any>(this.f.i);

experiences = new MatTableDataSource<any>(this.f.e);

families = new MatTableDataSource<any>(this.f.t);

httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json',
'Authorization': localStorage.token,
})
}
departments: any;
filteredDepartments: any;

designations: any;
filteredDesignations: any;

branches:any;
filteredBranches:any;

banks:any;
filteredBanks:any;

shifts:any;
filteredShifts:any;

employee_categories:any;
filteredEmployee_categories:any;

inventory: any;
snackBar: any;
employee_experiences: any;
employee_qualifications: any;

shift_compliances: any;
filteredShift_compliances: any;

  employee_families: any;
  receive: string;
  

constructor(
fb: FormBuilder,
private http:HttpClient,
public routes:ActivatedRoute,

) {
this.options = fb.group({
hideRequired: false,
floatLabel: 'auto',
});



this.http.get<any>(config.apiUrl+'payroll/department',this.httpOptions).subscribe(res =>{

this.departments = res;

},
error=>{
console.log(error);
}
);
this.http.get<any>(config.apiUrl+'payroll/designation',this.httpOptions).subscribe(res =>{

this.designations = res;
},
error=>{
console.log(error);
}
);
this.http.get<any>(config.apiUrl+'payroll/branch',this.httpOptions).subscribe(res =>{

this.branches = res;
},
error=>{
console.log(error);
}
);
this.http.get<any>(config.apiUrl+'payroll/bank',this.httpOptions).subscribe(res =>{

this.banks = res;
},
error=>{
console.log(error);
}
);
this.http.get<any>(config.apiUrl+'payroll/employee_category',this.httpOptions).subscribe(res =>{

this.employee_categories = res;
},
error=>{
console.log(error);
}
);
this.http.get<any>(config.apiUrl+'payroll/shift',this.httpOptions).subscribe(res =>{

this.shifts = res;
},
error=>{
console.log(error);
}
);

this.http.get<any>(config.apiUrl+'payroll/shift_compliance',this.httpOptions).subscribe(res =>{
  
  this.shift_compliances = res;
  },
  error=>{
  console.log(error);
  }
  );





/** Gets the total cost of all transactions. */

}


ngOnInit() {
  //this.simsNew();
  this.routes.queryParams.subscribe((params)=>{ 
 let detail_id=JSON.parse(params.data);
 this.test(detail_id);

}) 

}

ngAfterViewInit(){
  
 
}
doFilter(filterValue:string){
this.lists.filter=filterValue.trim().toLowerCase();
}

simsUpdate(id){
let p = this.f.h;
p.employee_qualifications=this.f.i;
p.employee_experiences=this.f.e;
p.employee_families=this.f.t;
this.http.put<any>(config.apiUrl+'payroll/employee/'+id,p,this.httpOptions).subscribe(res =>{
  this.snackBar.open('updated Successfully',"Updated",{duration: 5 * 1000,});
if (res.status=='success') this.simsNew();
},
error=>{
console.log(error);
});  
}
simsList(){
this.formState='list';
this.http.get<any>(config.apiUrl+'payroll/employee',this.httpOptions).subscribe(res =>{

this.lists = res;
let a=this.lists;
console.log(a);
},
error=>{
console.log(error);
}
);    
}


simsPreview(){
this.formState='preview';
}
simsNew(){
this.formState='form';

this.f={
h:{
  employee:'',
  employee_code:'',
  dob:'',
  bank:'',
  bank_id:'',
  employee_category:'',
  employee_category_id:'',
  gender:'',
  uno_code:'',
  marital_status:'',
  have_vehicle:'',
  driving_license_no:'',
  expected_salary:'',
  expected_designation:'',
  appointed_id:'',
  authorized_id:'',
  shift:'',
  shift_id:'',
  department:'',
  department_id:'',
  designation:'',
  designation_id:'',
  branch:'',
  branch_id:'',
  emp_status:'',
  narration:'',
  address:'',
  email:'',
  phone:'',
  mobile:'',
  joined:'',
  resign_date:'',
  esino:'',
  pfno:'',
  panno:'',
  adharno:'',
  salary:'',
  basic:'',
  ot:'',
  shift_compliance:'',
  shift_id_compliance:'',
  bankacname:'',
  bankacno:'',
  ifsc_code:'',
  bank_branch:'',
},
 i:[{
  
}],
 e:[{}],
t:[{}]
}



};

simsView(id){
this.formState='form';
this.http.get<any>(config.apiUrl+'payroll/employee/'+id,this.httpOptions).subscribe(res =>{

this.f.h = res;
this.f.i=res.employee_qualifications;
console.table(this.f.i);
this.f.e=res.employee_experiences;
this.f.t=res.employee_families;
},
error=>{
console.log(error);
});     
}

test(id){
  
  this.http.get<any>(config.apiUrl+'payroll/employee/'+id,this.httpOptions).subscribe(res =>{
  //if (res.status =='token_expired') return this.routes.navigate(['logout'])
  this.f.h = res;
 
  },
  error=>{
    
  console.log(error);
  });     
  }


bankFilter(typing){
this.filteredBanks = (typeof(typing) != 'object')?this.banks.filter(row => row.bank.toLowerCase().indexOf(typing.toLowerCase()) >= 0) : this.banks.slice()
}

bankSelect(ac){
let row = ac.option.value;
this.f.h.bank_id=row.id;
this.f.h.bank=row.bank;
}
branchFilter(typing){
this.filteredBranches= (typeof(typing) != 'object')?this.branches.filter(row => row.branch.toLowerCase().indexOf(typing.toLowerCase()) >= 0) : this.branches.slice()
}

branchSelect(ac){
let row = ac.option.value;
this.f.h.branch_id=row.id;
this.f.h.branch=row.branch;
}
departmentFilter(typing){
this.filteredDepartments= (typeof(typing) != 'object')?this.departments.filter(row => row.department.toLowerCase().indexOf(typing.toLowerCase()) >= 0) : this.departments.slice()
}

departmentSelect(ac){
let row = ac.option.value;
this.f.h.department_id=row.id;
this.f.h.department=row.department;
}
designationFilter(typing){
this.filteredDesignations= (typeof(typing) != 'object')?this.designations.filter(row => row.designation.toLowerCase().indexOf(typing.toLowerCase()) >= 0) : this.designations.slice()
}

designationSelect(ac){
let row = ac.option.value;
this.f.h.designation_id=row.id;
this.f.h.designation=row.designation;
}
employee_categoryFilter(typing){
this.filteredEmployee_categories= (typeof(typing) != 'object')?this.employee_categories.filter(row => row.employee_category.toLowerCase().indexOf(typing.toLowerCase()) >= 0) : this.employee_categories.slice()
}

employee_categorySelect(ac){
let row = ac.option.value;
this.f.h.employee_category_id=row.id;
this.f.h.employee_category=row.employee_category;
}

shift_complianceFilter(typing){
this.filteredShift_compliances= (typeof(typing) != 'object')?this.shift_compliances.filter(row => row.shift.toLowerCase().indexOf(typing.toLowerCase()) >= 0) : this.shift_compliances.slice()
}

shift_complianceSelect(ac){
let row = ac.option.value;
this.f.h.shift_id_compliance=row.id;
this.f.h.shift_compliance=row.shift;
}

shiftFilter(typing){
  this.filteredShifts= (typeof(typing) != 'object')?this.shifts.filter(row => row.shift.toLowerCase().indexOf(typing.toLowerCase()) >= 0) : this.shifts.slice()
  }
  
  shiftSelect(ac){
  let row = ac.option.value;
  this.f.h.shift_id=row.id;
  this.f.h.shift=row.shift
  }




simsSave(){
  
let p = this.f.h;
p.employee_qualifications=this.f.i;
p.employee_experiences=this.f.e;
p.employee_families=this.f.t;
this.http.post<any>(config.apiUrl+'payroll/employee',p,this.httpOptions).subscribe(res =>{
  this.snackBar.open('saved Successfully',"Saved",{duration: 5 * 1000,});
if (res.status=='success') this.simsNew();
},
error=>{
console.log(error);
});   
}
simsDelete(id){
this.http.delete(config.apiUrl+'payroll/employee/'+id,this.httpOptions).subscribe(() => {
  this.simsNew();
this.snackBar.open('Deleted Successfully',"Delete",{duration: 5 * 1000,});

},error => {
this.snackBar.open(JSON.stringify(error),"Error",);
});
}

inventoryAdd(){
  this.f.i.push({})
  this.employee_qualifications = new MatTableDataSource<any>(this.f.i);
  }
  
  
  inventoryRemove(i){
  this.f.i.splice(i,1);
  this.employee_qualifications = new MatTableDataSource<any>(this.f.i);
  }
add(){
   this.f.e.push({})
  this.employee_experiences=new MatTableDataSource<any>(this.f.e);
}
remove(i){
  this.f.e.splice(i,1);
  this.employee_experiences=new MatTableDataSource<any>(this.f.e);
}        

plus(){
  this.f.t.push({})
  this.employee_families=new MatTableDataSource<any>(this.f.t);
  }
minus(i){
  this.f.t.splice(i,1);
  this.employee_families=new MatTableDataSource<any>(this.f.t);
}

}