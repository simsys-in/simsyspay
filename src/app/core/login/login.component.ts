import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { HttpHeaders, HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { config } from '../../config';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first, catchError, map } from 'rxjs/operators';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material';
import { throwError } from 'rxjs';

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
  hide=true;
  error='';
  isLoading = false;
  constructor(private formBuilder:FormBuilder, 
    private http: HttpClient,
    private routes: Router,
    private service:AuthService,
    private route: ActivatedRoute
    ) { }

    
    username = new FormControl('', [
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
      username:['',[ Validators.required,Validators.email]],
      password:[''],
      cpin : ['']
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
  this.isLoading=true;
  this.error='';
  
  this.service.login(this.username.value,this.password.value,this.cpin.value)
  .pipe(first()
  )
  .subscribe(
      data => {
          //this.routes.navigate([this.returnUrl]);            
          this.routes.navigate([this.returnUrl]);
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
}
