import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { config } from '../config';
import { map } from 'rxjs/operators';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  checkemailandpassword(uname: string, p: string): any {
    throw new Error("Method not implemented.");
  }
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  //private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);  
    constructor(private http:HttpClient,
      private router:Router
      ) { 
      this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();      
    }
  checkusernameandpassword(uname: string, pwd : string,){
    if(uname == "admin" && pwd =="admin123"){
    localStorage.setItem('username',"admin");
    sessionStorage.setItem('username',"admin");
     //this.loggedIn.next(true);
    return true;
    }
    else{
      return false;
    }
  }

  login(username: string, password: string,cpin: number) {
    let request={
      "email":username,
      "password":password,
      'cpin':cpin
    }
    
    const params = new HttpParams();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    //let url = config.apiUrl+'/payroll_report/attendance_register';
    let url = config.apiUrl+'login';

    return this.http.post<any>(url, request,httpOptions)
    .pipe(map((user: any) => {
          if (user && user.token) {
              localStorage.setItem('currentUser', JSON.stringify(user));
              localStorage.setItem('token', 'Bearer '+user.token);
              config.token = user.token;
              this.currentUserSubject.next(user);
          }            
          return user;
          }));
}

public get currentUserValue(): any {
  return this.currentUserSubject.value;
}


  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    return !(user === null)
  }

  getToken(){
    if (localStorage.getItem('token')){
    return localStorage.token
    }else{
      this.logOut();
    }
  }
  logOut() {
    sessionStorage.removeItem('username');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['login']);
    
  }  
}
