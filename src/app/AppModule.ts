import * as platformBrowser from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './core/login/login.component';
import { AuthGuard } from './auth.guard';
import { HeaderComponent } from './core/header/header.component';
import { LedgerCategoryComponent } from './garments/ledger-category/ledger-category.component';
import { LedgerGroupComponent } from './garments/ledger-group/ledger-group.component';
import { ProductCategoryComponent } from './garments/product-category/product-category.component';
import { ProductGroupComponent } from './garments/product-group/product-group.component';
import { ProductDetailsComponent } from './garments/product-details/product-details.component';
import { ProductComponent } from './garments/product/product.component';
import { LedgerComponent } from './garments/ledger/ledger.component';
import { PurchaseInvoiceComponent } from './payroll/purchase-invoice/purchase-invoice.component';
import { ColorComponent } from './garments/color/color.component';
import { UnitComponent } from './garments/unit/unit.component';
import { ShortcutComponent } from './garments/shortcut/shortcut.component';
import { SizeComponent } from './garments/size/size.component';
import { ProcessComponent } from './garments/process/process.component';
import { OrderProgramComponent } from './garments/order-program/order-program.component';
import { DyeingProgramComponent } from './garments/dyeing-program/dyeing-program.component';
import { FabricInvoiceComponent } from './garments/fabric-invoice/fabric-invoice.component';
import { FabricInwardComponent } from './garments/fabric-inward/fabric-inward.component';
import { FabricOutwardComponent } from './garments/fabric-outward/fabric-outward.component';
import { FabricReturnComponent } from './garments/fabric-return/fabric-return.component';
import { GarmentsDeliveryNoteComponent } from './garments/garments-delivery-note/garments-delivery-note.component';
import { GarmentsReceiptNoteComponent } from './garments/garments-receipt-note/garments-receipt-note.component';
import { JobworkInwardComponent } from './garments/jobwork-inward/jobwork-inward.component';
import { JobworkOutwardComponent } from './garments/jobwork-outward/jobwork-outward.component';
import { YarnInvoiceComponent } from './garments/yarn-invoice/yarn-invoice.component';
import { YarnInwardComponent } from './garments/yarn-inward/yarn-inward.component';
import { YarnReturnComponent } from './garments/yarn-return/yarn-return.component';
import { GarmentsInvoiceComponent } from './garments/garments-invoice/garments-invoice.component';
import { GarmentsInvoicePrintComponent } from './garments/garments-invoice-print/garments-invoice-print.component';
import { PrintLayoutComponent } from './print-layout/print-layout.component';
import { SidenavComponent } from './core/sidenav/sidenav.component';
import { NumberToWordsPipe } from './pipe/number-to-words.pipe';


@NgModule({
  declarations: [
    AppComponent,
    LedgerCategoryComponent,
    LedgerComponent,
    ColorComponent,
    OrderProgramComponent,
    DyeingProgramComponent,
    JobworkInwardComponent,
    JobworkOutwardComponent,
    FabricInvoiceComponent,
    YarnInvoiceComponent,
    YarnInwardComponent,
    YarnReturnComponent,
    FabricInwardComponent,
    FabricOutwardComponent,
    FabricReturnComponent,
    GarmentsDeliveryNoteComponent,
    GarmentsReceiptNoteComponent,
    ShortcutComponent,
    UnitComponent,
    ProcessComponent,
    SizeComponent,
    ProductComponent,
    LedgerGroupComponent,
    DashboardComponent,
    LoginComponent,
    HeaderComponent,
    ProductCategoryComponent ,
    ProductDetailsComponent ,
    ProductGroupComponent,
    PurchaseInvoiceComponent,
    GarmentsInvoiceComponent,
    GarmentsInvoicePrintComponent,
    PrintLayoutComponent,
    SidenavComponent,
    NumberToWordsPipe
  ],
  imports: [
    platformBrowser.BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
