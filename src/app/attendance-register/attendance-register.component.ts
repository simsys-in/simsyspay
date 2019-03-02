import { Component, OnInit } from '@angular/core';
import { config } from '../config';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material';
import { formatDate } from '@angular/common';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: any = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-attendance-register',
  templateUrl: './attendance-register.component.html',
})

export class AttendanceRegisterComponent implements OnInit {
  name: string;
  position: number;
  weight: number;
  symbol: string;

  
  displayedColumns:any;
  dataSource : any;

  headForm: FormGroup
  
  constructor(
private http: HttpClient,
private formBuilder:FormBuilder,
private dateAdapter: DateAdapter<Date>,
) {
  //this.dateAdapter.setLocale('en-IN');
}

  ngOnInit() {
    this.headForm = this.formBuilder.group({
      date_from : ['',Validators.required],
      date_to : ['',Validators.required]
    });    
  }
  get f() { return this.headForm.controls; }

  simsList(){
    let date_from = formatDate(new Date(this.f.date_from.value),'yyyy/MM/dd', 'en');
    let date_to = formatDate(new Date(this.f.date_to.value),'yyyy/MM/dd', 'en');
    
    let request={
      date_from:date_from,
      date_to:date_to
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization':'Basic @#$3422234sdfsdf23423'
      })
    };

    //let url = config.apiUrl+'/payroll_report/attendance_register';
    let url = config.apiUrl+'/api/payroll/attendance_register';
    
      this.http.post<any>(url, request,httpOptions).subscribe(res => {
        this.displayedColumns = res.days;
        this.dataSource = res.employees;
        //console.log(res.employee_category)
      },error => {
          console.log(error);
      });
    }

    sanitizeDate(date: string): string {
      if (!date) {
        return null;
      }
    
      const dataArray = date.split('-');
      const month = Number(dataArray[0]) - 1;
      const day = Number(dataArray[1]);
      const year = Number(dataArray[2]);
      return (new Date(year, month, day)).toISOString();
    }

    toApiDate(bDate) {
      const apiDate: string = new Date(bDate).toUTCString();
      return apiDate;
    }

    fromJsonDate(jDate): string {
      const bDate: Date = new Date(jDate);
      return bDate.toISOString().substring(0, 10);  //Ignore time
    }

}
