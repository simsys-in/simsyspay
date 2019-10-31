import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable, from } from 'rxjs';
import {map, debounceTime} from 'rxjs/operators';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { config } from 'src/app/config';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-form',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  //providers: [BooksService]
})

export class ProductComponent implements OnInit {
  
  headForm: FormGroup;
  searchTerm : FormControl = new FormControl();
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': localStorage.token
    })
  }

  myBooks:any;
  product_groups:any;
  product_categories:any;

  constructor(
    private http: HttpClient,
    private formBuilder:FormBuilder,
    private route:ActivatedRoute,
    ) {

    }
   
//ngOninit consider as onload
  ngOnInit() {
    this.headForm = this.formBuilder.group({
      product:[''],
      product_category_id:['']
    });

    //alert(config.apiUrl+'billing/product_category');
    this.http.get(config.apiUrl+'billing/product_group',this.httpOptions)
    .subscribe(data=>{
      this.product_groups = data;
    });

    this.http.get(config.apiUrl+'billing/product_category',this.httpOptions)
    .subscribe(data=>{
      this.product_categories = data;
    });

    if (this.route.snapshot.params['id']) this.simsView(this.route.snapshot.params['id']);//onclike the edit button --after edit view the page simsView
    



    this.searchTerm.valueChanges.subscribe(
      term => {
        if (term != '') {
          this.search(term).subscribe(
            data => {
              this.myBooks = data as any[];
              //console.log(data[0].BookName);
          })
        }
    })
    //autocomplete
  }

  search(term) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization':'shethra123'
      })
    }
    var listOfBooks = this.http.get('http://api.simsys.org/product/query_autocomplete?term=' + term,httpOptions)
    .pipe(
        debounceTime(500),  // WAIT FOR 500 MILISECONDS ATER EACH KEY STROKE.
        map(
            (data: any) => {
                return (
                    data.length != 0 ? data as any[] : [{"product": "No Record Found"} as any]
                );
            }
    ));

    return listOfBooks;
}

get f() { return this.headForm.controls; } //for calling simsView function


simsSave(){
   let  request=this.headForm.value;
   this.http.post<any>(config.apiUrl+'/payroll/product/save',request,this.httpOptions).subscribe(res => {
    console.log(res);
    },error => {
     console.log(error);
    });
  
  }
 simsDelete(id){
  let  request=this.headForm.value;
  this.http.post<any>(config.apiUrl+'/payroll/product/delete',request,this.httpOptions).subscribe(res => {
   console.log(res);
   },error => {
    console.log(error);
   });
 }
 //view the content ofter edit
  simsView(id){
    
       const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization':JSON.parse(localStorage.getItem('currentUser')).apiKey
      })
    };
  
    this.http.post<any>(config.apiUrl+'/payroll/product/query', {id:id},httpOptions).subscribe(res => {
      console.log(id);
        this.f.ledger_code.setValue(res.ledger_code);
        this.f.product.setValue(res.product);
        this.f.dob.setValue(res.dob);
        this.f.shift_id.setValue(res.shift_id);
        this.f.department_id.setValue(res.department_id);
        this.f.designation_id.setValue(res.designation_id);
        this.f.branch_id.setValue(res.branch_id);
        this.f.opn_bal.setValue(res.opn_bal);
        this.f.emp_status.setValue(res.emp_status);
        this.f.address.setValue(res.address);
        this.f.email.setValue(res.email);
        this.f.phone.setValue(res.phone);
        this.f.mobile.setValue(res.mobile);
        this.f.user_id.setValue(res.user_id);
        this.f.joined.setValue(res.joined);
        this.f.resign_date.setValue(res.resign_date);
        this.f.esino.setValue(res.esino);
        this.f.pfno.setValue(res.pfno);
        this.f.panno.setValue(res.panno);
        this.f.adharno.setValue(res.adharno);
        this.f.salary.setValue(res.salary);
        this.f.basic.setValue(res.basic);
        this.f.ot.setValue(res.ot);
        this.f.shift_id_compliance.setValue(res.shift_id_compliance);
        this.f.bank_id.setValue(res.bank_id);
        this.f.bank_branch.setValue(res.bank_branch);
        this.f.bankacname.setValue(res.bankacname);
        this.f.ifsc_code.setValue(res.ifsc_code);
              
           },error => {
          console.log(error);
    });
  }
  //onload id post
  designationSelect(designation_info){
    this.f.designation_id.setValue(designation_info.id);
  }
//onload id post
  departmentSelect(department_info){
    this.f.department_id.setValue(department_info.id);
  }
  //onload id post
branchSelect(branch_info){
  this.f.branch_id.setValue(branch_info.id)
}

}
