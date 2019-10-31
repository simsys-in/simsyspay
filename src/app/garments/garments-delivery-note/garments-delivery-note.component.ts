import { Component, OnInit, Input, Directive } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from 'src/app/config';
import { startWith, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { PrintService } from 'src/app/service/print.service';
import { NavService } from 'src/app/service/nav.service';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-garments-delivery-note',
  templateUrl: './garments-delivery-note.component.html',
  styleUrls: ['./garments-delivery-note.component.scss']
})


export class GarmentsDeliveryNoteComponent implements OnInit {
  @Input() ngVar:any;
  options: FormGroup;
  displayedColumns: string[] = ['product','color','narration','size1','size2','size3','size4','size5','size6','size7','size8','size9','qty','action'];
 // accountsColumns: string[] =['ledger2','narration','percentage','amount','action'];
  listColumns: string[] =['id','vou_date','amount','ledger','action'];

  form:any={
    amount: ''
  };
  empty_row_count = new Array(36);
lists:any;
  f:any={
    h:{
      vou_date:'2019/05/01',
      ledger:'',
      amount:'',
      size1_total:'',
      size2_total:'',
      size3_total:'',
      size4_total:'',
      size5_total:'',
      size6_total:'',
      size7_total:'',
      size8_total:'',
      size9_total:'',
      discount_total:'',
    },
    a:[{
      ledger2:'',
      ledger2_id:'',
      narration:'',
      percentage:'',
      amount:''
    }],
    i:[{
      product:''
    }]
  };
s:any={
  amount_words:'',
  size_id:'0',
  size_head:false
};
  formState:String='form';
  dataSource = new MatTableDataSource<any>(this.f.i);
  dataSourceLists:any;

  sizes:any={size1:'S1',size2:'S2',size3:'S3',size4:'S4',size5:'S5',size6:'S6',size7:'S7',size8:'S8',size9:'S9'};

  accounts:any[] =[{
    ledger2:'ledger2'
  }];
  accountsDataSource = new MatTableDataSource<any>(this.f.a);

  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': this.authService.getToken(),
    })
    }
    products: any;
    filteredProducts: any;
    
    colors: any;
    filteredColors: any;
    
  accountsLedgers:any;
  filteredAccountsLedgers:any;

  ledgers:any;
  filteredLedgers:any;

  users:any;
  inventory: any;
  snackBar: any;
  
  constructor(
      fb: FormBuilder,
      private http:HttpClient,
      private routes:Router,
      public printService: PrintService,
      private nav:NavService,
      private authService:AuthService
    ) {
    this.options = fb.group({
      hideRequired: false,
      floatLabel: 'auto',
    });

    this.http.get<any>(config.apiUrl+'billing/product',this.httpOptions).subscribe(res =>{
      if (res.status =='token_expired') this.authService.logOut();
      this.products = res;
      },
      error=>{
        console.log(error);
      }
      );

      this.http.get<any>(config.apiUrl+'billing/ledger'+'?ledger_group=sundry debtors',this.httpOptions).subscribe(res =>{
        if (res.status =='token_expired') this.authService.logOut();
        this.ledgers = res;
        },
        error=>{
          console.log(error);
        }
        );

        this.http.get<any>(config.apiUrl+'garments/color',this.httpOptions).subscribe(res =>{
          if (res.status =='token_expired') this.authService.logOut();
          this.colors = res;
          },
          error=>{
            console.log(error);
          }
          );

        this.http.get<any>(config.apiUrl+'billing/ledger'+'?ledger_group=income|duties and taxes|expense',this.httpOptions).subscribe(res =>{
          if (res.status =='token_expired') this.authService.logOut()
          this.accountsLedgers = res;
          },
          error=>{
            console.log(error);
          }
          );
    
        
        this.http.get<any>(config.apiUrl+'core/users',this.httpOptions).subscribe(res =>{
          if (res.status =='token_expired') this.authService.logOut()
          this.users = res;
          },
          error=>{
            console.log(error);
          }
          );
    
    
    /** Gets the total cost of all transactions. */
        
  }

  getTotalCost() {
    return this.f.i.map(t => t.amount).reduce((acc, value) => acc + value, 0);
  }

  ngOnInit() {
    this.simsNew();
  }
  simsUpdate(id){
    let p = this.f.h;
  p.inventories = this.f.i;
  p.accounts=this.f.a;

  this.http.put<any>(config.apiUrl+'garments/garments_delivery_note/'+id,p,this.httpOptions).subscribe(res =>{
    if (res.status =='token_expired') this.authService.logOut()
    if (res.status=='success') this.simsNew();
    },
    error=>{
      console.log(error);
    });  
  }
  simsList(){
    this.formState='list';

    this.http.get<any>(config.apiUrl+'garments/garments_delivery_note',this.httpOptions).subscribe(res =>{
      if (res.status =='token_expired') this.authService.logOut()
      this.lists = res;
      },
      error=>{
        console.log(error);
      }
      );    
  }
