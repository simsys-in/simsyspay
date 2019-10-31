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
  selector: 'app-garments-invoice',
  templateUrl: './garments-invoice.component.html',
  styleUrls: ['./garments-invoice.component.scss']
})


export class GarmentsInvoiceComponent implements OnInit {
  @Input() ngVar:any;
  options: FormGroup;
  displayedColumns: string[] = ['product','narration','size1','size2','size3','size4','size5','size6','size7','size8','size9','discount','qty', 'amount','action'];
  accountsColumns: string[] =['ledger2','narration','percentage','amount','action'];
  listColumns: string[] =['id','vou_date','ledger','amount','action'];

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
      size1_qty_total:'',
      size2_qty_total:'',
      size3_qty_total:'',
      size4_qty_total:'',
      size5_qty_total:'',
      size6_qty_total:'',
      size7_qty_total:'',
      size8_qty_total:'',
      size9_qty_total:'',
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

  this.http.put<any>(config.apiUrl+'garments/garments_invoice/'+id,p,this.httpOptions).subscribe(res =>{
    if (res.status =='token_expired') this.authService.logOut()
    if (res.status=='success') this.simsNew();
    },
    error=>{
      console.log(error);
    });  
  }
  simsList(){
    this.formState='list';

    this.http.get<any>(config.apiUrl+'garments/garments_invoice',this.httpOptions).subscribe(res =>{
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
  //this.printService.printDocument('garments_invoice_print', invoiceIds);
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
        size1_qty_total:'',
        size2_qty_total:'',
        size3_qty_total:'',
        size4_qty_total:'',
        size5_qty_total:'',
        size6_qty_total:'',
        size7_qty_total:'',
        size8_qty_total:'',
        size9_qty_total:'',
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
    this.http.get<any>(config.apiUrl+'garments/garments_invoice/'+id,this.httpOptions).subscribe(res =>{
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
    this.getDetails(row.id);
  }
getDetails(ledger_id){
alert(ledger_id);
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
      this.f.i[index].size_id=res.size_id;
      this.f.i[index].size1_rate=res.size1_rate;
      this.f.i[index].size2_rate=res.size2_rate;
      this.f.i[index].size3_rate=res.size3_rate;
      this.f.i[index].size4_rate=res.size4_rate;
      this.f.i[index].size5_rate=res.size5_rate;
      this.f.i[index].size6_rate=res.size6_rate;
      this.f.i[index].size7_rate=res.size7_rate;
      this.f.i[index].size8_rate=res.size8_rate;
      this.f.i[index].size9_rate=res.size9_rate;
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

  this.http.post<any>(config.apiUrl+'garments/garments_invoice',p,this.httpOptions).subscribe(res =>{
    if (res.status =='token_expired') return this.routes.navigate(['logout']);
    if (res.status=='success') this.simsNew();
    },
    error=>{
      console.log(error);
    });   
}
simsDelete(id){
  this.http.delete(config.apiUrl+'garments/garments_invoice/'+id,this.httpOptions).subscribe(() => {
    //this.snackBar.open('Deleted Successfully',"Delete",{duration: 5 * 1000,});
  this.simsList();
  },error => {
     this.snackBar.open(JSON.stringify(error),"Error",);
  });
}

calc(index){
  let size1_qty_total =0;
  let size2_qty_total =0;
  let size3_qty_total =0;
  let size4_qty_total =0;
  let size5_qty_total =0;
  let size6_qty_total =0;
  let size7_qty_total =0;
  let size8_qty_total =0;
  let size9_qty_total =0;
  let qty_total =0;
  let inventory_amount_total =0;
  let disc_total =0;

  this.f.i.forEach((row,i)=>{  
  let size1_qty = row.size1_qty?parseFloat(row.size1_qty):0;
  let size2_qty = row.size2_qty?parseFloat(row.size2_qty):0;
  let size3_qty = row.size3_qty?parseFloat(row.size3_qty):0;
  let size4_qty = row.size4_qty?parseFloat(row.size4_qty):0;
  let size5_qty = row.size5_qty?parseFloat(row.size5_qty):0;
  let size6_qty = row.size6_qty?parseFloat(row.size6_qty):0;
  let size7_qty = row.size7_qty?parseFloat(row.size7_qty):0;
  let size8_qty = row.size8_qty?parseFloat(row.size8_qty):0;
  let size9_qty = row.size9_qty?parseFloat(row.size9_qty):0;

  let size1_rate = row.size1_rate?parseFloat(row.size1_rate):0;
  let size2_rate = row.size2_rate?parseFloat(row.size2_rate):0;
  let size3_rate = row.size3_rate?parseFloat(row.size3_rate):0;
  let size4_rate = row.size4_rate?parseFloat(row.size4_rate):0;
  let size5_rate = row.size5_rate?parseFloat(row.size5_rate):0;
  let size6_rate = row.size6_rate?parseFloat(row.size6_rate):0;
  let size7_rate = row.size7_rate?parseFloat(row.size7_rate):0;
  let size8_rate = row.size8_rate?parseFloat(row.size8_rate):0;
  let size9_rate = row.size9_rate?parseFloat(row.size9_rate):0;


  let qty = size1_qty+size2_qty+size3_qty+size4_qty+size5_qty+size6_qty+size7_qty+size8_qty+size9_qty;
  let amount = size1_rate*size1_qty+size2_rate*size2_qty+size3_rate*size3_qty+size4_rate*size4_qty+size5_rate*size5_qty+size6_rate*size6_qty+size7_rate*size7_qty+size8_rate*size8_qty+size9_rate*size9_qty;

  let disc_percentage = row.disc_percentage?row.disc_percentage:0;
  let disc_value = 0;
  if (disc_percentage){
    disc_value = (amount * disc_percentage/100);
    this.f.i[i].disc_value = disc_value;
  }
  disc_total +=disc_value;
  amount = amount-disc_value;


  size1_qty_total +=size1_qty;
  size2_qty_total +=size2_qty;
  size3_qty_total +=size3_qty;
  size4_qty_total +=size4_qty;
  size5_qty_total +=size5_qty;
  size6_qty_total +=size6_qty;
  size7_qty_total +=size7_qty;
  size8_qty_total +=size8_qty;
  size9_qty_total +=size9_qty;
  qty_total +=qty;

  inventory_amount_total +=amount;

  this.f.i[i].qty = qty;
  this.f.i[i].amount = amount;
  this.s.empty_row_count = parseFloat(this.s.empty_row_count)- parseFloat(this.f.i.length)
});
  //this.f.h.inventory_amount_total = this.f.i.map(t => t.amount).reduce((acc, value) => acc + value, 0)
  this.f.h.disc_total = disc_total;
  this.f.h.inventory_qty_total = qty_total;
  this.f.h.inventory_amount_total = inventory_amount_total;
  this.f.h.size1_qty_total = size1_qty_total?size1_qty_total:'';
  this.f.h.size2_qty_total = size2_qty_total?size2_qty_total:'';
  this.f.h.size3_qty_total = size3_qty_total?size3_qty_total:'';
  this.f.h.size4_qty_total = size4_qty_total?size4_qty_total:'';
  this.f.h.size5_qty_total = size5_qty_total?size5_qty_total:'';
  this.f.h.size6_qty_total = size6_qty_total?size6_qty_total:'';
  this.f.h.size7_qty_total = size7_qty_total?size7_qty_total:'';
  this.f.h.size8_qty_total = size8_qty_total?size8_qty_total:'';
  this.f.h.size9_qty_total = size9_qty_total?size9_qty_total:'';

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