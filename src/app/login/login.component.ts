import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { config } from '../config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  headForm: FormGroup
  constructor(private formBuilder:FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.headForm = this.formBuilder.group({
      username:[''],
      password:['']
    });
  }
  get f() { return this.headForm.controls; }

  simsSave(){
    let request={
    }
    
    const params = new HttpParams()

    .set('username', this.f.username.value)

    .set('password', this.f.password.value);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'username' :this.f.username.value,
        'password':this.f.password.value,
        'Authorization':''
      })
    };

    //let url = config.apiUrl+'/payroll_report/attendance_register';
    let url = config.apiUrl+'/login/auth';
    
      this.http.post<any>(url, request,httpOptions).subscribe(res => {
        console.log(res);
      },error => {
          console.log(error);
      });
    }

}
