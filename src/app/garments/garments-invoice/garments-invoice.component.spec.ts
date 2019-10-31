import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GarmentsInvoiceComponent } from './garments-invoice.component';

describe('GarmentsInvoiceComponent', () => {
  let component: GarmentsInvoiceComponent;
  let fixture: ComponentFixture<GarmentsInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GarmentsInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GarmentsInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
