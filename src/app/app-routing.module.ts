import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LedgerCategoryComponent } from './garments/ledger-category/ledger-category.component';
import { ProductCategoryComponent } from './garments/product-category/product-category.component';
import { ProductDetailsComponent } from './garments/product-details/product-details.component';
import { ProductGroupComponent } from './garments/product-group/product-group.component';
import { LedgerGroupComponent } from './garments/ledger-group/ledger-group.component';
import { LedgerComponent } from './garments/ledger/ledger.component';
import { FabricInvoiceComponent } from './garments/fabric-invoice/fabric-invoice.component';
import { YarnInvoiceComponent } from './garments/yarn-invoice/yarn-invoice.component';
import { YarnInwardComponent } from './garments/yarn-inward/yarn-inward.component';
import { FabricInwardComponent } from './garments/fabric-inward/fabric-inward.component';
import { JobworkInwardComponent } from './garments/jobwork-inward/jobwork-inward.component';
import { FabricOutwardComponent } from './garments/fabric-outward/fabric-outward.component';
import { FabricReturnComponent } from './garments/fabric-return/fabric-return.component';
import { YarnReturnComponent } from './garments/yarn-return/yarn-return.component';
import { DyeingProgramComponent } from './garments/dyeing-program/dyeing-program.component';
import { GarmentsDeliveryNoteComponent } from './garments/garments-delivery-note/garments-delivery-note.component';
import { GarmentsReceiptNoteComponent } from './garments/garments-receipt-note/garments-receipt-note.component';
import { SizeComponent } from './garments/size/size.component';
import { ShortcutComponent } from './garments/shortcut/shortcut.component';
import { ColorComponent } from './garments/color/color.component';
import { ProcessComponent } from './garments/process/process.component';
import { OrderProgramComponent } from './garments/order-program/order-program.component';
import { UnitComponent } from './garments/unit/unit.component';
import { ProductComponent } from './garments/product/product.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { AttendanceRegisterComponent } from './payroll/attendance-register/attendance-register.component';
import { LoginComponent } from './core/login/login.component';
import {EmployeeListComponent} from './payroll/employee-list/employee-list.component';
import {AuthGuard} from './auth.guard';
import { DesignationComponent } from './payroll/designation/designation.component';
import { PurchaseInvoiceComponent } from './payroll/purchase-invoice/purchase-invoice.component';
import { BranchComponent } from './payroll/branch/branch.component';
import { JobworkOutwardComponent } from './garments/jobwork-outward/jobwork-outward.component';
import { GarmentsInvoiceComponent } from './garments/garments-invoice/garments-invoice.component';
import { GarmentsInvoicePrintComponent } from './garments/garments-invoice-print/garments-invoice-print.component';
import { PrintLayoutComponent } from './print-layout/print-layout.component';

const routes: Routes = [
  { path: 'product', component: ProductComponent,canActivate: [AuthGuard] },
  { path: 'product_details', component: ProductDetailsComponent,canActivate: [AuthGuard] },
  { path: 'ledger', component: LedgerComponent,canActivate: [AuthGuard] },
  { path: 'color', component: ColorComponent,canActivate: [AuthGuard] },
  { path: 'shortcut', component: ShortcutComponent,canActivate: [AuthGuard] },
  { path: 'unit', component: UnitComponent,canActivate: [AuthGuard] },
  { path: 'size', component: SizeComponent,canActivate: [AuthGuard] },
  { path: 'process', component: ProcessComponent,canActivate: [AuthGuard] },
  { path: 'ledger_category', component: LedgerCategoryComponent,canActivate: [AuthGuard] },
  { path: 'purchase_invoice', component: PurchaseInvoiceComponent,canActivate: [AuthGuard] },
  { path: 'fabric_invoice', component: FabricInvoiceComponent,canActivate: [AuthGuard] },
  { path: 'yarn_invoice', component: YarnInvoiceComponent,canActivate: [AuthGuard] },
  { path: 'yarn_inward', component: YarnInwardComponent,canActivate: [AuthGuard] },
  { path: 'yarn_return', component: YarnReturnComponent,canActivate: [AuthGuard] },
  { path: 'fabric_inward', component: FabricInwardComponent,canActivate: [AuthGuard] },
  { path: 'fabric_outward', component: FabricOutwardComponent,canActivate: [AuthGuard] },
  { path: 'fabric_return', component: FabricReturnComponent,canActivate: [AuthGuard] },
  { path: 'product_group', component: ProductGroupComponent,canActivate: [AuthGuard] },
  { path: 'order_program', component: OrderProgramComponent,canActivate: [AuthGuard] },
  { path: 'dyeing_program', component: DyeingProgramComponent,canActivate: [AuthGuard] },
  { path: 'garments_delivery_note', component: GarmentsDeliveryNoteComponent,canActivate: [AuthGuard] },
  { path: 'garments_receipt_note', component: GarmentsReceiptNoteComponent,canActivate: [AuthGuard] },
  { path: 'garments_invoice', component: GarmentsInvoiceComponent,canActivate: [AuthGuard] },
  { path: 'jobwork_outward', component: JobworkOutwardComponent,canActivate: [AuthGuard] },
  { path: 'product_category', component: ProductCategoryComponent,canActivate: [AuthGuard] },
  { path: 'jobwork_inward', component: JobworkInwardComponent,canActivate: [AuthGuard] },
  { path: 'ledger_group', component: LedgerGroupComponent,canActivate: [AuthGuard] },
  { path: 'ledger_category/:id', component: LedgerCategoryComponent,canActivate: [AuthGuard] },
  { path: 'ledger_group/:id', component: LedgerGroupComponent,canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full',canActivate: [AuthGuard] },
  
  { path: 'print',
    outlet: 'print',
    component: PrintLayoutComponent,
    children: [
      { path: 'garments_invoice_print/:invoiceIds', component: GarmentsInvoicePrintComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,{ useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
