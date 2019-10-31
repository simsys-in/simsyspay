import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GarmentsReceiptNoteComponent } from './garments-receipt-note.component';

describe('GarmentsReceiptNoteComponent', () => {
  let component: GarmentsReceiptNoteComponent;
  let fixture: ComponentFixture<GarmentsReceiptNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GarmentsReceiptNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GarmentsReceiptNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
