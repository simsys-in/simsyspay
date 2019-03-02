import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { config } from '../config';
import { MyServiceService } from '../my-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers:[MyServiceService]
})
export class LoginComponent implements OnInit {
  headForm: FormGroup;
  msg ='';
  constructor(private formBuilder:FormBuilder, 
    private http: HttpClient,
    private routes: Router,
    private service:MyServiceService
    ) { }


  ngOnInit() {
    this.headForm = this.formBuilder.group({
      username:[''],
      password:['']
    });
  }

  check(uname: string, p : string){
    var output = this.service.checkusernameandpassword(uname, p);
    if(output == true){
      this.routes.navigate(['/dashboard']);
    }
    else{
      this.msg ='Invalid username or password';
    }
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
