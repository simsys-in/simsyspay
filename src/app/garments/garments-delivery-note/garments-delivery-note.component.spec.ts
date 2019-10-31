import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GarmentsDeliveryNoteComponent } from './garments-delivery-note.component';

describe('GarmentsDeliveryNoteComponent', () => {
  let component: GarmentsDeliveryNoteComponent;
  let fixture: ComponentFixture<GarmentsDeliveryNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GarmentsDeliveryNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GarmentsDeliveryNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
