import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentOrderComponent } from './appointment-order.component';

describe('AppointmentOrderComponent', () => {
  let component: AppointmentOrderComponent;
  let fixture: ComponentFixture<AppointmentOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
