import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LedgerCategoryComponent } from './ledger-category.component';

describe('LedgerCategoryComponent', () => {
  let component: LedgerCategoryComponent;
  let fixture: ComponentFixture<LedgerCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LedgerCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LedgerCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
