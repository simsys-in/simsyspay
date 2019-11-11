import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from 'src/app/config';
import { startWith, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';


@Component({
  selector: 'app-employee-category',
  templateUrl: './employee-category.component.html',
  styleUrls: ['./employee-category.component.scss']
})

export class EmployeeCategoryComponent implements OnInit {
  options: FormGroup;
 
   listColumns: string[] =['id','employee_category','action'];
   form:any={
    employee_category: ''
  };
lists:any;
  f:any={
    h:{
       employee_category:'',
         id:'',
           },
  
  
  };

  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': localStorage.token,
    })
    }



  
  snackBar: any;
  formState: string;
  
  constructor(
      fb: FormBuilder,
      private http:HttpClient,
      private routes:Router,
      
    ) {
    this.options = fb.group({
      hideRequired: false,
      floatLabel: 'auto',
    });
 
        
  }


  ngOnInit() {

    this.simsNew();
  }
  simsUpdate(id){
    let p = this.f.h;
  this.http.put<any>(config.apiUrl+'payroll/employee_category/'+id,p,this.httpOptions).subscribe(res =>{
    if (res.status =='token_expired') return this.routes.navigate(['logout']);
    if (res.status=='success') this.simsNew();
    },
    error=>{
      console.log(error);
    });  
  }
  simsList(){
    this.formState='list';
    this.http.get<any>(config.apiUrl+'payroll/employee_category',this.httpOptions).subscribe(res =>{
      if (res.status =='token_expired') return this.routes.navigate(['logout']);
      this.lists = res;
      },
      error=>{
        console.log(error);
      }
      );    
  }


simsPreview(){
  this.formState='preview';
}



  simsNew(){
    this.formState='form';

    this.f={
      h:{
  employee_category:'',
id:'',
},
    
    }

  }
  
  simsView(id){
    
    this.formState='form';
    this.http.get<any>(config.apiUrl+'payroll/employee_category/'+id,this.httpOptions).subscribe(res =>{
      if (res.status =='token_expired') return this.routes.navigate(['logout']);
      this.f.h = res;
     
      },
      error=>{
        console.log(error);
      });     
  }



simsSave(){
  let p = this.f.h;
  this.formState='form'
  this.http.post<any>(config.apiUrl+'payroll/employee_category',p,this.httpOptions).subscribe(res =>{
    if (res.status =='token_expired') return this.routes.navigate(['logout']);
    if (res.status=='success') this.simsNew();
    },
    error=>{
      console.log(error);
    });   
}
simsDelete(id){
  this.http.delete(config.apiUrl+'payroll/employee_category/'+id,this.httpOptions).subscribe(() => {
    this.snackBar.open('Deleted Successfully',"Delete",{duration: 5 * 1000,});
  this.simsNew();
  },error => {
     this.snackBar.open(JSON.stringify(error),"Error",);
  });
}



}