simsPrint(id){
  const invoiceIds = ['101', '102'];
  //this.printService.printDocument('garments_delivery_note_print', invoiceIds);
  this.formState="preview";
  window.print();
}

simsPreview(){
  this.formState='preview';
}
  simsNew(){
    this.formState='form';

    this.f={
      h:{
        vou_date:'2019/05/01',
        ledger:'',
        amount:'',
        size1_total:'',
        size2_total:'',
        size3_total:'',
        size4_total:'',
        size5_total:'',
        size6_total:'',
        size7_total:'',
        size8_total:'',
        size9_total:'',
      },
      a:[{
        ledger2:'',
        ledger2_id:'',
        narration:'',
        percentage:'',
        amount:''
      }],
      i:[{
        product:''
      }]
    }

    this.dataSource = new MatTableDataSource<any>(this.f.i);
    this.accountsDataSource = new MatTableDataSource<any>(this.f.a);
  }
  
  simsView(id){
  
    this.formState='form';
    this.http.get<any>(config.apiUrl+'garments/garments_delivery_note/'+id,this.httpOptions).subscribe(res =>{
      if (res.status =='token_expired') return this.routes.navigate(['logout']);
      this.f.h = res.head;
      this.f.a=res.accounts;
      this.f.i=res.inventories;

      this.dataSource = new MatTableDataSource<any>(this.f.i);
      this.accountsDataSource = new MatTableDataSource<any>(this.f.a);
      },
      error=>{
        console.log(error);
      });     
  }

  ledgerFilter(typing){
    this.filteredLedgers = (typeof(typing) != 'object')?this.ledgers.filter(row => row.ledger.toLowerCase().indexOf(typing.toLowerCase()) >= 0) : this.ledgers.slice()
  }

  ledgerSelect(ac){
    let row = ac.option.value;
    this.f.h.ledger_id=row.id;
    this.f.h.ledger=row.ledger;
  }

  productFilter(event,index){
    this.filteredProducts = (typeof(event) != 'object')?this.products.filter(masters => masters.product.toLowerCase().indexOf(event.toLowerCase()) >= 0) : this.products.slice()
    //this.filteredProducts = this.products.filter(t=>t.product === event)[0];
  }

  colorFilter(typing,i){
    this.filteredColors = (typeof(typing) != 'object')?this.colors.filter(masters => masters.color.toLowerCase().indexOf(typing.toLowerCase()) >= 0) : this.colors.slice()
    //this.filteredProducts = this.products.filter(t=>t.product === event)[0];
  }

  colorSelect(e,i){
    let row = e.option.value;
    this.f.i[i].color =row.color;
    this.f.i[i].color_id =row.id;
  }

  productSelect(event,index){
    let product_info = event.option.value;
    this.f.i[index].product =product_info.product;
    this.f.i[index].product_id =product_info.id;

    this.http.get<any>(config.apiUrl+'garments/product_details/'+product_info.id,this.httpOptions).subscribe(res =>{
      this.sizes ={
        size1: res.size1_title,
        size2: res.size2_title,
        size3: res.size3_title,
        size4: res.size4_title,
        size5: res.size5_title,
        size6: res.size6_title,
        size7: res.size7_title,
        size8: res.size8_title,
        size9: res.size9_title,
      }
      
      });

     if (this.f.i.length-1 == index) this.inventoryAdd();

  }

  accountsLedger2Filter(e,i){
    this.filteredAccountsLedgers = (typeof(e) != 'object')?this.accountsLedgers.filter(row => row.ledger.toLowerCase().indexOf(e.toLowerCase()) >= 0) : this.accountsLedgers.slice()
    //this.filteredProducts = this.products.filter(t=>t.product === event)[0];
  }

  accountsLedger2Select(e,i){
    let row = e.option.value;
    this.f.a[i].ledger2 =row.ledger;
    this.f.a[i].ledger2_id =row.id;    
    if (this.f.a.length-1 == i) this.accountsAdd();
  }
