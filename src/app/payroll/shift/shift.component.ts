import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { config } from '../../config';
import { ActivatedRoute, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-shift',
  templateUrl: './shift.component.html',
   })
 
export class ShiftComponent implements OnInit {
  shift:any;
     rows:any;
     method:any;
     time_count:any;
     html:any;
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
      this.time_count;
       this.headForm=new FormGroup ( {
         shift:new FormControl('')
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
   this.http.post<any>(config.apiUrl+'/payroll/shift/save',request,this.httpOptions).subscribe(res => {
      console.log(res);
    },error => {
      console.log(error);
    });
   }
   simsDelete(id){
    
   }
     simsList(){
       console.log("test");
        const httpOptions = {
        headers:new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization':JSON.parse(localStorage.getItem('currentUser')).apiKey
  }),
};

this.http.get<any>(config.apiUrl+'/payroll/shift/queries',httpOptions).subscribe(res => {
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
this.http.post<any>(config.apiUrl+'/payroll/shift/query',{id:id,method:'get'},httpOptions).subscribe(res => {
   this.f.shift.setValue(res.shift);
     },
      error => {
        console.log(error);
});}
add_time(row,body_part){
  this.time_count++;
this.html = '<tr id="time-row'+this.time_count+'">';
	this.html += '<td class="text-left input-group-sm"><input type="hidden" name="times['+this.time_count+'][id]" value="'+(row.id?row.id:'')+'" /><input type="time" class="form-control text-left" name="times['+this.time_count+'][intime]" value="'+(row.intime?row.intime:'')+'" /></td>';
	this.html += '<td class="text-right input-group-sm"><input type="time" onchange="tbl_shift_change('+this.time_count+')" class="form-control text-left" name="times['+this.time_count+'][outtime]" value="'+(row.outtime?row.outtime:'')+'" /></td>';
	this.html += '<td class="text-right input-group-sm"><input type="number" step="0.25" onchange="this.value=parseFloat(this.value).toFixed(2)" class="form-control text-right" name="times['+this.time_count+'][shift_count]" value="'+(row.shift_count?row.shift_count:'')+'" /></td>';
	this.html += '<td class="input-group-sm"><a href="javascript:removeShift('+this.time_count+')"><i class="material-icons text-danger" style="font-size:18px">remove_circle</i></a></td>';
	this.html += '</tr>';
}
}

