import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { config } from 'src/app/config';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
})
export class EmployeeListComponent implements OnInit {

  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.simsList();
  }

  simsList(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization':'Basic @#$3422234sdfsdf23423'
      })
    };

      this.http.post<any>(config.apiUrl+'payroll/employee/query', {},httpOptions).subscribe(res => {
        console.log(res);
      },error => {
          console.log(error);
      });
    }
}
