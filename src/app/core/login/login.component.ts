import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { config } from '../../config';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  //selector: 'app-login',
  templateUrl: './login.component.html',
  //styleUrls: ['./login.component.scss'],
  //providers:[AuthService]
  providers: [
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ]
})
export class LoginComponent implements OnInit {
  headForm: FormGroup;
  msg ='';
  returnUrl: string;
  hide=true;
  constructor(private formBuilder:FormBuilder, 
    private http: HttpClient,
    private routes: Router,
    private service:AuthService,
    private route: ActivatedRoute
    ) { }

    
    emailFormControl = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);    

    matcher = new MyErrorStateMatcher();
  ngOnInit() {
    this.headForm = this.formBuilder.group({
      username:['',[ Validators.required,Validators.email]],
      password:[''],
      company_code :['']
    });


    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
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
  this.service.login(this.f.username.value,this.f.password.value)
  .pipe(first())
  .subscribe(
      data => {
          console.log(data);
          //this.routes.navigate([this.returnUrl]);
          if (data.status !='failed'){
          this.routes.navigate([this.returnUrl]);
            //location.reload(true);
          }
      },
      error => {
          console.log(error);
      });
}

  simsSave1(){
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