simsSave(){
  let p = this.f.h;
  p.inventories = this.f.i;
  p.accounts=this.f.a;

  this.http.post<any>(config.apiUrl+'garments/garments_delivery_note',p,this.httpOptions).subscribe(res =>{
    if (res.status =='token_expired') return this.routes.navigate(['logout']);
    if (res.status=='success') this.simsNew();
    },
    error=>{
      console.log(error);
    });   
}
simsDelete(id){
  this.http.delete(config.apiUrl+'garments/garments_delivery_note/'+id,this.httpOptions).subscribe(() => {
    //this.snackBar.open('Deleted Successfully',"Delete",{duration: 5 * 1000,});
  this.simsList();
  },error => {
     this.snackBar.open(JSON.stringify(error),"Error",);
  });
}

calc(index){
  let size1_total =0;
  let size2_total =0;
  let size3_total =0;
  let size4_total =0;
  let size5_total =0;
  let size6_total =0;
  let size7_total =0;
  let size8_total =0;
  let size9_total =0;
  let qty_total =0;
  let inventory_amount_total =0;
  let disc_total =0;

  this.f.i.forEach((row,i)=>{  
  let size1 = row.size1?parseFloat(row.size1):0;
  let size2 = row.size2?parseFloat(row.size2):0;
  let size3 = row.size3?parseFloat(row.size3):0;
  let size4 = row.size4?parseFloat(row.size4):0;
  let size5 = row.size5?parseFloat(row.size5):0;
  let size6 = row.size6?parseFloat(row.size6):0;
  let size7 = row.size7?parseFloat(row.size7):0;
  let size8 = row.size8?parseFloat(row.size8):0;
  let size9 = row.size9?parseFloat(row.size9):0;

  


  let qty = size1+size2+size3+size4+size5+size6+size7+size8+size9;

  let disc_percentage = row.disc_percentage?row.disc_percentage:0;
  let disc_value = 0;
  


  size1_total +=size1;
  size2_total +=size2;
  size3_total +=size3;
  size4_total +=size4;
  size5_total +=size5;
  size6_total +=size6;
  size7_total +=size7;
  size8_total +=size8;
  size9_total +=size9;
  qty_total +=qty;

 

  this.f.i[i].qty = qty;
  this.s.empty_row_count = parseFloat(this.s.empty_row_count)- parseFloat(this.f.i.length)
});
  //this.f.h.inventory_amount_total = this.f.i.map(t => t.amount).reduce((acc, value) => acc + value, 0)
  this.f.h.disc_total = disc_total;
  this.f.h.inventory_total = qty_total;
  this.f.h.inventory_amount_total = inventory_amount_total;
  this.f.h.size1_total = size1_total?size1_total:'';
  this.f.h.size2_total = size2_total?size2_total:'';
  this.f.h.size3_total = size3_total?size3_total:'';
  this.f.h.size4_total = size4_total?size4_total:'';
  this.f.h.size5_total = size5_total?size5_total:'';
  this.f.h.size6_total = size6_total?size6_total:'';
  this.f.h.size7_total = size7_total?size7_total:'';
  this.f.h.size8_total = size8_total?size8_total:'';
  this.f.h.size9_total = size9_total?size9_total:'';

  let amount_total =inventory_amount_total;

  let taxable_value = inventory_amount_total;

  this.f.a.forEach((row,i)=>{
    let amount = row.amount?row.amount:'';
    if (row.percentage){
      amount = taxable_value * (row.percentage/100);
      this.f.a[i].amount= amount;
    }
    amount_total += amount;
  });

  this.f.h.amount=amount_total;
}

inventoryAdd(){
  this.f.i.push({})
   this.dataSource = new MatTableDataSource<any>(this.f.i);
}

inventoryRemove(i){
   this.f.i.splice(i,1);
   this.dataSource = new MatTableDataSource<any>(this.f.i);
}

accountsAdd(){
  this.f.a.push({})
   this.accountsDataSource = new MatTableDataSource<any>(this.f.a);
}

accountsRemove(i){
   this.f.a.splice(i,1);
   this.accountsDataSource = new MatTableDataSource<any>(this.f.a);
}

toggle(){
  this.nav.toggle();
}

trackByFn(item){
  console.log(item);
  if ((this.s.size_id==item.size_id)){
    this.s.size_head=false;
  }else{
    this.s.size_head = true;
    this.s.size_id=item.size_id;
  }
}
inventoryHead(i){
  if (this.s.size_id != i.size_id){
    this.s.size_id = i.size_id;
    return true;
  }else{
  return false;
  }
}
}