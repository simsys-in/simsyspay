import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricInvoiceComponent } from './fabric-invoice.component';

describe('FabricInvoiceComponent', () => {
  let component: FabricInvoiceComponent;
  let fixture: ComponentFixture<FabricInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FabricInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FabricInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
