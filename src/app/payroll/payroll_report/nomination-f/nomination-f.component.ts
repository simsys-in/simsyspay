import { Component, OnInit, Input } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { config } from 'src/app/config';
import { FormGroup, FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';

class Employees{
public employee : string;
public employee_code : string;
address : any;
}
@Component({
  selector: 'nomination-f-data',
  templateUrl: './nomination-f.component.html',
  styleUrls: ['./nomination-f.component.scss']
})
export class NominationFComponent implements OnInit {
employees:any;
@Input() emp_info:any;
filteredEmployees:any;
headForm:FormGroup

httpOptions = {
  headers: new HttpHeaders({
  'Content-Type':  'application/json',
  'Authorization': localStorage.token,
  })
  }
  constructor(private http:HttpClient) {
   }

  ngOnInit() {
    this.headForm=new FormGroup ( {
      employee:new FormControl(''),
      employee_id:new FormControl(''),
      address:new FormControl(''),
    });

    this.http.get(config.apiUrl+'payroll/employee',this.httpOptions).subscribe(res =>{
      this.employees = res;
      this.filteredEmployees = this.headForm.controls.employee.valueChanges
      .pipe(startWith(''),
        map(lg => lg?this.employees.filter(employees => employees.employee.toLowerCase().indexOf(lg.toLowerCase()) >= 0) : this.employees.slice())
      );
      });

    }

 employeeSelect(employeeInfo){
    this.headForm.controls.employee_id.setValue(employeeInfo.id);
}

ngAfterViewInit() {
  (document.querySelector('.example-sidenav-container') as HTMLElement).style.height = 'auto';
  (document.querySelector('.example-sidenav-container') as HTMLElement).style.overflow = 'visible';
}
  simsView(id){
    this.http.get<any>(config.apiUrl+'payroll/employee/'+id,this.httpOptions).subscribe(
    res => {
    console.log(res);
    this.emp_info=res;
    },
    error => {
    alert(error);
    });
  }


  onPrint(){
    window.print();
}

}
