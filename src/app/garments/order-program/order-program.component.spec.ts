import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderProgramComponent } from './order-program.component';

describe('OrderProgramComponent', () => {
  let component: OrderProgramComponent;
  let fixture: ComponentFixture<OrderProgramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderProgramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
