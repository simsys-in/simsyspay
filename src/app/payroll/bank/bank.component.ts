import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { config } from '../../config';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
    })
 
export class BankComponent implements OnInit {
  bank: any;
     rows:any;
     method:any;
    get:any;
    headForm: FormGroup;
   searchTerm : FormControl = new FormControl();
 
      httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': JSON.parse(localStorage.getItem('currentUser')).apiKey
    })
  }
  constructor(
    private http: HttpClient,
    private route:ActivatedRoute,
    
    
  ) { 
      }
  //ngOninit consider as onload
    ngOnInit() {
       this.headForm=new FormGroup ( {
         bank:new FormControl('')
         })
    
    if (this.route.snapshot.params['id']) this.simsView(this.route.snapshot.params['id']);
    }
    //function declaration
   ngAfterViewInit() {
         this.headForm;
         this.simsList();
        
       };
  simsSave(){
    let  request=this.headForm.value;
   this.http.post<any>(config.apiUrl+'/payroll/bank/save',request,this.httpOptions).subscribe(res => {
      console.log(res);
    },error => {
      console.log(error);
    });
   }
   simsDelete(id){
    
   }
     simsList(){
         const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization':JSON.parse(localStorage.getItem('currentUser')).apiKey
  })
};

this.http.get<any>(config.apiUrl+'/payroll/bank/query',httpOptions).subscribe(res => {
   this.rows = res;
});
}
get f() { return this.headForm.controls; }
simsView(id){
    const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    'Authorization':JSON.parse(localStorage.getItem('currentUser')).apiKey
  })
};
this.http.post<any>(config.apiUrl+'/payroll/bank/query',{id:id,method:'get'},httpOptions).subscribe(res => {
   this.f.bank.setValue(res.bank);
     },
      error => {
        console.log(error);
});}

}
