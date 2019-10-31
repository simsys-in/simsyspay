import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YarnInvoiceComponent } from './yarn-invoice.component';

describe('YarnInvoiceComponent', () => {
  let component: YarnInvoiceComponent;
  let fixture: ComponentFixture<YarnInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YarnInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YarnInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
