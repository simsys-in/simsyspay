import { Component, OnInit, Input, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource, MatDatepicker } from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from 'src/app/config';
import { MatSnackBar } from '@angular/material';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import * as moment from 'moment';
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas'; 
import jsPDF from 'jspdf';
import 'jspdf-autotable';
@Component({
selector: 'app-salary-compliance',
templateUrl: './salary-compliance.component.html',
styleUrls:['./salary-compliance.component.scss']
})

export class SalaryComplianceComponent implements OnInit {
options: FormGroup;
displayedColumns: any[] = ['action','action2','employee','employee_code','day1','day2','day3','day4','day5','day6','day7','day8','day9','day10','day11', 'day12','day13','day14','day15','day16','day17','day18','day19','day20','day21','day22','day23','day24','day25','day26','day27','day28','day29','day30','day31','year','emp_sl_count','total_shift','holiday','emp_el_count','total_workingdays','ot_count','ot_wages','basic','basic_salary','gross_salary','deduction_total','ot_per_hr','overall_ot_wages','esi','pf','net_pay'];
a:any;

listColumns: any[]=['id','month','action'];
@Input() g;

lists:any;
date = new Date();

f:any={
h:{
    id:'',
    year:'',
month:'',
from_date: moment().format(),
to_date:moment().format(),
working_days:'',
vou_date:moment().format(),
emp_lev_count:'',
total:''
},

i:[{

}]
};
s:any={
    employeeList_loading:false,
    i:[{
        isLoading:false
    }],
    timecard:0,
}
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
    datas: any;
    location: any;

