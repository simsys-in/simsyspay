import { Component, OnInit, Input } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { config } from 'src/app/config';
import { FormGroup, FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-payslip-compliance',
  templateUrl: './payslip-compliance.component.html',
  styleUrls: ['./payslip-compliance.component.scss']
})
export class PayslipComplianceComponent implements OnInit {


httpOptions = {
  headers: new HttpHeaders({
  'Content-Type':  'application/json',
  'Authorization': localStorage.token,
  })
  }
  s:any={
   vou_date:'',
   joined:'',
   esi:'',
   pf:'',
   employee_code:'',
   employee:'',
   designation:'',
   basic:'',
   shift_count:'',
   emp_status:'',
   gross_salary:'',
   basic_salary:'',
   deduction_total:'',
  ot:'',
  o_wages:'',
  net_pay:'',
  


 }

 total_salary: any;
  d: number;
  formState:String;
  

  
  
  constructor(private http:HttpClient,
     private router:Router,
     private routes:ActivatedRoute
    ) {
   }

  ngOnInit() {

 this.routes.queryParams.subscribe((params)=>{     
this.s.detail_id=JSON.parse(params.data);
console.log(this.s.detail_id);
this.query_detail();

      });
   }
query_detail(){
  this.formState='test';
let t=this.s.detail_id;
console.log(t);
    this.http.get<any>(config.apiUrl+'payroll/salary_compliance/query_details?detail_id='+t,this.httpOptions).subscribe(
    res => {
     this.s=res;
     


//let total_salary=parseInt(this.datas.basic_salary)+parseInt(this.datas.ot_wages);
  },
    error => {
    alert(error);
    });
}

simsPrint(){
  window.print();
}


}
