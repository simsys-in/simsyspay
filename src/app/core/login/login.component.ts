import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { HttpHeaders, HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { config } from '../../config';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first, catchError, map } from 'rxjs/operators';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material';
import { throwError } from 'rxjs';
import { StaticInjector } from '@angular/core/src/di/injector';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  //selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  //providers:[AuthService]
  providers: [
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ]
})
export class LoginComponent implements OnInit {
    headForm: FormGroup;
  msg ='';
  returnUrl: string;
  token:any ;
  value : any; 
  hide=true;
  error='';
  isLoading = false;
  constructor(private formBuilder:FormBuilder, 
    private http: HttpClient,
    private routes: Router,
    private service:AuthService,
    private route: ActivatedRoute
    ) { }

    
    email = new FormControl('', [
      Validators.required,
      Validators.email,
    ]); 
    password = new FormControl('',[Validators.required]);
    cpin = new FormControl('',[Validators.required]);

    matcher = new MyErrorStateMatcher();

    ngAfterViewInit() {
      document.querySelector('mat-sidenav-content').classList.add('bg-login');
  }

  ngOnDestroy() {
    document.querySelector('mat-sidenav-content').classList.remove('bg-login');
}
  ngOnInit() {
    this.headForm = this.formBuilder.group({
      email:['',[ Validators.required,Validators.email]],
      password:[''],
      cpin : ['']
    });


    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.headForm.controls; }

simsSave(){

  let  request=this.headForm.value;
  this.isLoading=true;
  this.error='';
let httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };
  this.service.login(this.f.email.value,this.f.password.value,this.f.cpin.value)
  .pipe(first()
  )
  .subscribe(
      data => {
        console.table(data);
          console.log(localStorage.setItem('currentUser', JSON.stringify(data)));
          //this.routes.navigate([this.returnUrl]);
          (this.routes.navigate([this.returnUrl]));
          //location.reload(true);
          this.isLoading=false;
      },
      err => {
        this.isLoading=false;
        if (err.error.success==false){
            this.error=err.error.error;
        }else if(err.error.errors){
          this.error = err.error.errors;
        }else{
          this.error = err.error.message;
        }
          

      })
}
  httpOptions<T>(arg0: string, request: any, httpOptions: any): any {
    throw new Error("Method not implemented.");
  }
}