    scrollTopService: any;
    holidays_count: any;
    emp_lev_count: any;
    


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

public print()  
{  
    
     var data = document.getElementById('contentToConvert');  
     html2canvas(data).then(canvas => {  
     //Few necessary setting options  
     var imgWidth = 280;   
     var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
    var heightLeft = imgHeight;  
  
       const contentDataURL = canvas.toDataURL('image/png')  
       let pdf = new jspdf('l', 'mm', 'a3'); // A4 size page of PDF  
      var position=0;
          pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
       pdf.save('MYPdf.pdf'); // Generated PDF   
     }); 

} 




simsPrint(){
    this.formState='print';
}

simsUpdate(id){
let p = this.f.h;
p.inventories = this.f.i;
p.from_date = moment(this.f.h.from_date).format('YYYY/MM/DD');
p.to_date = moment(this.f.h.to_date).format('YYYY/MM/DD');
p.vou_date = moment(this.f.h.vou_date).format('YYYY/MM/DD');
this.http.put<any>(config.apiUrl+'payroll/salary_compliance/'+id,p,this.httpOptions).subscribe(res =>{
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
    this.http.get<any>(config.apiUrl+'payroll/salary_compliance',this.httpOptions).subscribe(res =>{
    if (res.status =='token_expired') return this.routes.navigate(['logout']);
    this.lists = res;
    },
    error=>{
    console.log(error);
    }
    );    
}

employeeList(){
    
    this.s.employeeList_loading = true;
    this.f.i = [{}];
    this.s.i = [{}]
    this.http.post<any>(config.apiUrl+'payroll/payroll_report/log_between_group_employee',this.f.h,this.httpOptions).subscribe(res =>{
        
        if (res.status =='token_expired') return this.routes.navigate(['logout']);
        res.forEach((row,i) =>{
            this.f.i[i]=row;
            this.s.i[i]= {
                isLoading:false
            }
        });
        this.dataSource = new MatTableDataSource<any>(this.f.i);
        this.s.employeeList_loading = false;
        },
        error=>{
            console.log(error);
        }
        );
}
getEmpShift(index){
    let p = this.f.h;
    p.from_date = moment(this.f.h.from_date).format('YYYY/MM/DD');
p.to_date = moment(this.f.h.to_date).format('YYYY/MM/DD');
p.vou_date = moment(this.f.h.vou_date).format('YYYY/MM/DD');
    console.log(p);
    p.employee_code = this.f.i[index].employee_code;
    this.s.i[index].isLoading = true;
    this.http.post<any>(config.apiUrl+'payroll/payroll_report/timecard_compliance',p,this.httpOptions).subscribe(res =>{
        
        if (res.status =='token_expired') return this.routes.navigate(['logout']);
         this.f.i[index]= res;
         console.log(this.f.i[index]);
        this.s.i[index].isLoading = false;
        },
        error=>{
        console.log(error);
        }
        );

}


test(index){
   this.formState="timecard";
this.s.timecard=index;

}


getPaySlip(index){
    
    let p = this.f.h;
    p.employee_code = this.f.i[index].employee_code;
    this.s.i[index].isLoading = true;
    this.http.post<any>(config.apiUrl+'payroll/payroll_report/payslip',p,this.httpOptions).subscribe(res =>{
        
        if (res.status =='token_expired') return this.routes.navigate(['logout']);
        this.f.i[index] = res;
        this.s.i[index].isLoading = false;
        },
        error=>{
        console.log(error);
        }
        );


}


sanitizeDate(date: string): string {
    if (!date) {
      return null;
    }
  
    const dataArray = date.split(' ');
    const month = Number(dataArray[0]) - 1;
    const day = Number(dataArray[1]);
    const year = Number(dataArray[2]);
    return (new Date(year, month, day)).toISOString();
  }

simsNew(){
this.formState='form';

this.f={
h:{
month:'',
year:'',
from_date:moment().format(),
to_date:moment().format(),
working_days:'',
},

i:[{

}]
}

this.dataSource = new MatTableDataSource<any>(this.f.i);

}


simsView(id){
  
this.formState='form';
this.f.i = [];
this.s.i = [];
this.http.get<any>(config.apiUrl+'payroll/salary_compliance/'+id,this.httpOptions).subscribe(res =>{
if (res.status =='token_expired') return this.routes.navigate(['logout']);
this.f.h = res;
res.inventories.forEach((row,i) =>{
    this.f.i[i]=row;
    this.s.i[i]= {
        isLoading:false
    }
});

this.dataSource = new MatTableDataSource<any>(this.f.i);

},
error=>{
console.log(error);
});     
}

simsSave(){
    let now = moment();
    console.log(now.add(7, 'days').format());

let p = this.f.h;
p.from_date = moment(this.f.h.from_date).format('YYYY/MM/DD');
p.to_date = moment(this.f.h.to_date).format('YYYY/MM/DD');
p.vou_date = moment(this.f.h.vou_date).format('YYYY/MM/DD');

p.inventories = this.f.i;

this.http.post<any>(config.apiUrl+'payroll/salary_compliance',p,this.httpOptions).subscribe(res =>{
if (res.status =='token_expired') return this.routes.navigate(['logout']);
this.snackBar.open('Insert Successfully id.'+res.id,"Insert",{duration: 5 * 1000,});
if (res.status=='success') this.simsNew();
},
error=>{
console.log(error);
});   
}

simsDelete(id){
this.http.delete(config.apiUrl+'payroll/salary_compliance/'+id,this.httpOptions).subscribe(() => {
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

saveCall(index){
    let data:any=this.f.i[index].id;
    //console.log(data);
    this.routes.navigate(['/payroll/payroll_report/payslip_compliance'],
  {
    queryParams:{data:JSON.stringify(data)}
    })
}



back(){
    this.formState="form";
}

otForm(){
    this.formState="ot";
}

}

export const APP_DATE_FORMATS =
{
   parse: {
       dateInput: {month: 'short', year: 'numeric', day: 'numeric'}
   },
   display: {
       dateInput: 'input',
       monthYearLabel: 'inputMonth',
       dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
       monthYearA11yLabel: {year: 'numeric', month: 'long'},
   }
}
