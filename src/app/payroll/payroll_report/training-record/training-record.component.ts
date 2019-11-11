import { Component, OnInit, Input } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { config } from 'src/app/config';
import { FormGroup, FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { identifierModuleUrl, analyzeAndValidateNgModules } from '@angular/compiler';
import { NavService } from 'src/app/service/nav.service';

class Employees{
public employee : string;
public employee_code : string;
address : any;
}
@Component({
  selector: 'app-training-record',
  templateUrl: './training-record.component.html',
  styleUrls: ['./training-record.component.scss']
})
export class TrainingRecordComponent implements OnInit {
@Input() employees:any;
@Input() info:any;
  options: FormGroup;

  formState:any;
  s:any={
  h:{
  employee:'',
  employee_code:''
  },
info:{

}
  
  };
  
  filteredEmployees: any;
headForm:FormGroup

httpOptions = {
  headers: new HttpHeaders({
  'Content-Type':  'application/json',
  'Authorization': localStorage.token,
  })
  }
  constructor(private http:HttpClient,
    private nav:NavService
    ) {
    this.http.get<any>(config.apiUrl+'payroll/employee',this.httpOptions).subscribe(res =>{
      //if (res.status =='token_expired') return this.routes.navigate(['logout']);
      this.employees = res;
    
    })
   
    }

    employeeFilter(typing){
      this.filteredEmployees= (typeof(typing) != 'object')?this.employees.filter(row => row.employee.toLowerCase().indexOf(typing.toLowerCase()) >= 0) : this.employees.slice()
      }
      
      employeeSelect(ac){
      let row = ac.option.value;
      this.s.h.employee_code=row.employee_code;
      this.s.h.employee=row.employee;
      }

  ngOnInit() {

    }

    ngAfterViewInit() {
      (document.querySelector('.example-sidenav-container') as HTMLElement).style.height = 'auto';
      (document.querySelector('.example-sidenav-container') as HTMLElement).style.overflow = 'visible';
  }



  simsView(id){
       this.formState='form';
    this.http.get<any>(config.apiUrl+'payroll/employee/'+id,this.httpOptions).subscribe(
    res => {
      this.s.info=res;
    console.log(res);
        },
    error => {
    alert(error);
    });
  }

  print(){
    window.print();
}
toggle(){
  this.nav.toggle();
}

}
